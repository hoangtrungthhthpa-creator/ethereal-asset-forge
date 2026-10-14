import { useEffect, useRef, useState, type ReactNode } from "react";
import { HERBS, type HerbId } from "@/lib/cultivation";
import { isSimulatedAds, showRewardedAd } from "@/lib/ads";
import { useI18n } from "@/i18n";
import qrCodeAsset from "@/assets/donation-bank-qr.jpg.asset.json";

// The asset CDN is only reachable through the project's stable host, so build an absolute URL.
const assetUrl = (asset: { url: string }) =>
  new URL(asset.url, "https://game-stage-showcase.lovable.app").href;


const AD_KEY = "tu-tien-ads-v1";
export const MAX_ADS = 5;
export const COOLDOWN_MS = 10 * 60 * 1000;

export const BANK = { bin: "970422", account: "0906535404", owner: "TRAN HUU HOANG TRUNG", bankName: "MB Bank" };

const KOFI_URL = "https://ko-fi.com/tienlovotan_fairyroad/";
const FB_URL = "https://www.facebook.com/profile.php?id=61595269226123";
const KOFI_LABEL = "ko-fi.com/tienlovotan_fairyroad";
const FB_LABEL = "tienlovotan_fairyroad";

type AdState = { day: string; count: number; last: number };
const today = () => new Date().toISOString().slice(0, 10);

function readAds(): AdState {
  try {
    const s = JSON.parse(localStorage.getItem(AD_KEY) || "null") as AdState | null;
    if (s && s.day === today()) return s;
  } catch {
    /* ignore */
  }
  return { day: today(), count: 0, last: 0 };
}


function Scroll({ children, onClose, gold, compact }: { children: ReactNode; onClose: () => void; gold?: boolean; compact?: boolean }) {
  const { t } = useI18n();
  return (
    <div className={`${compact ? "donate-overlay " : ""}fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm`} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-2xl border-2 bg-card shadow-2xl ${
          compact ? "donate-modal max-h-[85vh] overflow-hidden p-4" : "max-h-[90vh] overflow-y-auto p-6"
        } ${gold ? "border-primary shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_45%,transparent)]" : "border-primary/50"}`}
        style={{ backgroundImage: "radial-gradient(circle at top, color-mix(in oklab, var(--primary) 14%, transparent), transparent 65%)" }}
      >
        <div className={`pointer-events-none absolute inset-2 rounded-xl border border-primary/30 ${compact ? "hidden" : ""}`} />
        <button onClick={onClose} aria-label={t("close")} className="absolute right-3 top-2 text-xl text-muted-foreground hover:text-foreground">×</button>
        {children}
      </div>
    </div>
  );
}

export function AdRewardModal({
  onClose,
  onReward,
}: {
  onClose: () => void;
  onReward: (stones: number, herb: HerbId | null, qty: number, text: string) => void;
}) {
  const [ads, setAds] = useState<AdState>({ day: "", count: 0, last: 0 });
  const [now, setNow] = useState(Date.now());
  const [watching, setWatching] = useState(false);
  const [picking, setPicking] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const { t, c } = useI18n();

  useEffect(() => {
    setAds(readAds());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remain = Math.max(0, ads.last + COOLDOWN_MS - now);
  const left = MAX_ADS - ads.count;
  const canWatch = left > 0 && remain === 0 && !watching;
  const mm = String(Math.floor(remain / 60000)).padStart(2, "0");
  const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, "0");

  const lock = useRef(false);
  async function watch(kind: "stones" | "herb", chosen?: HerbId) {
    if (!canWatch || lock.current) return;
    lock.current = true;
    setPicking(false);
    setWatching(true);
    setMsg(null);
    const res = await showRewardedAd().catch(() => ({ ok: false as const, reason: "error" as const }));
    setWatching(false);
    if (!res.ok) {
      lock.current = false;
      if (res.reason !== "busy") setMsg(t(res.reason === "not-finished" ? "adFail" : "adUnavailable"));
      return;
    }
    const next = { day: today(), count: readAds().count + 1, last: Date.now() };
    localStorage.setItem(AD_KEY, JSON.stringify(next));
    setAds(next);
    if (kind === "stones") {
      onReward(500, null, 0, t("adStonesLog"));
      setMsg(t("adStonesMsg"));
    } else {
      const h = HERBS.find((x) => x.id === chosen) ?? HERBS[0]!;
      const hn = c(`herb.${h.id}`, h.name);
      onReward(0, h.id, 3, t("adHerbLog", { h: hn }));
      setMsg(t("adHerbMsg", { h: hn }));
    }
    lock.current = false;
  }

  return (
    <Scroll onClose={onClose}>
      <p className="text-center font-sans text-xs uppercase tracking-[0.35em] text-primary/80">{t("ancientScroll")}</p>
      <h2 className="mt-1 text-center font-serif text-2xl text-primary">📜 {t("seekGuidance")}</h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        {t("adIntro")}
      </p>
      <div className="mt-5 grid gap-3">
        <button disabled={!canWatch} onClick={() => watch("stones")} className="rounded-lg border border-primary/60 bg-primary/15 px-4 py-3 font-serif text-primary transition hover:bg-primary/25 disabled:opacity-40">
          💎 {t("askStones")} <span className="block text-xs text-muted-foreground">{t("askStonesSub")}</span>
        </button>
        <button disabled={!canWatch} onClick={() => setPicking((p) => !p)} className="rounded-lg border border-primary/60 bg-primary/15 px-4 py-3 font-serif text-primary transition hover:bg-primary/25 disabled:opacity-40">
          🌿 {t("askHerbs")} <span className="block text-xs text-muted-foreground">{t("askHerbsSub")}</span>
        </button>
        {picking && (
          <div className="rounded-lg border border-primary/40 bg-primary/5 p-3">
            <p className="mb-2 text-xs text-muted-foreground">{t("adChooseHerb")}</p>
            <div className="grid grid-cols-2 gap-2">
              {HERBS.map((h) => (
                <button
                  key={h.id}
                  disabled={!canWatch}
                  onClick={() => watch("herb", h.id)}
                  className="rounded-md border border-primary/50 bg-primary/10 px-2 py-2 font-serif text-sm text-primary transition hover:bg-primary/20 disabled:opacity-40"
                >
                  🌿 {c(`herb.${h.id}`, h.name)}
                  <span className="block text-[11px] text-muted-foreground">{t("herbTier", { t: h.tier, n: 3 })}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 text-center text-sm">
        {watching && <p className="text-primary">{t("adWatching")}</p>}
        {msg && <p className="text-primary">{msg}</p>}
        <p className="mt-1 text-muted-foreground">{t("adLeft", { a: left, b: MAX_ADS })}</p>
        {left > 0 && remain > 0 && <p className="text-muted-foreground">{t("adWait", { t: `${mm}:${ss}` })}</p>}
        {isSimulatedAds() && <p className="mt-2 text-[11px] text-muted-foreground/70">{t("adSim")}</p>}
      </div>
    </Scroll>
  );
}

export function DonateModal({ onClose }: { onClose: () => void }) {
  const { t, lang } = useI18n();
  const vietqr = assetUrl(qrCodeAsset);

  return (
    <Scroll onClose={onClose} gold compact>
      <div className="donate-heading text-center">
        <span aria-hidden className="text-2xl">⛩️</span>
        <h2 className="font-serif text-xl text-primary">{t("donateTitle")}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{t("donateSubtitle")}</p>
      </div>

      <div className={`donate-payment ${lang === "vi" ? "donate-payment-vi" : ""} mt-2 space-y-2 rounded-xl border border-primary/40 bg-background/50 p-3`}>
        {lang === "vi" ? (
          <>
            <div className="donate-qr mx-auto w-fit rounded-xl border-2 border-primary/70 bg-foreground p-1.5">
              <img src={vietqr} alt={t("qrAlt")} className="mx-auto h-44 w-auto rounded-lg object-contain" />
            </div>
            <p className="donate-account text-center text-[11px] text-muted-foreground">
              {BANK.bankName} • {BANK.account} • {BANK.owner}
            </p>
          </>
        ) : (
          <p className="text-center text-xs text-muted-foreground">💳 {t("donateCard")}</p>
        )}
        <div className="donate-links grid grid-cols-2 gap-2">
          <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-primary/60 bg-primary/10 px-2 py-2 text-center text-xs text-primary transition hover:bg-primary/20">
            ☕ Ko-fi
          </a>
          <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-primary/60 bg-primary/10 px-2 py-2 text-center text-xs text-primary transition hover:bg-primary/20">
            📘 Facebook
          </a>
        </div>
      </div>

      <div className="donate-message mt-2 space-y-1 rounded-xl border border-border bg-background/40 p-3 text-xs leading-snug text-foreground/90">
        <p>{t("donateP1")}</p>
        <p>{t("donateP2")}</p>
        <p>
          {t("donateP3a")}{" "}
          <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/50 hover:decoration-primary">{KOFI_LABEL}</a>
          {t("donateP3b")}{" "}
          <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/50 hover:decoration-primary">{FB_LABEL}</a>
          {t("donateP3c")}
        </p>
      </div>


      <button
        onClick={onClose}
        className="donate-done mt-3 w-full rounded-xl border-2 border-primary bg-primary px-4 py-2.5 font-serif text-primary-foreground transition hover:opacity-90"
      >
        {t("donateDone")}
      </button>
    </Scroll>
  );
}
