import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Copy, Instagram, Mail, Music, Play, Youtube } from "lucide-react";
import { artist, socials, tracks } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";
import { usePlayer } from "@/lib/player-context";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TracksSection />
      <ContactSection />
    </>
  );
}

function HeroSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 pt-32 pb-24 md:min-h-screen md:flex md:items-center"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 size-[600px] rounded-full bg-neon/10 blur-[140px] animate-pulse-slow" />
        <div
          className="absolute top-1/2 -right-24 size-[400px] rounded-full bg-neon-soft/5 blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "1.4s" }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "-0.05em" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="font-display text-[18vw] font-extrabold uppercase leading-none text-zinc-50 md:text-[13vw]"
        >
          {artist.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.35em] text-neon md:text-sm"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid w-full items-center gap-12 lg:grid-cols-[1fr_400px_1fr]"
        >
          <div className="hidden h-px bg-gradient-to-r from-transparent to-zinc-800 lg:block" />
          <a href="#tracks" className="group relative mx-auto block w-full max-w-[360px]">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              src={artist.heroArtwork}
              alt="Latest release artwork"
              width={1024}
              height={1024}
              className="aspect-square w-full rounded-lg object-cover ring-1 ring-white/10"
            />
            <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-neon/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neon backdrop-blur">
              {t.hero.badge}
            </div>
          </a>
          <div className="hidden h-px bg-gradient-to-l from-transparent to-zinc-800 lg:block" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="mt-12"
        >
          <a
            href="#tracks"
            className="group relative inline-flex items-center gap-3 rounded-sm bg-neon px-8 py-3.5 font-display text-base font-bold uppercase tracking-widest text-deep ring-2 ring-neon/30 ring-offset-4 ring-offset-deep transition-transform hover:scale-[1.03]"
          >
            <span>{t.hero.cta}</span>
            <Play className="size-4 fill-current transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -z-10 rounded-sm bg-neon opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const { t, lang } = useI18n();
  return (
    <section id="about" className="border-y border-white/5 bg-surface/30 py-24 px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img
              src={artist.portrait}
              alt={`${artist.name} portrait`}
              width={1000}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-lg object-cover ring-1 ring-white/10"
            />
            <div className="absolute -bottom-5 -right-5 hidden bg-neon p-5 text-deep sm:block">
              <p className="font-display text-3xl font-extrabold leading-none">20K+</p>
              <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest">
                Monthly listeners
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="space-y-8">
          <h2 className="font-display text-4xl font-extrabold uppercase leading-tight tracking-tight text-balance md:text-5xl">
            {t.about.heading} <span className="text-neon neon-glow">{t.about.accent}</span>
          </h2>
          <p className="max-w-[52ch] text-pretty text-lg text-zinc-400">{artist.bio[lang]}</p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="group relative overflow-hidden rounded bg-neon px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-deep transition-transform hover:scale-105">
              {t.about.follow}
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </button>
            <div className="flex flex-wrap gap-2 border-l border-zinc-800 pl-4">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full bg-white/5 text-xs font-bold uppercase text-zinc-300 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:bg-neon hover:text-deep hover:shadow-neon"
                >
                  {socialIcon(s.id)}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function socialIcon(id: string) {
  if (id === "instagram") return <Instagram className="size-4" />;
  if (id === "youtube") return <Youtube className="size-4" />;
  if (id === "spotify" || id === "soundcloud") return <Music className="size-4" />;
  return <span>{id.slice(0, 2).toUpperCase()}</span>;
}

function TracksSection() {
  const { t } = useI18n();
  const { play, current, isPlaying } = usePlayer();

  return (
    <section id="tracks" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neon">
                // DISCOGRAPHY
              </p>
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
                {t.tracks.heading}
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              {t.tracks.count(tracks.length)}
            </span>
          </div>
        </Reveal>

        <div className="divide-y divide-white/5 overflow-hidden rounded-lg ring-1 ring-white/5">
          {tracks.map((track, i) => {
            const active = current.slug === track.slug && isPlaying;
            return (
              <Reveal key={track.slug} delay={i * 0.05} y={12}>
                <div
                  className={cn(
                    "group grid grid-cols-[24px_48px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-neon/5 sm:gap-6 sm:grid-cols-[32px_48px_minmax(0,1fr)_auto_auto_auto]",
                    active && "bg-neon/5",
                  )}
                >
                  <span className="w-6 shrink-0 text-center font-mono text-xs tabular-nums text-zinc-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    to="/tracks/$slug"
                    params={{ slug: track.slug }}
                    className="relative size-12 shrink-0 overflow-hidden rounded ring-1 ring-white/10"
                  >
                    <img
                      src={track.cover}
                      alt={track.title}
                      width={100}
                      height={100}
                      loading="lazy"
                      className="size-full object-cover transition-transform group-hover:scale-110"
                    />
                    {active && (
                      <div className="absolute inset-0 grid place-items-center bg-deep/60">
                        <div className="flex h-4 items-end gap-0.5">
                          <span className="w-0.5 bg-neon animate-equalizer" style={{ height: "100%" }} />
                          <span
                            className="w-0.5 bg-neon animate-equalizer"
                            style={{ height: "100%", animationDelay: "0.15s" }}
                          />
                          <span
                            className="w-0.5 bg-neon animate-equalizer"
                            style={{ height: "100%", animationDelay: "0.3s" }}
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                  <Link
                    to="/tracks/$slug"
                    params={{ slug: track.slug }}
                    className="min-w-0 flex-1"
                  >
                    <div className="truncate font-medium text-zinc-100 transition-colors group-hover:text-neon">
                      {track.title}
                    </div>
                    <div className="truncate font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      {track.genre} / {track.bpm} BPM
                    </div>
                  </Link>
                  <div className="hidden font-mono text-xs tabular-nums text-zinc-500 md:block">
                    {track.releasedAt}
                  </div>
                  <div className="hidden font-mono text-xs tabular-nums text-zinc-400 sm:block">
                    {track.duration}
                  </div>
                  <button
                    onClick={() => play(track)}
                    aria-label={`${t.tracks.play} ${track.title}`}
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 text-zinc-300 transition-all hover:bg-neon hover:text-deep hover:shadow-neon"
                  >
                    <Play className="ml-0.5 size-4 fill-current" />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(artist.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="border-t border-white/5 bg-surface/30 py-24 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neon">// GET IN TOUCH</p>
          <h2 className="mb-10 font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
            {t.contact.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 rounded-full bg-white/5 p-1 pl-4 pr-1 ring-1 ring-white/10 sm:flex-row">
            <span className="py-2 text-sm text-zinc-300 font-mono">{artist.email}</span>
            <div className="flex gap-1">
              <a
                href={`mailto:${artist.email}`}
                className="rounded-full bg-neon px-4 py-2 text-xs font-bold uppercase tracking-widest text-deep transition-transform hover:scale-105"
              >
                <Mail className="mr-1 inline size-3" />
                {t.contact.writeMail}
              </a>
              <button
                onClick={onCopy}
                className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-200 transition-colors hover:bg-white/20"
              >
                {copied ? (
                  <>
                    <Check className="mr-1 inline size-3 text-neon" />
                    {t.contact.copied}
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 inline size-3" />
                    {t.contact.copy}
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Transmission received.");
            }}
            className="grid gap-4 text-left"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                required
                type="text"
                placeholder={t.contact.name}
                className="rounded bg-deep px-4 py-3 text-sm uppercase tracking-wider outline-none ring-1 ring-white/10 transition-all focus:ring-neon/60"
              />
              <input
                required
                type="email"
                placeholder={t.contact.email}
                className="rounded bg-deep px-4 py-3 text-sm uppercase tracking-wider outline-none ring-1 ring-white/10 transition-all focus:ring-neon/60"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder={t.contact.message}
              className="resize-none rounded bg-deep px-4 py-3 text-sm uppercase tracking-wider outline-none ring-1 ring-white/10 transition-all focus:ring-neon/60"
            />
            <button
              type="submit"
              className="group relative overflow-hidden rounded-sm bg-neon py-4 font-display text-sm font-extrabold uppercase tracking-widest text-deep transition-all hover:brightness-110 active:scale-[0.99]"
            >
              <span className="relative z-10">{t.contact.send}</span>
              <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
