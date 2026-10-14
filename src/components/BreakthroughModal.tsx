import { useEffect, useRef } from "react";
import { ELEMENT_INFO, GRADE_INFO, type SpiritRoot } from "@/lib/cultivation";
import type { GameNotice } from "@/hooks/useCultivation";
import { useI18n } from "@/i18n";
import { trRealm } from "@/i18n/content";

interface BreakthroughModalProps {
  notice: GameNotice;
  onClose: () => void;
  root: SpiritRoot | null;
}

const MAJOR_REALM_VERSES: Record<string, string> = {
  "Luyện Khí": "Phàm thể sơ khai bước nghịch thiên, một đao chém đứt sợi duyên trần.",
  "Trúc Cơ": "Đắp nền vững chãi thông tam giới, thấu hiểu huyền cơ cõi thế gian.",
  "Kim Đan": "Đan thành chín chuyển ôm trời đất, nội uẩn thần quang chiếu vạn trùng.",
  "Nguyên Anh": "Anh nhi xuất khiếu kinh thiên địa, pháp tướng uy lừng lẫy càn khôn.",
  "Hóa Thần": "Thần niệm tung hoành ngang dọc cõi, một niệm sinh diệt vạn linh tuân.",
  "Luyện Hư": "Hư không dung hợp quy chân ngã, vạn trượng hồng trần tựa khói mây.",
  "Hợp Thể": "Hợp thể càn khôn trong chớp mắt, đảo lộn âm dương nắm thái hư.",
  "Đại Thừa": "Đại thừa vạn kiếp thân bất diệt, đứng trên thiên đạo ngắm phong vân.",
  "Độ Kiếp": "Một bước vượt thiên quan, vạn kiếp hóa trường sinh.",
  "Đăng Tiên": "Một bước vượt thiên quan, vạn kiếp hóa trường sinh.",
};

const MAJOR_REALM_TIERS: Record<string, number> = {
  "Luyện Khí": 1,
  "Trúc Cơ": 2,
  "Kim Đan": 3,
  "Nguyên Anh": 4,
  "Hóa Thần": 5,
  "Luyện Hư": 6,
  "Hợp Thể": 7,
  "Đại Thừa": 8,
  "Độ Kiếp": 9,
  "Đăng Tiên": 9,
};

function normalizedMajorRealm(realmTitle: string): string {
  return realmTitle
    .trim()
    .replace(/\s+Kỳ$/i, "")
    .replace(/\s+tầng\s+\d+$/i, "");
}

const MAJOR_REALMS = [
  "Luyện Khí",
  "Trúc Cơ",
  "Kim Đan",
  "Nguyên Anh",
  "Hóa Thần",
  "Luyện Hư",
  "Hợp Thể",
  "Đại Thừa",
  "Độ Kiếp",
  "Đăng Tiên",
] as const;

function majorRealmVerseIndex(realmTitle: string): number {
  const realm = normalizedMajorRealm(realmTitle);
  const realmIndex = MAJOR_REALMS.indexOf(realm as (typeof MAJOR_REALMS)[number]);

  // The verse celebrates the realm being transcended, so a breakthrough
  // from Luyện Khí into Trúc Cơ displays the Luyện Khí verse.
  const transcended = realmIndex > 0 ? realmIndex - 1 : Math.max(0, realmIndex);
  return Math.min(transcended, 8);
}

function majorRealmTier(realmTitle: string): number {
  return MAJOR_REALM_TIERS[normalizedMajorRealm(realmTitle)] ?? 1;
}

function majorRealmTheme(tier: number): string {
  return `breakthrough-tier-${Math.max(1, Math.min(9, tier))}`;
}

function spiritRootClass(root: SpiritRoot) {
  const normalizedElement = String(root.element)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "");
  const element = normalizedElement === "water" || normalizedElement === "thuy" ? "thuy" : normalizedElement;

  if (element === "thuy") {
    return [
      "border-2 border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
      root.grade === "thuong" && "shadow-[0_0_15px_rgba(6,182,212,0.6)]",
      root.grade === "cuc" && "shadow-[0_0_20px_rgba(6,182,212,0.72)]",
    ].filter(Boolean).join(" ");
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

  return [gradeClasses, elementClasses].join(" ");
}

export function BreakthroughModal({ notice, onClose, root }: BreakthroughModalProps) {
  const { t, c, lang } = useI18n();
  const data = notice.breakthrough;
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!data || data.type !== "minor") return;

    const timer = window.setTimeout(() => onCloseRef.current(), 5000);
    return () => window.clearTimeout(timer);
  }, [data, notice.id]);

  if (!data) return null;

  const currentRealmTier = data.type === "major" ? majorRealmTier(data.realmTitle) : 1;
  const realmTheme = majorRealmTheme(currentRealmTier);

  if (data.type === "minor") {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose} role="presentation">
        <div
          className="event-toast minor-breakthrough-toast relative w-full max-w-md cursor-pointer overflow-hidden rounded-xl border border-amber-500/80 bg-black/90 px-5 py-4 text-center text-amber-100 shadow-2xl shadow-amber-500/30 backdrop-blur-md"
          role="status"
          aria-live="assertive"
          onClick={(event) => event.stopPropagation()}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/75">{t("btSuccess")}</p>
          <p className="mt-2 font-serif text-lg">{t("btEnter", { realm: trRealm(data.realmTitle, lang) })}</p>
          <p className="mt-1 text-sm text-primary/80">{t("btQiGain", { n: data.qiRateGain.toFixed(1) })}</p>
          <p className="mt-3 text-[11px] text-amber-200/65">{t("btAutoHide")}</p>
          <span className="minor-breakthrough-progress" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md" onClick={onClose} role="presentation">
      <div
        className={`breakthrough-modal ${realmTheme} relative w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-primary bg-black px-5 py-7 text-primary shadow-2xl shadow-primary/30 sm:px-10 sm:py-9`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="breakthrough-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-y-0 left-3 hidden items-center sm:flex"><span className="breakthrough-runes">符<br />文<br />天<br />道<br />玄<br />黄</span></div>
        <div className="pointer-events-none absolute inset-y-0 right-3 hidden items-center sm:flex"><span className="breakthrough-runes">黄<br />玄<br />道<br />天<br />文<br />符</span></div>
        <div className="relative mx-auto max-w-xl text-center">
          <span className="inline-flex rounded-full border border-primary/70 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.28em]">{t("btKicker")}</span>
          <p className="mt-5 text-xs uppercase tracking-[0.38em] text-primary/70">{t("btSub")}</p>
          <h2 id="breakthrough-title" className="mt-2 font-serif text-3xl font-bold tracking-wide text-primary sm:text-5xl">{t("btTitle")}</h2>
          <p className="mx-auto mt-4 max-w-lg font-serif text-base italic leading-relaxed text-primary/80 sm:text-lg">“{t(`btVerse${majorRealmVerseIndex(data.realmTitle)}` as Parameters<typeof t>[0])}”</p>

          <div className="mt-7 grid gap-3 text-left sm:grid-cols-2">
            <Info label={t("btDaoName")} value={data.name} />
            <Info
              label={t("btRoot")}
              value={root ? t("rootTitle", { grade: c(`grade.${root.grade}`, GRADE_INFO[root.grade].name), element: c(`el.${root.element}`, ELEMENT_INFO[root.element].name) }) : t("btNoRoot")}
              {...(root ? { className: spiritRootClass(root) } : {})}
            />
            <Info label={t("btRealm")} value={trRealm(data.realmTitle, lang)} highlight />
            <Info label={t("btQiRate")} value={`+${data.qiRateGain.toFixed(1)}`} />
          </div>
          <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">{t("btLifespan")} <strong className="ml-1 text-base text-primary">{t("btYears", { n: data.lifespanGain })}</strong></div>
          <button type="button" onClick={onClose} className="mt-7 min-h-12 w-full rounded-lg border border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.18em] text-black transition hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black">{t("btCollect")}</button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, highlight = false, className }: { label: string; value: string; highlight?: boolean; className?: string }) {
  return <div className={`rounded-lg border border-primary/25 bg-primary/[0.04] px-4 py-3 ${className ?? ""}`}><p className="text-[10px] uppercase tracking-[0.2em] text-primary/60">{label}</p><p className={`mt-1 font-serif ${highlight ? "text-xl font-bold text-primary" : "text-base text-primary/90"}`}>{value}</p></div>;
}

export default BreakthroughModal;
