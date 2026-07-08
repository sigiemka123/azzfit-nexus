import { useEffect, useRef } from "react";
import { usePlayer } from "@/lib/player-context";

export function BackgroundMusic() {
  const { isPlaying } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ładowanie pliku z folderu public
    const audio = new Audio("/bombe.mp3");
    audio.loop = true;
    audio.volume = 0.2; // Głośność tła (0.0 - 1.0)
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", startAudio);
    };

    document.addEventListener("click", startAudio);

    return () => {
      audio.pause();
      document.removeEventListener("click", startAudio);
    };
  }, []);

  // Automatyczne wyciszanie, gdy Spotify gra
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [isPlaying]);

  return null;
}
