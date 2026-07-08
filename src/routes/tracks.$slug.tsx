import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink, Pause, Play, Share2 } from "lucide-react";
import { getTrack, tracks } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";
import { usePlayer } from "@/lib/player-context";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/tracks/$slug")({
  loader: ({ params }) => {
    const track = getTrack(params.slug);
    if (!track) throw notFound();
    return { track };
  },
  head: ({ params, loaderData }) => {
    const title = loaderData?.track ? `${loaderData.track.title} — AZZFIT` : "Track — AZZFIT";
    const desc = loaderData?.track?.description ?? "Hardtekk track by AZZFIT.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "music.song" },
        { property: "og:url", content: `/tracks/${params.slug}` },
        ...(loaderData?.track ? [{ property: "og:image", content: loaderData.track.cover }] : []),
      ],
      links: [{ rel: "canonical", href: `/tracks/${params.slug}` }],
      scripts: loaderData?.track
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MusicRecording",
                name: loaderData.track.title,
                byArtist: { "@type": "MusicGroup", name: "AZZFIT" },
                duration: `PT${loaderData.track.duration.replace(":", "M")}S`,
                datePublished: loaderData.track.releasedAt,
                genre: loaderData.track.genre,
              }),
            },
          ]
        : [],
    };
  },
  component: TrackPage,
});

function TrackPage() {
  const { track } = Route.useLoaderData();
  const { t } = useI18n();
  const { play, pause, current, isPlaying, progress } = usePlayer();
  const active = current.slug === track.slug && isPlaying;
  const related = tracks.filter((x) => x.slug !== track.slug).slice(0, 3);

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${track.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(80px) saturate(140%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/80 to-deep" />

        <div className="relative mx-auto grid max-w-6xl items-end gap-8 md:grid-cols-[320px_1fr]">
          <Reveal>
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={track.cover}
              alt={track.title}
              width={640}
              height={640}
              className="aspect-square w-full max-w-[320px] rounded-lg object-cover shadow-neon-lg ring-1 ring-white/10"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neon">
              // SINGLE / {track.releasedAt}
            </p>
            <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl">
              {track.title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-zinc-400">
              AZZFIT · {track.genre} · {track.bpm} BPM · {track.duration}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => (active ? pause() : play(track))}
                className="flex items-center gap-3 rounded-full bg-neon px-6 py-3 font-bold uppercase tracking-widest text-deep shadow-neon transition-transform hover:scale-105"
              >
                {active ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4 fill-current" />}
                {active ? "PAUSE" : "PLAY"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                }}
                className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-widest ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <Share2 className="size-3.5" />
                {t.trackDetail.share}
              </button>
            </div>

            {active && (
              <div className="mt-6 h-1 w-full max-w-md overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-neon shadow-neon"
                />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Details grid */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-widest text-neon">
                {t.trackDetail.about}
              </h2>
              <p className="text-lg text-zinc-300">{track.description}</p>
            </Reveal>

            {track.story && (
              <Reveal delay={0.05}>
                <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-widest text-neon">
                  {t.trackDetail.story}
                </h2>
                <p className="text-zinc-400">{track.story}</p>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-widest text-neon">
                {t.trackDetail.streams}
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {track.streams.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded bg-surface/60 px-4 py-3 text-sm ring-1 ring-white/5 transition-all hover:bg-neon/10 hover:ring-neon/40"
                  >
                    <span className="font-medium">{s.platform}</span>
                    <ExternalLink className="size-3.5 text-zinc-500 transition-colors group-hover:text-neon" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="space-y-8">
            <Reveal>
              <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-neon">
                {t.trackDetail.stats}
              </h3>
              <div className="space-y-3 rounded-lg bg-surface/60 p-5 ring-1 ring-white/5">
                {[
                  [t.trackDetail.plays, track.stats.plays],
                  [t.trackDetail.likes, track.stats.likes],
                  [t.trackDetail.shares, track.stats.shares],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      {k}
                    </span>
                    <span className="font-display text-xl font-bold text-zinc-100">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-neon">
                {t.trackDetail.related}
              </h3>
              <div className="space-y-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/tracks/$slug"
                    params={{ slug: r.slug }}
                    className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-white/5"
                  >
                    <img
                      src={r.cover}
                      alt={r.title}
                      loading="lazy"
                      className="size-10 rounded object-cover ring-1 ring-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{r.title}</div>
                      <div className="truncate font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        {r.genre}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
