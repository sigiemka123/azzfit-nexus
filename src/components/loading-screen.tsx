import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const seen = sessionStorage.getItem("azzfit.seen");
    if (seen) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("azzfit.seen", "1");
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-deep grid-bg"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[140px] animate-pulse-slow" />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <motion.h1
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "-0.02em", opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl font-extrabold uppercase text-neon neon-glow"
            >
              AZZFIT
            </motion.h1>

            <div className="flex h-10 items-end gap-1">
              {[0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0].map((d, i) => (
                <span
                  key={i}
                  className="w-1 rounded-sm bg-neon animate-equalizer"
                  style={{ height: "100%", animationDelay: `${d}s` }}
                />
              ))}
            </div>

            <div className="w-64 space-y-3">
              <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.6, ease: "easeInOut" }}
                  className="h-full bg-neon shadow-neon"
                />
              </div>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-neon">
                {t.loading}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
