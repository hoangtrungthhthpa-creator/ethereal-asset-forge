import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  ARTIFACTS,
  ELEMENT_INFO,
  GRADE_INFO,
  HERBS,
  HerbId,
  MANUALS,
  manualsQiBonus,
  manualsLuckBonus,
  PILLS,
  PillId,
  REALMS,
  SpiritRoot,
  artifactAlchemyBonusPercent,
  artifactOf,
  breakthroughChance,
  fmt,
  hashSpiritRoot,
  isMajor,
  manualOf,
  qiNeeded,
  qiRate,
  stageIndex,
} from "@/lib/cultivation";
import { useCultivation } from "@/hooks/useCultivation";
import { useGameAudio, backgroundTrack } from "@/hooks/useGameAudio";
import { cn } from "@/lib/utils";
import { AdventureModal } from "@/components/AdventureModal";
import { BreakthroughModal } from "@/components/BreakthroughModal";
import { AscensionRoad } from "@/components/AscensionRoad";
import { AscensionEnding } from "@/components/AscensionEnding";
import { AdRewardModal, DonateModal } from "@/components/Monetization";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n";
import { trContent, trAny } from "@/i18n/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiên Lộ Vô Tận — Game Tu Tiên Nhàn Rỗi" },
      {
        name: "description",
        content:
          "Game tu tiên text-based: hấp thu linh khí, đột phá cảnh giới từ Luyện Khí tới Độ Kiếp, luyện đan, săn pháp bảo và phiêu lưu gặp kỳ ngộ.",
      },
      { property: "og:title", content: "Tiên Lộ Vô Tận — Game Tu Tiên Nhàn Rỗi" },
      {
        property: "og:description",
        content:
          "Bế quan tu luyện, vượt thiên kiếp, luyện đan dược và phiêu lưu tìm cơ duyên trên con đường trường sinh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

type Tab = "tuluyen" | "luyendan" | "tuido" | "congphap" | "phieuluu" | "nhatky";

const TABS: Tab[] = ["tuluyen", "luyendan", "tuido", "congphap", "phieuluu", "nhatky"];

function spiritRootBadgeClass(root: SpiritRoot) {
  const normalizedElement = String(root.element)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "");
  const element = normalizedElement === "water" || normalizedElement === "thuy" ? "thuy" : normalizedElement;

  if (element === "thuy") {
    return cn(
      "border-2 border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
      root.grade === "thuong" && "shadow-[0_0_15px_rgba(6,182,212,0.6)]",
      root.grade === "cuc" && "shadow-[0_0_20px_rgba(6,182,212,0.72)]",
    );
  }

  const gradeClasses = {
    ha: "border border-opacity-50",
    trung: "border-2 border-opacity-80",
    thuong: "border-2 shadow-[0_0_15px_var(--root-glow)]",
    cuc: "border-2 shadow-[0_0_20px_var(--root-glow)]",
  }[root.grade];

  const elementClasses = {
    kim: "border-slate-200/80 bg-slate-100/10 text-slate-100 [--root-glow:rgba(226,232,240,0.68)]",
    moc: "border-emerald-500/80 bg-emerald-950/40 text-emerald-300 [--root-glow:rgba(16,185,129,0.68)]",
    hoa: "border-red-500/80 bg-red-950/40 text-red-300 [--root-glow:rgba(239,68,68,0.68)]",
    tho: "border-amber-500/80 bg-amber-950/40 text-amber-300 [--root-glow:rgba(245,158,11,0.68)]",
  }[element as "kim" | "moc" | "hoa" | "tho"];

  return cn(gradeClasses, elementClasses);
}

function Game() {
  const { state, now, loaded, flash, seedReveal, isTestAscension, actions } = useCultivation();
  const audio = useGameAudio(backgroundTrack(state));
  const [tab, setTab] = useState<Tab>("tuluyen");
  const [resultRoot, setResultRoot] = useState<SpiritRoot | null>(null);
  const [showAds, setShowAds] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const { t, c, locale } = useI18n();
  const realmName = (i: number) => c(`realm.${i}`, REALMS[i]!.name);
  const rootName = (r: SpiritRoot) => t("rootTitle", { grade: c(`grade.${r.grade}`, GRADE_INFO[r.grade].name), element: c(`el.${r.element}`, ELEMENT_INFO[r.element].name) });
  const artName = (id: string | null) => { const a = artifactOf(id); return a ? c(`art.${a.id}`, a.name) : undefined; };
  const herbName = (id: string) => c(`herb.${id}`, HERBS.find((x) => x.id === id)!.name);

  const showOnboarding = loaded && !state.root;

  // Platform ad SDK: init on load, gameplayStart on first player input (deduplicated in lib/ads).
  useEffect(() => {
    void initAds();
    const start = () => gameplayStart();
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const need = qiNeeded(state);
  const pct = Math.min(100, (state.qi / need) * 100);
  const ready = state.qi >= need;
  const rate = qiRate(state, now);
  const chance = breakthroughChance(state);
  const major = isMajor(state);
  const stage = stageIndex(state);
  // Tiến trình trong đại cảnh giới hiện tại: các tầng đã qua + % linh khí tầng hiện tại
  const realmFrac = Math.min(
    1,
    ((state.level - 1) + pct / 100) / REALMS[state.realm]!.levels,
  );

  useEffect(() => {
    if (flash?.sound) audio.playSfx(flash.sound);
  }, [flash?.id, flash?.sound, audio.playSfx]);

  useEffect(() => {
    const handleInteraction = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("button, select, input, textarea, [role='button']")) {
        actions.recordInteraction();
      }
    };
    document.addEventListener("click", handleInteraction);
    return () => document.removeEventListener("click", handleInteraction);
  }, [actions.recordInteraction]);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-foreground ink-bg">
      <div className="mx-auto w-full max-w-[1180px] px-2 pb-12 pt-3 sm:px-6 sm:pb-20 sm:pt-8">
        <header
          className="root-aura rounded-2xl border border-border bg-black p-3.5 shadow-2xl sm:p-5"
          style={rootAuraStyle(state.root)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-primary/80 sm:text-xs sm:tracking-[0.4em]">
                {t("appName")}
              </p>
              <h1 className="mt-0.5 truncate font-serif text-xl font-semibold leading-tight tracking-wide sm:text-4xl">
                {t("appSubtitle")}
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowAds(true)}
                title={t("seekGuidanceTitle")}
                className="rounded-md border border-primary/60 bg-primary/15 px-2.5 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/25"
              >
                📜<span className="hidden sm:inline"> {t("seekGuidance")}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDonate(true)}
                title={t("enlightenTitle")}
                className="rounded-md border border-primary/60 bg-primary/15 px-2.5 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/25"
              >
                ⛩️<span className="hidden sm:inline"> {t("enlighten")}</span>
              </button>
              {/* Tạm ẩn nút Thử nghiệm Đăng Tiên — bật lại khi cần */}
              {/* {!state.ascended && (
                <button
                  type="button"
                  onClick={actions.testAscend}
                  title={t("testAscendTitle")}
                  className="rounded-md border border-amber-400/60 bg-amber-400/15 px-2.5 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/25"
                >
                  ☁️<span className="hidden sm:inline"> {t("testAscend")}</span>
                </button>
              )} */}
              <LanguageSwitcher />
              <button
                onClick={audio.toggle}
                className="rounded-md p-1.5 text-muted-foreground transition hover:text-foreground"
                aria-label={audio.enabled ? t("soundOff") : t("soundOn")}
              >
                {audio.enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
              </button>
            </div>
          </div>

          <AscensionRoad
            seed={state.destinySeed}
            realm={state.realm}
            realmFrac={realmFrac}
            revealIndex={seedReveal}
            onRevealDone={actions.dismissSeedReveal}
          />


        </header>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-12">
          {/* Bảng nhân vật */}
          <aside
            className={cn(
              "root-aura root-panel min-w-0 rounded-xl border bg-black p-4 backdrop-blur sm:p-5 md:col-span-4",
              state.root && ELEMENT_INFO[state.root.element].dark && GRADE_INFO[state.root.grade].opacity >= 0.5 && "root-panel-dark",
            )}
            style={{ ...rootPanelStyle(state.root), ...rootAuraStyle(state.root) }}
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/70 bg-black pb-3">
              <span className="min-w-0">
                <span className="block truncate font-serif text-lg font-semibold text-foreground">{state.name}</span>
              </span>
              <span className="shrink-0 rounded-md border border-primary/40 bg-primary/10 px-2 py-1.5 text-xs text-primary">
                {fmt(state.stones)} {t("spiritStones")}
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("realm")}</p>
            <h2 className="mt-1 font-serif text-2xl text-primary">{t("realmLevel", { realm: realmName(state.realm), level: state.level })}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c(`realmDesc.${state.realm}`, REALMS[state.realm]!.desc)}</p>
            {state.root && (
              <p
                className={cn(
                  "mt-2 inline-block rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
                  spiritRootBadgeClass(state.root),
                )}
              >
                {rootName(state.root)}
              </p>
            )}

            <div className="mt-5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t("qi")}</span>
                <span>
                  {fmt(state.qi)} / {fmt(need)}
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full border border-border bg-background/70">
                <div
                  className="h-full bg-gradient-to-r from-jade to-primary transition-[width] duration-200"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {t("qiPerSec", { rate: fmt(rate) })}
                {now < state.buffUntil && (
                  <span className="ml-2 text-jade">
                    {t("focusBuff", { s: Math.ceil((state.buffUntil - now) / 1000) })}
                  </span>
                )}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              <Stat label={t("statLayer")} value={`${stage + 1}`} />
              <Stat label={t("statBreaks")} value={`${state.breakthroughs}`} />
              <Stat label={t("statChance")} value={`${Math.round(chance * 100)}%`} />
            </div>

            {/* Ô trang bị pháp bảo duy nhất */}
            <div className="mt-3 rounded-lg border border-primary/40 bg-background/40 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t("artifactSlot")}
                  </p>
                  <p className="truncate font-serif text-primary">
                    {artName(state.equipped) ?? t("notEquipped")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {artifactOf(state.equipped)
                      ? t("artifactBonus", { mult: Math.round((artifactOf(state.equipped)?.mult ?? 0) * 100), luck: Math.round((artifactOf(state.equipped)?.luck ?? 0) * 100) })
                      : t("findArtifacts")}
                  </p>
                  {artifactAlchemyBonusPercent(state.equipped) > 0 && (
                    <p className="text-xs text-amber-300">
                      {t("alchemyBonus", { n: artifactAlchemyBonusPercent(state.equipped) })}
                    </p>
                  )}
                </div>
                <select
                  aria-label={t("chooseArtifact")}
                  value={state.equipped ?? ""}
                  onChange={(e) => actions.equipSlot(e.target.value || null)}
                  disabled={state.artifacts.length === 0}
                  className="max-w-[45%] rounded-md border border-border bg-secondary px-2 py-2 text-xs disabled:opacity-50"
                >
                  <option value="">{t("noEquip")}</option>
                  {ARTIFACTS.filter((a) => state.artifacts.includes(a.id)).map((a) => (
                    <option key={a.id} value={a.id}>
                      {c(`art.${a.id}`, a.name)} ({c(`tier.${a.rarity}`, a.rarity)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={actions.meditate}
                className="min-h-12 w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium transition hover:border-primary/60 hover:text-primary"
              >
                {t("meditate")}
              </button>
              <button
                onClick={actions.breakthrough}
                  disabled={!ready || state.ascended}
                className={cn(
                  "min-h-12 w-full rounded-lg px-4 py-3 text-sm font-semibold transition",
                  ready
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "cursor-not-allowed border border-border bg-card text-muted-foreground",
                )}
              >
                {major ? t("majorBreak") : t("minorBreak")}
              </button>
              {ready && major && (
                <p className="text-center text-xs text-destructive/90">
                  {t("majorWarn")}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                if (confirm(t("resetConfirm"))) actions.reset();
              }}
              className="mt-5 w-full text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
            >
              {t("resetBtn")}
            </button>
          </aside>

          {/* Khu vực chính */}
          <main className="root-aura min-w-0 rounded-xl border bg-black backdrop-blur md:col-span-8" style={rootAuraStyle(state.root)}>
            <nav
              className="grid grid-cols-3 gap-1.5 border-b border-border/70 p-2 md:grid-cols-6 md:gap-1"
              aria-label={t("features")}
            >
              {TABS.map((id) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? "page" : undefined}
                  className={cn(
                    "min-h-12 min-w-0 whitespace-nowrap rounded-md px-1 py-2.5 text-xs font-medium leading-tight transition md:min-h-10 md:px-1.5 md:py-2",
                    tab === id
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t(`tab_${id}`)}
                </button>
              ))}
            </nav>

            <div className="min-w-0 p-4 sm:p-5">
              {!loaded && <p className="text-sm text-muted-foreground">{t("loading")}</p>}

              {loaded && tab === "tuluyen" && (
                <div className="space-y-4">
                  <p className="font-serif text-lg">{t("secludedTitle")}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
{t("secludedDesc")}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {REALMS.map((r, i) => (
                      <div
                        key={r.name}
                        className={cn(
                          "rounded-lg border px-4 py-3 text-sm",
                          i === state.realm
                            ? "border-primary/60 bg-primary/10"
                            : i < state.realm
                              ? "border-jade/40 bg-jade/5 text-muted-foreground"
                              : "border-border bg-background/40 text-muted-foreground",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif">{realmName(i)}</span>
                          <span className="text-xs">
                            {i < state.realm
                              ? t("passed")
                              : i === state.realm
                                ? t("layerOf", { a: state.level, b: r.levels })
                                : t("layers", { n: r.levels })}
                          </span>
                        </div>
                        <p className="mt-1 text-xs opacity-80">{c(`realmDesc.${i}`, r.desc)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {loaded && tab === "luyendan" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <p className="font-serif text-lg">{t("alchemyRoom")}</p>
                    {state.brewing && (
                      <span className="max-w-48 text-right text-xs text-primary">
                        {t("brewing", { pill: c(`pill.${state.brewing.pill}`, PILLS.find((p) => p.id === state.brewing!.pill)!.name), s: Math.max(0, Math.ceil((state.brewing.endsAt - now) / 1000)) })}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {PILLS.map((p) => {
                      const canAfford =
                        state.stones >= p.stones &&
                        Object.entries(p.cost).every(
                          ([h, q]) => state.herbs[h as HerbId] >= (q as number),
                        );
                      return (
                        <div
                          key={p.id}
                          className="rounded-lg border border-border bg-background/40 p-4"
                        >
                          <div className="flex items-baseline justify-between">
                            <h3 className="font-serif text-base text-primary">{c(`pill.${p.id}`, p.name)}</h3>
                            <span className="text-xs text-muted-foreground">
                              {t("owned", { n: state.pills[p.id] })}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {c(`pillDesc.${p.id}`, p.desc)}
                          </p>
                          <p className="mt-2 text-xs">
                            {t("ingredients")}{" "}
                            {Object.entries(p.cost)
                              .map(
                                ([h, q]) =>
                                  `${q} ${herbName(h)}`,
                              )
                              .join(", ")}
                            {t("plusStones", { n: p.stones, s: p.seconds })}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => actions.brew(p.id)}
                              disabled={!!state.brewing || !canAfford}
                              className="flex-1 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs transition enabled:hover:border-primary/60 enabled:hover:text-primary disabled:opacity-40"
                            >
                              {t("brew")}
                            </button>
                            {(p.id === "tukhi" || p.id === "nguythan") && (
                              <button
                                onClick={() => actions.usePill(p.id as PillId)}
                                disabled={state.pills[p.id] <= 0}
                                className="flex-1 rounded-md bg-primary/90 px-3 py-1.5 text-xs font-medium text-primary-foreground transition enabled:hover:opacity-90 disabled:opacity-30"
                              >
                                {t("consume")}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("autoPills")}
                  </p>
                </div>
              )}

              {loaded && tab === "tuido" && (
                <div className="space-y-5">
                  <div>
                    <p className="font-serif text-lg">{t("herbsTitle")}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {HERBS.map((h) => (
                        <div
                          key={h.id}
                          className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm"
                        >
                          <p>{herbName(h.id)}</p>
                          <p className="text-xs text-muted-foreground">
                            {t("herbTier", { t: h.tier, n: state.herbs[h.id] })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-serif text-lg">{t("artifacts")}</p>
                    {state.artifacts.length === 0 ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t("noArtifacts")}
                      </p>
                    ) : (
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {ARTIFACTS.filter((a) => state.artifacts.includes(a.id)).map((a) => (
                          <button
                            key={a.id}
                            onClick={() => actions.equip(a.id)}
                            className={cn(
                              "rounded-lg border px-4 py-3 text-left text-sm transition",
                              state.equipped === a.id
                                ? "border-primary/70 bg-primary/10"
                                : "border-border bg-background/40 hover:border-primary/40",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-primary">{c(`art.${a.id}`, a.name)}</span>
                              <span className="text-xs text-muted-foreground">{c(`tier.${a.rarity}`, a.rarity)}</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {t("artifactCult", { mult: Math.round(a.mult * 100), luck: Math.round(a.luck * 100) })}
                            </p>
                            {artifactAlchemyBonusPercent(a.id) > 0 && (
                              <p className="mt-1 text-xs text-amber-300">
                                {t("alchemyBonus", { n: artifactAlchemyBonusPercent(a.id) })}
                              </p>
                            )}
                            <p className="mt-1 text-xs text-jade">
                              {state.equipped === a.id ? t("equippedUnequip") : t("equip")}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {loaded && tab === "congphap" && (
                <div className="space-y-4">
                  <p className="font-serif text-lg">{t("library")}</p>
                  <p className="text-sm text-muted-foreground">
{t("libraryDesc")}
                  </p>
                  <p className="text-xs text-jade">
                    {t("totalBonus", { q: Math.round(manualsQiBonus(state.manuals) * 100), l: Math.round(manualsLuckBonus(state.manuals) * 100) })}
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {MANUALS.map((m) => {
                      const owned = state.manuals.includes(m.id);
                      const active = state.equippedManual === m.id;
                      return (
                        <div
                          key={m.id}
                          className={cn(
                            "rounded-lg border p-4",
                            active ? "border-primary/60 bg-primary/10" : "border-border bg-background/40",
                          )}
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <h3 className="font-serif text-base text-primary">{c(`man.${m.id}`, m.name)}</h3>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {owned ? (active ? t("circulating") : t("learned")) : `${m.stones.toLocaleString(locale)} ${t("spiritStones")}`}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                            {c(`tier.${m.tier}`, m.tier)}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c(`manDesc.${m.id}`, m.desc)}</p>
                          <p className="mt-2 text-xs">
                            {m.qiMult > 0 && t("qiSpeed", { n: Math.round(m.qiMult * 100) })}
                            {m.qiMult > 0 && m.luck > 0 && " • "}
                            {m.luck > 0 && t("breakRate", { n: Math.round(m.luck * 100) })}
                          </p>

                          <button
                            onClick={() => (owned ? actions.equipManual(m.id) : actions.learnManual(m.id))}
                            disabled={!owned && state.stones < m.stones}
                            className={cn(
                              "mt-3 min-h-10 w-full rounded-md px-3 py-2 text-xs font-medium transition disabled:opacity-40",
                              active
                                ? "border border-border bg-secondary hover:border-primary/60"
                                : "bg-primary/90 text-primary-foreground enabled:hover:opacity-90",
                            )}
                          >
                            {active ? t("withdraw") : owned ? t("circulate") : t("comprehend")}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {loaded && tab === "phieuluu" && (
                <div className="space-y-4">
                  <p className="font-serif text-lg">{t("descend")}</p>
                  <p className="text-sm text-muted-foreground">
{t("descendDesc")}
                  </p>
                  <button
                    onClick={actions.explore}
                    disabled={now < state.exploringUntil}
                    className="min-h-12 w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition enabled:hover:opacity-90 disabled:opacity-40 sm:w-auto"
                  >
                    {now < state.exploringUntil
                      ? t("travelling", { s: Math.ceil((state.exploringUntil - now) / 1000) })
                      : t("setOut")}
                  </button>
                  <div className="space-y-2">
                    {state.log.slice(0, 6).map((l) => (
                      <LogRow key={l.id} text={l.text} kind={l.kind} />
                    ))}
                  </div>
                </div>
              )}

              {loaded && tab === "nhatky" && (
                <div className="space-y-2">
                  <p className="font-serif text-lg">{t("journal")}</p>
                  {state.log.map((l) => (
                    <LogRow key={l.id} text={l.text} kind={l.kind} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </section>
      </div>

      {/* Bộ đếm số giờ tu luyện và số lần tương tác (chỉ hiện số) */}
      <div
        className="pointer-events-none fixed bottom-2 right-2 z-50 text-xs text-yellow-400 select-none"
        aria-label={`${t("playHours")} · ${t("interactions")}`}
        aria-live="polite"
      >
        {state.createdAt ? Math.max(0, Math.floor((now - state.createdAt) / 3_600_000)) : 0} · {state.interactionCount}
      </div>

      <div className="fixed right-3 top-3 z-40 flex items-center gap-2 sm:right-5 sm:top-5">
        {audio.ready && (
          <button
            type="button"
            onClick={audio.toggle}
            aria-label={audio.enabled ? t("soundOff") : t("soundOn")}
            title={audio.enabled ? t("soundOff") : t("soundOn")}
            className="grid size-11 place-items-center rounded-full border border-border bg-card/90 text-primary shadow-lg backdrop-blur transition hover:border-primary"
          >
            {audio.enabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
        )}
      </div>

      {showAds && <AdRewardModal onClose={() => setShowAds(false)} onReward={actions.grantReward} />}
      {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}

      {loaded && state.ascended && <AscensionEnding state={state} onRestart={actions.reset} onExitTest={isTestAscension ? actions.exitTestAscension : undefined} />}

      {!state.ascended && flash?.breakthrough ? (
        <BreakthroughModal
          key={flash.id}
          notice={flash}
          root={state.root}
          onClose={() => actions.dismissNotice()}
        />
      ) : !state.ascended && flash ? (
        <EventToast key={flash.id} notice={flash} />
      ) : null}

      {loaded && state.pendingAdventure && (
<AdventureModal
                  event={state.pendingAdventure}
                  stones={state.stones}
          onSelect={(answerIndex, wager) => actions.resolveAdventure(answerIndex, wager)}
          auraStyle={rootAuraStyle(state.root)}
          />
      )}

      {showOnboarding && (
        <OnboardingModal
          onConfirm={(name, gender, digits) => {
            const root = hashSpiritRoot(digits);
            actions.onboard(name, gender, root, digits);
            setResultRoot(root);
          }}
        />
      )}

      {resultRoot && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm">
          <div
            className={cn(
              "root-panel w-full max-w-md rounded-2xl border-2 bg-card p-6 text-center",
              ELEMENT_INFO[resultRoot.element].dark &&
                GRADE_INFO[resultRoot.grade].opacity >= 0.5 &&
                "root-panel-dark",
            )}
            style={rootPanelStyle(resultRoot)}
          >
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("heavenResonance")}
            </p>
            <p className="mt-3 font-serif text-lg leading-relaxed">
              {t("congrats1")} <span className="font-semibold text-primary">{state.name}</span>{t("congrats2")}{" "}
              <span className={cn("inline-flex rounded-md px-2 py-1 font-semibold", spiritRootBadgeClass(resultRoot))}>{rootName(resultRoot)}</span>!
            </p>
            <button
              onClick={() => setResultRoot(null)}
              className="mt-6 min-h-12 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {t("startCultivating")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EventToast({ notice }: { notice: NonNullable<ReturnType<typeof useCultivation>["flash"]> }) {
  const [visible, setVisible] = useState(true);
  const { lang } = useI18n();
  const duration = notice.kind === "major" ? 3500 : 2000;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-3 top-16 z-[60] flex justify-center sm:top-6" aria-live="polite">
      <div
        className={cn(
          "event-toast w-full max-w-md rounded-lg border bg-card/95 px-4 py-3 text-center shadow-2xl backdrop-blur",
          notice.kind === "major" && "event-toast-major max-w-lg border-primary px-6 py-5 text-primary",
          notice.kind === "minor" && "border-jade/60 text-jade",
          notice.kind === "alchemy" && "border-jade bg-jade/15 text-jade",
          notice.kind === "gain" && "border-primary/70 bg-primary/15 text-primary",
          notice.kind === "loss" && "border-destructive/70 bg-destructive/15 text-destructive",
        )}
      >
        <p className={cn("font-serif text-sm leading-relaxed", notice.kind === "major" && "text-lg font-semibold")}>
          {trAny(notice.text, lang)}
        </p>
      </div>
    </div>
  );
}

function OnboardingModal({
  onConfirm,
}: {
  onConfirm: (name: string, gender: "nam" | "nu", digits: string) => void;
}) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"nam" | "nu">("nam");
  const [digits, setDigits] = useState("");
  const { t } = useI18n();
  const valid = name.trim().length > 0 && /^\d{6}$/.test(digits);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="relative flex items-center justify-center">
          <p className="text-center font-serif text-xs uppercase tracking-[0.4em] text-primary/80">
            {t("appName")}
          </p>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <LanguageSwitcher />
          </div>
        </div>
        <h2 className="mt-3 text-center font-serif text-xl leading-relaxed">
          {t("obGreeting")}
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="ob-name" className="text-xs uppercase tracking-widest text-muted-foreground">
              {t("daoName")}
            </label>
            <input
              id="ob-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              placeholder={t("charName")}
              className="mt-1.5 min-h-12 w-full rounded-md border border-border bg-background/70 px-3 py-2 text-base outline-none focus:border-primary"
            />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{t("gender")}</span>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["nam", "nu"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  aria-pressed={gender === g}
                  className={cn(
                    "min-h-12 rounded-md border px-3 py-2 text-sm font-medium transition",
                    gender === g
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-background/70 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {g === "nam" ? t("male") : t("female")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="ob-digits" className="text-xs uppercase tracking-widest text-muted-foreground">
              {t("digitsLabel")}
            </label>
            <input
              id="ob-digits"
              value={digits}
              onChange={(e) => setDigits(e.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              placeholder="••••••"
              className="mt-1.5 min-h-12 w-full rounded-md border border-border bg-background/70 px-3 py-2 text-center font-serif text-lg tracking-[0.5em] outline-none focus:border-primary"
            />
            {digits.length > 0 && digits.length < 6 && (
              <p className="mt-1 text-xs text-destructive">{t("digitsErr")}</p>
            )}
          </div>

          <button
            disabled={!valid}
            onClick={() => onConfirm(name.trim(), gender, digits)}
            className="min-h-12 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition enabled:hover:opacity-90 disabled:opacity-40"
          >
            {t("obConfirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

function rootAuraStyle(root: SpiritRoot | null): CSSProperties | undefined {
  if (!root) return undefined;
  const aura = {
    ha: { width: "1px", glow: "5px" },
    trung: { width: "2px", glow: "12px" },
    thuong: { width: "2.5px", glow: "16px" },
    cuc: { width: "3px", glow: "22px" },
  }[root.grade];
  const color = ELEMENT_INFO[root.element].hex;
  return {
    borderColor: color,
    borderWidth: aura.width,
    boxShadow: `0 0 ${aura.glow} ${color}99, inset 0 0 10px ${color}22`,
    "--root-aura-color": color,
    ...(root.grade === "cuc" ? { animation: "root-aura-pulse 2.4s ease-in-out infinite" } : {}),
  } as CSSProperties;
}

function rootPanelStyle(_root: SpiritRoot | null): CSSProperties | undefined {
  if (!_root) return undefined;
  return { backgroundColor: "#000000" };
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-2 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-sm">{value}</p>
    </div>
  );
}

function LogRow({ text, kind }: { text: string; kind: "info" | "good" | "bad" | "epic" }) {
  const { lang } = useI18n();
  return (
    <p
      className={cn(
        "rounded-md border-l-2 bg-background/40 px-3 py-2 text-sm whitespace-pre-wrap break-words",
        kind === "epic" && "border-primary text-primary",
        kind === "good" && "border-jade text-foreground",
        kind === "bad" && "border-destructive text-destructive",
        kind === "info" && "border-border text-muted-foreground",
      )}
    >
      {trAny(text, lang)}
    </p>
  );
}
