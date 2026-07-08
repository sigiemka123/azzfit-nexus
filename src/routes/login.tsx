import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — AZZFIT" },
      { name: "description", content: "Sign in to your AZZFIT account." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Login — AZZFIT" },
      { property: "og:url", content: "/login" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 pt-24 pb-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[140px] animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong relative w-full max-w-md rounded-xl p-8 shadow-neon"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neon">// ACCESS</p>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight">
          {mode === "signup" ? t.login.signUp : mode === "reset" ? t.login.forgot : t.login.title}
        </h1>
        <p className="mt-1 text-sm text-zinc-400">{t.login.subtitle}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("This is a UI-only demo. Connect Lovable Cloud to enable authentication.");
          }}
          className="mt-8 space-y-4"
        >
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              {t.login.email}
            </span>
            <input
              required
              type="email"
              className="mt-1 w-full rounded bg-deep/60 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition-all focus:ring-neon/60"
              placeholder="you@example.com"
            />
          </label>
          {mode !== "reset" && (
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {t.login.password}
              </span>
              <input
                required
                type="password"
                className="mt-1 w-full rounded bg-deep/60 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition-all focus:ring-neon/60"
                placeholder="••••••••"
              />
            </label>
          )}

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-sm bg-neon py-3.5 font-display text-sm font-extrabold uppercase tracking-widest text-deep transition-transform hover:scale-[1.01]"
          >
            <span className="relative z-10">
              {mode === "signup" ? t.login.signUp : mode === "reset" ? t.login.forgot : t.login.signIn}
            </span>
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs">
          <button
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="text-zinc-400 transition-colors hover:text-neon"
          >
            {mode === "signup" ? t.login.signIn : t.login.signUp}
          </button>
          <button
            onClick={() => setMode(mode === "reset" ? "signin" : "reset")}
            className="text-zinc-500 transition-colors hover:text-neon"
          >
            {t.login.forgot}
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <Link to="/" className="hover:text-neon">
            ← Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
