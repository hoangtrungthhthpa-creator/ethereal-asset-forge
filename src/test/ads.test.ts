import { describe, it, expect, vi, beforeEach } from "vitest";

async function load(platform: string, sdk: (w: any) => void) {
  vi.resetModules();
  vi.stubEnv("VITE_AD_PLATFORM", platform);
  vi.spyOn(document.head, "appendChild").mockImplementation((s: any) => { sdk(window); setTimeout(() => s.onload?.()); return s; });
  return import("@/lib/ads");
}
beforeEach(() => { vi.restoreAllMocks(); delete (window as any).PokiSDK; delete (window as any).CrazyGames; });

describe("ads", () => {
  it("dev build never rewards", async () => {
    const m = await load("", () => {});
    expect(await m.showRewardedAd()).toEqual({ ok: false, reason: "unavailable" });
  });
  it("poki rewards only on true, blocks concurrent calls", async () => {
    let res = true;
    const m = await load("poki", (w) => (w.PokiSDK = { init: async () => {}, gameLoadingFinished() {}, gameplayStart() {}, gameplayStop() {}, rewardedBreak: async () => res }));
    const [a, b] = await Promise.all([m.showRewardedAd(), m.showRewardedAd()]);
    expect(a.ok).toBe(true); expect(b).toEqual({ ok: false, reason: "busy" });
    res = false; expect((await m.showRewardedAd()).ok).toBe(false);
  });
  it("crazygames: finished rewards once, error does not; SDK load failure", async () => {
    let mode = "finish"; const paused = vi.fn();
    window.addEventListener("game-ad-pause", paused);
    const m = await load("crazygames", (w) => (w.CrazyGames = { SDK: { init: async () => {}, ad: { requestAd: (_t: string, cb: any) => { cb.adStarted(); if (mode === "finish") { cb.adFinished(); cb.adFinished(); } else cb.adError("noAd"); } } } }));
    expect(await m.showRewardedAd()).toEqual({ ok: true });
    expect(paused).toHaveBeenCalled();
    mode = "err"; expect(await m.showRewardedAd()).toEqual({ ok: false, reason: "unavailable" });
    const m2 = await load("crazygames", () => {});
    expect((await m2.showRewardedAd()).ok).toBe(false);
  });
});
