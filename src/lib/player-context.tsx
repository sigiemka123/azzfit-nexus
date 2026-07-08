import { createContext, useContext, useState, type ReactNode } from "react";
import { tracks, type Track } from "./cms";

type PlayerState = {
  current: Track;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  play: (t?: Track) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setProgress: (p: number) => void;
  setVolume: (v: number) => void;
};

const PlayerCtx = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(32);
  const [volume, setVolume] = useState(75);

  const play = (t?: Track) => {
    if (t && t.slug !== current.slug) {
      setCurrent(t);
      setProgress(0);
    }
    setIsPlaying(true);
  };
  const pause = () => setIsPlaying(false);
  const toggle = () => setIsPlaying((p) => !p);
  const step = (dir: 1 | -1) => {
    const i = tracks.findIndex((x) => x.slug === current.slug);
    const nextIdx = (i + dir + tracks.length) % tracks.length;
    setCurrent(tracks[nextIdx]);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <PlayerCtx.Provider
      value={{
        current,
        isPlaying,
        progress,
        volume,
        play,
        pause,
        toggle,
        next: () => step(1),
        prev: () => step(-1),
        setProgress,
        setVolume,
      }}
    >
      {children}
    </PlayerCtx.Provider>
  );
}

export const usePlayer = () => {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be inside PlayerProvider");
  return ctx;
};
