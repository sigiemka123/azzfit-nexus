import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { socials } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-deep pt-20 pb-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link to="/" className="font-display text-2xl font-extrabold uppercase tracking-tighter text-neon neon-glow">
            AZZFIT
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            © {new Date().getFullYear()} AZZFIT. {t.footer.rights}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-medium">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-widest text-zinc-400 transition-colors hover:text-neon"
            >
              {s.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-neon"
        >
          {t.footer.top}
          <ArrowUp className="size-3" />
        </button>
      </div>
    </footer>
  );
}
