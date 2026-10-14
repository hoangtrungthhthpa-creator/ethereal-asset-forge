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
type CrazySDK = { init: () => Promise<void>; ad: { requestAd: (t: "rewarded" | "midgame", cb: CGCallbacks) => void }; game?: { gameplayStart?: () => void; gameplayStop?: () => void; loadingStop?: () => void } };
type Poki = { init: () => Promise<void>; gameLoadingFinished: () => void; gameplayStart: () => void; gameplayStop: () => void; rewardedBreak: (o?: { onStart?: () => void }) => Promise<boolean> };
declare global {
  interface Window {
    CrazyGames?: { SDK: CrazySDK };
    PokiSDK?: Poki;
  }
}

const raw = String(import.meta.env["VITE_AD_PLATFORM"] ?? "").toLowerCase();
export const AD_PLATFORM: AdPlatform = raw === "crazygames" || raw === "poki" ? raw : "none";

// Compared against the raw build-time constant so the bundler drops the other platform's URL.
const SDK_SRC =
  import.meta.env["VITE_AD_PLATFORM"] === "crazygames" ? "https://sdk.crazygames.com/crazygames-sdk-v3.js"
  : import.meta.env["VITE_AD_PLATFORM"] === "poki" ? "https://game-cdn.poki.com/scripts/v2/poki-sdk.js"
  : "";

let ready: Promise<boolean> | null = null;
let busy = false;
let gameplayOn = false;

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
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
  if (AD_PLATFORM === "none" || typeof window === "undefined") return Promise.resolve(false);
  if (ready) return ready;
  ready = (async () => {
    if (!SDK_SRC || !(await SDK_SRC && loadScript(SDK_SRC))) return false;
    try {
      if (AD_PLATFORM === "crazygames") {
        if (!window.CrazyGames?.SDK) return false;
        await window.CrazyGames.SDK.init();
        window.CrazyGames.SDK.game?.loadingStop?.();
      } else {
        if (!window.PokiSDK) return false;
        // Poki init resolves even with an adblocker; ads then simply fail (rewardedBreak → false).
        await window.PokiSDK.init().catch(() => undefined);
        window.PokiSDK.gameLoadingFinished();
      }
      return true;
    } catch {
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
    if (AD_PLATFORM === "poki") window.PokiSDK?.gameplayStart();
    else window.CrazyGames?.SDK.game?.gameplayStart?.();
  });
}
export function gameplayStop() {
  if (!gameplayOn) return;
  gameplayOn = false;
  if (AD_PLATFORM === "poki") window.PokiSDK?.gameplayStop();
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
  if (busy) return { ok: false, reason: "busy" };
  if (AD_PLATFORM === "none") return { ok: false, reason: "unavailable" };
  busy = true;
  try {
    if (!(await initAds())) return { ok: false, reason: "unavailable" };
    const wasPlaying = gameplayOn;
    gameplayStop();
    let result: AdResult;
    if (AD_PLATFORM === "poki") {
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
          window.CrazyGames!.SDK.ad.requestAd("rewarded", {
            adStarted: pauseGame,
            adFinished: () => done({ ok: true }),
            adError: () => done({ ok: false, reason: "unavailable" }),
          });
        } catch {
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
