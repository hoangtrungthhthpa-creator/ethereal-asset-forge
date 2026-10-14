/**
 * Rewarded ad bridge, selected at build time by VITE_AD_PLATFORM:
 * - "crazygames": CrazyGames HTML5 SDK v3 only.
 * - "poki": Poki HTML5 SDK only.
 * - anything else (dev / standalone): no ads; never grants rewards.
 * Only the chosen platform's SDK script is ever loaded.
 */
export type AdPlatform = "crazygames" | "poki" | "none";
export type AdResult = { ok: true } | { ok: false; reason: "unavailable" | "error" | "not-finished" | "busy" };

type CGCallbacks = { adStarted?: () => void; adFinished?: () => void; adError?: (e: unknown) => void };
type CrazySDK = { init: () => Promise<void>; environment?: unknown; ad: { requestAd: (t: "rewarded" | "midgame", cb: CGCallbacks) => void }; game?: { gameplayStart?: () => void; gameplayStop?: () => void; loadingStop?: () => void } };
type Poki = { init: () => Promise<void>; gameLoadingFinished: () => void; gameplayStart: () => void; gameplayStop: () => void; rewardedBreak: (o?: { onStart?: () => void }) => Promise<boolean> };
declare global {
  interface ImportMetaEnv {
    readonly VITE_AD_PLATFORM?: string;
  }
  interface Window {
    CrazyGames?: { SDK: CrazySDK };
    PokiSDK?: Poki;
  }
}

const raw = String(import.meta.env.VITE_AD_PLATFORM ?? "").toLowerCase();
export const AD_PLATFORM: AdPlatform = raw === "crazygames" || raw === "poki" ? raw : "none";

// Compared against the raw build-time constant so the bundler drops the other platform's URL.
const SDK_SRC =
  import.meta.env.VITE_AD_PLATFORM === "crazygames" ? "https://sdk.crazygames.com/crazygames-sdk-v3.js"
  : import.meta.env.VITE_AD_PLATFORM === "poki" ? "https://game-cdn.poki.com/scripts/v2/poki-sdk.js"
  : "";

let ready: Promise<boolean> | null = null;
let busy = false;
let gameplayOn = false;

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (window.CrazyGames?.SDK || window.PokiSDK) {
        resolve(true);
        return;
      }
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

/** Loads + initialises the platform SDK once. Resolves false if unavailable (blocked, offline, not on platform). */
export function initAds(): Promise<boolean> {
  console.log("[v0] initAds called", { platform: AD_PLATFORM, sdkSrc: SDK_SRC, hasWindow: typeof window !== "undefined" });
  if (AD_PLATFORM === "none" || typeof window === "undefined") {
    console.log("[v0] Ads unavailable before SDK init", { platform: AD_PLATFORM });
    return Promise.resolve(false);
  }
  if (ready) {
    console.log("[v0] Reusing SDK init promise");
    return ready;
  }
  ready = (async () => {
    if (!SDK_SRC || !(await SDK_SRC && loadScript(SDK_SRC))) {
      console.log("[v0] SDK script failed to load", { sdkSrc: SDK_SRC });
      return false;
    }
    try {
      if (import.meta.env.VITE_AD_PLATFORM === "crazygames") {
        const sdk = window.CrazyGames?.SDK;
        console.log("[v0] CrazyGames SDK loaded", { hasSdk: Boolean(sdk), environment: sdk?.environment });
        if (!sdk) return false;
        await sdk.init();
        console.log("[v0] CrazyGames SDK initialized", { environment: sdk.environment });
        sdk.game?.loadingStop?.();
      } else {
        if (!window.PokiSDK) return false;
        // Poki init resolves even with an adblocker; ads then simply fail (rewardedBreak → false).
        await window.PokiSDK.init().catch(() => undefined);
        window.PokiSDK.gameLoadingFinished();
      }
      return true;
    } catch (error) {
      console.error("[v0] SDK initialization failed", { error });
      return false;
    }
  })();
  return ready;
}

/** Gameplay lifecycle events (deduplicated). */
export function gameplayStart() {
  if (gameplayOn || busy) return;
  void initAds().then((ok) => {
    if (!ok || gameplayOn || busy) return;
    gameplayOn = true;
    if (import.meta.env.VITE_AD_PLATFORM === "poki") window.PokiSDK?.gameplayStart();
    else window.CrazyGames?.SDK.game?.gameplayStart?.();
  });
}
export function gameplayStop() {
  if (!gameplayOn) return;
  gameplayOn = false;
  if (import.meta.env.VITE_AD_PLATFORM === "poki") window.PokiSDK?.gameplayStop();
  else window.CrazyGames?.SDK.game?.gameplayStop?.();
}

/** Game audio/input listens to these window events. */
const pauseGame = () => window.dispatchEvent(new Event("game-ad-pause"));
const resumeGame = () => window.dispatchEvent(new Event("game-ad-resume"));

export function isSimulatedAds() {
  return AD_PLATFORM === "none";
}

/** Resolves ok only when the platform confirms the rewarded ad completed. Never rewards in dev builds. */
export async function showRewardedAd(): Promise<AdResult> {
  console.log("[v0] showRewardedAd called", { platform: AD_PLATFORM, busy });
  if (busy) return { ok: false, reason: "busy" };
  if (AD_PLATFORM === "none") return { ok: false, reason: "unavailable" };
  busy = true;
  try {
    if (!(await initAds())) return { ok: false, reason: "unavailable" };
    const wasPlaying = gameplayOn;
    gameplayStop();
    let result: AdResult;
    if (import.meta.env.VITE_AD_PLATFORM === "poki") {
      pauseGame();
      try {
        const success = await window.PokiSDK!.rewardedBreak();
        result = success === true ? { ok: true } : { ok: false, reason: "not-finished" };
      } catch {
        result = { ok: false, reason: "error" };
      }
    } else {
      result = await new Promise<AdResult>((resolve) => {
        let settled = false;
        const done = (r: AdResult) => { if (!settled) { settled = true; resolve(r); } };
        try {
          console.log("[v0] Calling CrazyGames requestAd", { type: "rewarded", environment: window.CrazyGames?.SDK.environment });
          window.CrazyGames!.SDK.ad.requestAd("rewarded", {
            adStarted: () => {
              console.log("[v0] CrazyGames adStarted");
              pauseGame();
            },
            adFinished: () => {
              console.log("[v0] CrazyGames adFinished; granting reward");
              done({ ok: true });
            },
            adError: (error) => {
              const details = error && typeof error === "object" ? error as Record<string, unknown> : { value: error };
              const rawError = `${String(details.code ?? "")} ${String(details.message ?? "")}`.toLowerCase();
              const category = rawError.includes("adsdisabledbasiclaunch") ? "adsDisabledBasicLaunch"
                : rawError.includes("unfilled") ? "unfilled"
                : rawError.includes("adblock") ? "adblock"
                : rawError.includes("adcooldown") ? "adCooldown"
                : "other";
              console.error("[v0] CrazyGames adError", { error, code: details.code, message: details.message, category });
              done({ ok: false, reason: "unavailable" });
            },
          });
        } catch (error) {
          console.error("[v0] CrazyGames requestAd threw", { error });
          done({ ok: false, reason: "error" });
        }
      });
    }
    resumeGame();
    busy = false;
    if (wasPlaying) gameplayStart();
    return result;
  } finally {
    busy = false;
  }
}
