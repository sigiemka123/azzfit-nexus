import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { tracks, type Track } from "./cms";

type PlayerState = {
  current: Track;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  ready: boolean;
  play: (t?: Track) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setProgress: (p: number) => void;
  setVolume: (v: number) => void;
};

type SpotifyController = {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  seek: (s: number) => void;
  destroy: () => void;
  addListener: (event: string, cb: (e: { data: { isPaused: boolean; isBuffering: boolean; duration: number; position: number } }) => void) => void;
};
type SpotifyIFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    cb: (c: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
    __spotifyIframeApi?: SpotifyIFrameAPI;
  }
}

const PlayerCtx = createContext<PlayerState | null>(null);

const SCRIPT_SRC = "https://open.spotify.com/embed/iframe-api/v1";

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [volume, setVolumeState] = useState(75);
  const [ready, setReady] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const pendingUriRef = useRef<string | null>(null);
  const wantPlayRef = useRef(false);

  // Load Spotify iframe API script + initialize controller once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = (api: SpotifyIFrameAPI) => {
      window.__spotifyIframeApi = api;
      if (!hostRef.current || controllerRef.current) return;
      api.createController(
        hostRef.current,
        { uri: current.spotifyUri, width: "100%", height: "80" },
        (controller) => {
          controllerRef.current = controller;
          controller.setVolume(volume / 100);
          controller.addListener("playback_update", (e) => {
            const d = e?.data;
            if (!d) return;
            setIsPlaying(!d.isPaused);
            if (d.duration > 0) setProgressState((d.position / d.duration) * 100);
          });
          setReady(true);
          if (pendingUriRef.current) {
            controller.loadUri(pendingUriRef.current);
            pendingUriRef.current = null;
          }
          if (wantPlayRef.current) {
            controller.play();
            wantPlayRef.current = false;
          }
        },
      );
    };

    if (window.__spotifyIframeApi) {
      init(window.__spotifyIframeApi);
      return;
    }

    window.onSpotifyIframeApiReady = init;

    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = useCallback(
    (t?: Track) => {
      const target = t ?? current;
      const isNew = t && t.slug !== current.slug;
      if (isNew) {
        setCurrent(target);
        setProgressState(0);
      }
      if (controllerRef.current) {
        if (isNew) controllerRef.current.loadUri(target.spotifyUri);
        controllerRef.current.play();
      } else {
        pendingUriRef.current = target.spotifyUri;
        wantPlayRef.current = true;
      }
      setIsPlaying(true);
    },
    [current],
  );

  const pause = useCallback(() => {
    controllerRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const step = useCallback(
    (dir: 1 | -1) => {
      const i = tracks.findIndex((x) => x.slug === current.slug);
      const nextIdx = (i + dir + tracks.length) % tracks.length;
      play(tracks[nextIdx]);
    },
    [current, play],
  );

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(100, v));
    setVolumeState(clamped);
    controllerRef.current?.setVolume(clamped / 100);
  }, []);

  const setProgress = useCallback((p: number) => {
    setProgressState(p);
  }, []);

  return (
    <PlayerCtx.Provider
      value={{
        current,
        isPlaying,
        progress,
        volume,
        ready,
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
      {/* Hidden Spotify iframe host — actual playback source */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: -9999,
          bottom: 0,
          width: 300,
          height: 80,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div ref={hostRef} />
      </div>
    </PlayerCtx.Provider>
  );
}

export const usePlayer = () => {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be inside PlayerProvider");
  return ctx;
};
