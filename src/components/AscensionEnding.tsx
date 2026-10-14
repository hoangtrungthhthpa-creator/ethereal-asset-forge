import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CalendarDays, ExternalLink, Feather, RotateCcw, Sparkles } from "lucide-react";
import ascensionRealm from "@/assets/ascension-realm.jpg";
import { ELEMENT_INFO, GRADE_INFO, fmt, type GameState } from "@/lib/cultivation";
import { useI18n } from "@/i18n";
import { POEMS_EN, POEMS_ZH } from "@/i18n/poems";

interface AscensionEndingProps {
  state: GameState;
  onRestart: () => void;
  onExitTest?: (() => void) | undefined;
}

const dangTienPoems: readonly string[] = [
  "Trầm luận vạn kiếp vượt phong ba,\nKiếp tận hoa nở chốn Đại La.\nĐộ kiếp thành công tâm ý nguyện,\nTrời cao vững bước đạp mây hoa.",
  "Kiếm chỉ cửu thiên phá huyễn không,\nĐăng Tiên đài thượng khởi linh phong.\nNgàn năm tu luyện thành chánh quả,\nNhất cử phi thăng hóa Cửu Long.",
  "Bách kiếp lôi đình thử sắt gan,\nTrầm luân trần thế thảy tiêu tan.\nTay ôm nhật nguyệt vờn mây bích,\nSắc phong Tiên Tôn chốn Thượng Ngàn.",
  "Huyết đao thu giáp lánh trần ai,\nMột bước phi thăng tới Cửu Đài.\nVũ trụ trong tay làm nước cờ,\nThiên hạ ngàn năm hỏi có ai?",
  "Ngũ hành luân chuyển phá kiếp tai,\nĐứng đỉnh Đăng Tiên hướng Thượng Đài.\nThiên Đạo cúi đầu xin nhượng bước,\nTự do dạo bước cõi Tuyền Đài.",
  "Hạc trắng vờn quanh dốc Côn Lôn,\nĐăng Tiên đài tỏa ánh hằng hôn.\nRửa sạch bụi trần tâm tựa ngọc,\nNhất niệm phi thăng nhập Thánh Hồn.",
  "Phong sương giặt áo chốn trần ai,\nNay bước chân lên Đăng Tiên Đài.\nTay ôm bầu rượu nhìn mây cuộn,\nThong thả dạo chơi cõi Bồng Lai.",
  "Tiên đài nghi ngút khói trầm hương,\nTiếng hạc ngâm vang khắp bốn phương.\nCắt đứt duyên trần buông phiền não,\nBay về chốn cũ rợp mây sương.",
  "Chân bước mây xanh nhẹ tựa lông,\nTiên duyên đã trọn sạch trần hồng.\nTọa trên đài ngọc nhìn trần thế,\nVạn kiếp trôi qua tựa hư không.",
  "Cửu trùng mây thắm rộng đường đi,\nĐạt tới Tiên Cảnh đạt Vô Vi.\nRửa tay gác lại chuyện phiền toái,\nNgọc ấn sắc phong rạng uy nghi.",
  "Vạn vật sinh linh tỏa ngát hương,\nMộc căn ngộ đạo thoát vô thường.\nTiên đài hoa nở muôn màu thắm,\nTrường sinh bất lão chốn Thượng Sương.",
  "Thần hỏa ngút trời xé hư không,\nĐột phá lôi kiếp rực ánh hồng.\nĐăng Tiên đài hạ quỷ thần phục,\nChấn động ba tầng cõi Thiên Cung.",
  "Nước chảy mây trôi đạo tự nhiên,\nTĩnh lặng ngàn năm hóa Tiên Nhân.\nSương đọng đài cao ngời ánh ngọc,\nSắc phong Chân Tôn thoát luân hồi.",
  "Vạn kiếm quy tông xé mây ngàn,\nKim thân bất hoại vượt lôi gian.\nTiên đài vang dội vang tiếng thép,\nNgang dọc cửu thiên há ngại gian?",
  "Càn khôn nâng bước vững như sơn,\nBách kiếp phong bão chẳng oán hờn.\nThổ căn quy tụ về Chân Đạo,\nĐài ngọc sùng cao đức sánh trời.",
  "Đăng Tiên đài rộng mở Tiên Môn,\nNhìn lại nhân gian dốc Côn Lôn.\nHồng Hoang thiên đạo đang chờ đón,\nTam Thanh dõi mắt đợi Anh Hồn.",
  "Vượt kiếp lôi đình bước tới Tiên,\nHồng Hoang kiếp nạn chực chờ bên.\nTam Thanh lập giáo tranh nhân quả,\nViết lại thiên thư giữ đạo bền.",
  "Bước lên đài ngọc nhận sắc phong,\nNgoảnh lại trần gian dạ nhẹ chòng.\nHồng Hoang vây bọc vòng nhân quả,\nĐột phá càn khôn ngự Cửu Long.",
  "Đăng Tiên đài hạ tỏ ánh linh,\nSắc phong hiệu vị bậc Chân Trình.\nMai sau tiến nhập thời Hồng Hoang,\nCùng với Tam Thanh định thái bình.",
  "Một bước Đăng Tiên dứt trần duyên,\nDanh đề Thiên Kính rạng Tiên Hiền.\nCàn khôn rộng mở con đường mới,\nBất tử trường sinh cõi Thánh Thiêng."
];

function randomPoem(len: number, exclude?: number) {
  let i = Math.floor(Math.random() * len);
  if (i === exclude) i = (i + 1) % len;
  return i;
}

export function AscensionEnding({ state, onRestart, onExitTest }: AscensionEndingProps) {
  const { t, c, lang } = useI18n();
  const poems = lang === "en" ? POEMS_EN : lang === "zh" ? POEMS_ZH : dangTienPoems;
  const [sealed, setSealed] = useState(false);
  const [poemIndex, setPoemIndex] = useState(() => randomPoem(dangTienPoems.length));
  const [poemVisible, setPoemVisible] = useState(true);
  const [scene, setScene] = useState<"arrival" | "reveal">("arrival");
  const destinyCode = (state.destinySeed ?? "000000000000000000000000000").padEnd(27, "0").slice(0, 27);
  const groups = destinyCode.match(/.{1,3}/g) ?? [destinyCode];
  const root = state.root
    ? t("rootTitle", { grade: c(`grade.${state.root.grade}`, GRADE_INFO[state.root.grade].name), element: c(`el.${state.root.element}`, ELEMENT_INFO[state.root.element].name) })
    : t("noRoot");
  const playHours = state.createdAt ? Math.max(0, Math.floor((Date.now() - state.createdAt) / 3_600_000)) : 0;
  const qrValue = useMemo(
    () => `${state.name} | ${root} | ${destinyCode} | ${playHours} | ${state.interactionCount}`,
    [destinyCode, root, playHours, state.interactionCount, state.name],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setScene("reveal"), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (sealed) return;
    let fadeTimer: number | undefined;
    const interval = window.setInterval(() => {
      setPoemVisible(false);
      fadeTimer = window.setTimeout(() => {
        setPoemIndex((current) => randomPoem(poems.length, current));
        setPoemVisible(true);
      }, 500);
    }, 30000);
    return () => {
      window.clearInterval(interval);
      if (fadeTimer) window.clearTimeout(fadeTimer);
    };
  }, [sealed, poems.length]);

  return (
    <div className="ascension-ending fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="ascension-title">
      <img src={ascensionRealm} alt={t("ascBgAlt")} width={1920} height={1200} className="ascension-backdrop" />
      <div className="ascension-light" aria-hidden="true" />
      <div className="ascension-cloud ascension-cloud-left" aria-hidden="true" />
      <div className="ascension-cloud ascension-cloud-right" aria-hidden="true" />

      {scene === "arrival" ? (
        <div className="ascension-arrival" aria-live="assertive">
          <div className="ascension-soul" aria-hidden="true"><Sparkles /></div>
          <p>{t("ascArrival1")}</p>
          <h2>{t("ascArrival2")}</h2>
          <span>{t("ascArrival3")}</span>
        </div>
      ) : (
        <main className="ascension-stage animate-fade-in">
          <section className="heavenly-mirror">
            <div className="mirror-runes" aria-hidden="true">雲 · 道 · 仙 · 天 · 命 · 昇</div>
            <header className="mirror-heading">
              <span>{t("ascKicker")}</span>
              <h1 id="ascension-title">{t("ascTerrace")}</h1>
              <p>{t("ascSub")}</p>
            </header>

            <div className="mirror-grid">
              <div className="immortal-profile">
                <p className="mirror-label">{t("ascName")}</p>
                <strong>{state.name}</strong>
                <p className="mirror-label">{t("ascRoot")}</p>
                <span>{root}</span>
              </div>
              <blockquote className="poem-fade" style={{ opacity: poemVisible ? 1 : 0 }} aria-live="polite">
                {(poems[poemIndex % poems.length] ?? "").split("\n").map((line) => <span key={line}>“{line}”</span>)}
              </blockquote>
              <div className="ending-qr">
                <QRCodeSVG value={qrValue} size={116} level="M" marginSize={2} title={t("ascQrTitle")} />
                <span>{t("ascQrScan")}</span>
              </div>
            </div>

            <div className="destiny-code">
              <p><Feather size={14} /> {t("ascCode")}</p>
              <div>{groups.map((group, index) => <span key={`${group}-${index}`}>{group}</span>)}</div>
            </div>

            <div className="journey-stats">
              <EndingStat label={t("ascStatBreaks")} value={`${state.breakthroughs}/57`} />
              <EndingStat label={t("ascStatFails")} value={t("ascStatFailsVal", { n: state.failures })} />
              <EndingStat label={t("ascStatStones")} value={fmt(state.totalStonesEarned)} />
              <EndingStat label={t("ascStatAdv")} value={t("ascStatAdvVal", { n: state.adventuresCompleted })} />
            </div>
          </section>

          <div className="ascension-seal" aria-hidden="true"><span>登</span><small>仙</small></div>

          <section className="ascension-promise">
            <CalendarDays size={18} aria-hidden="true" />
            <p>{t("ascPromise")}</p>
          </section>

          {sealed && <p className="ascension-promise" role="status">{t("ascSealed", { n: state.name })}</p>}
          <div className="ending-actions">
            <button type="button" onClick={() => setSealed(true)} disabled={sealed} className="ascension-cta">
              {t("ascConfer")}
            </button>
            <button type="button" disabled title={t("ascSoonTitle")} className="ascension-cta">
              <ExternalLink size={17} aria-hidden="true" /> {t("ascContinue")} <small>{t("ascSoon")}</small>
            </button>
            {onExitTest && (
              <button type="button" onClick={onExitTest} className="ascension-restart">{t("ascExitTest")}</button>
            )}
            <button type="button" onClick={() => { if (window.confirm(t("ascRestartConfirm"))) onRestart(); }} className="ascension-restart">
              <RotateCcw size={16} aria-hidden="true" /> {t("ascRestart")}
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

function EndingStat({ label, value }: { label: string; value: string }) {
  return <div><p>{label}</p><strong>{value}</strong></div>;
}