import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LANGS, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong h-14 border-b border-white/5" : "bg-transparent h-16",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            to="/"
            className="font-display text-xl font-extrabold uppercase tracking-tighter text-neon transition-transform hover:scale-105 neon-glow"
          >
            AZZFIT
          </Link>
          <div className="hidden gap-6 text-sm font-medium text-zinc-400 md:flex">
            <a href="/#about" className="transition-colors hover:text-neon">
              {t.nav.about}
            </a>
            <a href="/#tracks" className="transition-colors hover:text-neon">
              {t.nav.tracks}
            </a>
            <a href="/#contact" className="transition-colors hover:text-neon">
              {t.nav.contact}
            </a>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs font-medium">
          <div className="hidden items-center rounded ring-1 ring-white/10 sm:flex">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-2 py-1 uppercase tracking-widest transition-colors",
                  lang === l ? "text-neon" : "text-zinc-500 hover:text-zinc-200",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to="/login"
            className="rounded-sm px-4 py-1.5 uppercase tracking-widest ring-1 ring-white/10 transition-all hover:bg-neon hover:text-deep hover:ring-neon"
          >
            {t.nav.login}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
