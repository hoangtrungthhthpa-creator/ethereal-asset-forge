import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BreakthroughModal } from "@/components/BreakthroughModal";
import { LanguageProvider } from "@/i18n";
import { CATALOG } from "@/i18n/catalog";
import { UI } from "@/i18n/ui";
import { trAny, trContent, trRoot } from "@/i18n/content";
import { ACTIONS, EVENTS, NEUTRAL_EVENTS } from "@/data/textStreamEvents";
import { REALM_QUESTIONS_DATABASE } from "@/data/realmQuestions";
import { ELEMENT_INFO, GRADE_INFO, newGame, rootTitle, type SpiritRoot } from "@/lib/cultivation";
import { rollModalEvent } from "@/utils/adventureLogic";

const untranslated = /[À-ỹĐđ]/;

describe("Complete game localization", () => {
  for (const lang of ["en", "zh"] as const) {
    it(`translates starting narration and all root grades/elements in ${lang}`, () => {
      expect(trAny(newGame().log[0]?.text ?? "", lang)).not.toMatch(untranslated);
      for (const grade of Object.keys(GRADE_INFO) as SpiritRoot["grade"][]) {
        for (const element of Object.keys(ELEMENT_INFO) as SpiritRoot["element"][]) {
          expect(trRoot(rootTitle({ grade, element }), lang)).not.toMatch(untranslated);
        }
      }
    });

    it(`translates every question and answer in ${lang}`, () => {
      for (const [realm, questions] of Object.entries(REALM_QUESTIONS_DATABASE)) {
        expect(trContent(realm, lang)).not.toMatch(untranslated);
        for (const q of questions) {
          for (const text of [q.question, q.correct, ...q.wrongs]) {
            expect(trContent(text, lang), text).not.toMatch(untranslated);
          }
        }
      }
    });

    it(`translates all action/event combinations and adjusted rewards in ${lang}`, () => {
      for (const action of ACTIONS) {
        for (const event of [...EVENTS, ...NEUTRAL_EVENTS]) {
          const text = `${action}  ${event.text}`;
          expect(trAny(text, lang), text).not.toMatch(untranslated);
          const adjusted = `${text.replace(/\[[^\]]*\]/g, "").trim()} [+ 17 Linh Thạch (+5%)]`;
          expect(trAny(adjusted, lang), adjusted).not.toMatch(untranslated);
        }
      }
    });

    it(`translates all adventure variants and attached artifact rewards in ${lang}`, () => {
      for (let i = 0; i < 2000; i++) {
        const e = rollModalEvent(() => i / 2000);
        for (const text of [e.title, e.description, e.option1.text, e.option1.successText, e.option1.failText, e.option2.text, e.option2.successText, e.option2.failText]) {
          expect(trAny(text, lang), text).not.toMatch(untranslated);
        }
      }
      const text = "Ngươi phân xử công bằng, hai bên tặng linh thạch và dược liệu. Ngươi nhận được Tụ Linh Kỳ (Sơ cấp) — mốc 1/10!";
      expect(trAny(text, lang)).not.toMatch(untranslated);
      expect(trAny("Đột phá thất bại, may nhờ Hộ Tâm Đan hộ thể nên linh khí không tán.", lang)).not.toMatch(untranslated);
    });
  }

  it("preserves Vietnamese and player names", () => {
    const text = newGame().log[0]?.text ?? "";
    expect(trAny(text, "vi")).toBe(text);
    expect(trAny("Thiên địa cảm ứng, HỒ ANH DŨNG khai mở Thượng Phẩm Hỏa Linh Căn, chính thức bước lên đạo đồ.", "en")).toContain("HỒ ANH DŨNG");
  });

  it("renders the breakthrough spirit root through the UI dictionary", () => {
    const html = renderToStaticMarkup(<LanguageProvider><BreakthroughModal root={{ grade: "thuong", element: "hoa" }} onClose={() => {}} notice={{ id: 1, text: "", kind: "major", breakthrough: { type: "major", name: "Player", realmTitle: "Trúc Cơ tầng 1", qiRateGain: 3.8, lifespanGain: 37 } }} /></LanguageProvider>);
    expect(html).toContain("Thượng Phẩm Hỏa Linh Căn");
  });

  it("has complete dictionaries and matching interpolation fields", () => {
    for (const [key, entries] of Object.entries(UI)) {
      const params = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
      for (const text of entries) expect(text, key).not.toBe("");
      expect(params(entries[1]), key).toEqual(params(entries[0]));
      expect(params(entries[2]), key).toEqual(params(entries[0]));
    }
    for (const [key, entries] of Object.entries(CATALOG)) for (const text of entries) expect(text, key).not.toBe("");
  });
});