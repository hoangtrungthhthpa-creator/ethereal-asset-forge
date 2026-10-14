import { useEffect, useRef, useState } from "react";
import { Check, Languages } from "lucide-react";
import { LANGS, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.id === lang)!;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        title={t("language")}
        className="jade-frame flex h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold text-primary"
      >
        <span aria-hidden="true">{current.flag}</span>
        <Languages size={14} aria-hidden="true" className="hidden sm:block" />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t("language")}
          className="jade-frame absolute right-0 top-full z-[70] mt-2 w-40 overflow-hidden rounded-lg p-1 shadow-2xl animate-fade-in"
        >
          {LANGS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                role="option"
                aria-selected={lang === l.id}
                onClick={() => {
                  setLang(l.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition",
                  lang === l.id ? "bg-primary/20 text-primary" : "text-foreground hover:bg-primary/10",
                )}
              >
                <span aria-hidden="true">{l.flag}</span>
                <span className="flex-1 font-serif">{l.label}</span>
                {lang === l.id && <Check size={14} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
