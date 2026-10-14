/**
 * Rewarded ad bridge.
 * - Native app (Capacitor/WebView) with AdMob or Unity Ads: expose
 *   window.AdMobRewarded.show() or window.UnityAdsRewarded.show() returning Promise<boolean>.
 * - Web: Google AdSense H5 Games Ads (adBreak) when VITE_ADSENSE_CLIENT is set.
 * - Otherwise: a simulated ad (timer) so the flow works during development.
 */
type NativeRewarded = { show: () => Promise<boolean> };
type AdBreak = (o: Record<string, unknown>) => void;
declare global {
  interface Window {
    AdMobRewarded?: NativeRewarded;
    UnityAdsRewarded?: NativeRewarded;
    adsbygoogle?: unknown[];
    adBreak?: AdBreak;
    adConfig?: (o: Record<string, unknown>) => void;
  }
}

const CLIENT = import.meta.env['VITE_ADSENSE_CLIENT'] as string | undefined;
let sdkPromise: Promise<boolean> | null = null;

function loadAdSense(): Promise<boolean> {
  if (!CLIENT) return Promise.resolve(false);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-ad-frequency-hint", "30s");
    s.onload = () => {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adBreak = window.adConfig = function (o: Record<string, unknown>) {
        window.adsbygoogle!.push(o);
      };
      window.adConfig({ preloadAdBreaks: "on" });
      resolve(true);
    };
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export function isSimulatedAds() {
  return !window.AdMobRewarded && !window.UnityAdsRewarded && !CLIENT;
}

/** Resolves true only if the player watched the whole ad. */
export async function showRewardedAd(): Promise<boolean> {
  if (window.AdMobRewarded) return window.AdMobRewarded.show();
  if (window.UnityAdsRewarded) return window.UnityAdsRewarded.show();
  if (await loadAdSense()) {
    return new Promise((resolve) => {
      let rewarded = false;
      window.adBreak!({
        type: "reward",
        name: "thinh-thi-cao-nhan",
        beforeReward: (showAdFn: () => void) => showAdFn(),
        adViewed: () => (rewarded = true),
        adDismissed: () => (rewarded = false),
        adBreakDone: () => resolve(rewarded),
      });
    });
  }
  // Simulated ad for development
  return new Promise((r) => setTimeout(() => r(true), 3000));
}
