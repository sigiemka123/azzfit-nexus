import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "@/lib/player-context";
import { useI18n } from "@/lib/i18n";

export function PlayerBar() {
  const { current, isPlaying, toggle, next, prev, progress, volume } = usePlayer();
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2"
    >
      <div className="glass-strong flex items-center gap-3 rounded-xl px-3 py-2 shadow-neon">
        <Link
          to="/tracks/$slug"
          params={{ slug: current.slug }}
          className="size-10 shrink-0 overflow-hidden rounded ring-1 ring-white/10 transition-transform hover:scale-105"
        >
          <img src={current.cover} alt={current.title} className="size-full object-cover" />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-bold text-zinc-100">{current.title}</div>
          <div className="truncate font-mono text-[10px] uppercase tracking-wider text-neon">
            {isPlaying ? t.player.now : "AZZFIT"}
          </div>
          <div className="mt-1 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-neon shadow-neon" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button onClick={prev} className="text-zinc-400 transition-colors hover:text-zinc-100">
            <SkipBack className="size-4" />
          </button>
          <button
            onClick={toggle}
            className="grid size-9 place-items-center rounded-full bg-neon text-deep shadow-neon transition-transform hover:scale-110"
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
          </button>
          <button onClick={next} className="text-zinc-400 transition-colors hover:text-zinc-100">
            <SkipForward className="size-4" />
          </button>
        </div>

        <div className="hidden shrink-0 items-center gap-2 border-l border-white/10 pl-3 sm:flex">
          <Volume2 className="size-3.5 text-zinc-500" />
          <div className="h-1 w-14 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-neon" style={{ width: `${volume}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
