import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { UI, type UIKey } from "./ui";
import { CATALOG } from "./catalog";

export type Lang = "vi" | "en" | "zh";
export const LANGS: { id: Lang; flag: string; label: string; html: string }[] = [
  { id: "vi", flag: "🇻🇳", label: "Tiếng Việt", html: "vi" },
  { id: "en", flag: "🇬🇧", label: "English", html: "en" },
  { id: "zh", flag: "🇨🇳", label: "中文", html: "zh-Hans" },
];
const LANG_KEY = "tu-tien-lang-v1";
const IDX: Record<Lang, 0 | 1 | 2> = { vi: 0, en: 1, zh: 2 };

type Params = Record<string, string | number>;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: UIKey, params?: Params) => string;
  /** Dịch tên/mô tả danh mục game theo khóa ổn định, trả về fallback nếu thiếu. */
  c: (key: string, fallback: string) => string;
  locale: string;
}

const Ctx = createContext<I18nValue | null>(null);

function fill(s: string, params?: Params) {
  if (!params) return s;
  return s.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? ""));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "zh" || saved === "vi") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.id === lang)!.html;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const i = IDX[lang];
    return {
      lang,
      setLang,
      locale: lang === "vi" ? "vi-VN" : lang === "en" ? "en-US" : "zh-CN",
      t: (key, params) => fill(UI[key][i], params),
      c: (key, fallback) => {
        if (i === 0) return fallback;
        const entry = CATALOG[key];
        return entry ? entry[i - 1]! : fallback;
      },
    };
  }, [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside LanguageProvider");
  return v;
}
