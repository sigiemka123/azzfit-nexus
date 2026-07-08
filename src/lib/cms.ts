// Content source of truth. Edit this file (or later swap for a CMS fetch)
// to change tracks, artist bio, socials, contact info without touching UI code.

import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";
import artistPortrait from "@/assets/artist-portrait.jpg";
import heroArtwork from "@/assets/artwork-hero.jpg";

export const artist = {
  name: "AZZFIT",
  tagline: "Hardtekk Producer • Berlin Industrial",
  email: "booking@azzfit.audio",
  portrait: artistPortrait,
  heroArtwork,
  bio: {
    pl: "Łącząc industrialną surowość z wysokoenergetyczną perkusją hardtekk, AZZFIT tworzy dźwiękowe krajobrazy zaprojektowane na 3AM w magazynowym rytuale. Precyzyjnie zaprojektowane kicki spotykają agresywną modulację syntezatorów.",
    en: "Merging industrial grit with high-voltage hardtekk percussion, AZZFIT creates sonic landscapes designed for the 3AM warehouse ritual. Precision-engineered kicks meet aggressive synth modulation.",
    de: "AZZFIT verbindet industrielle Härte mit hochenergetischer Hardtekk-Perkussion und erschafft Klanglandschaften für das 3-Uhr-Warehouse-Ritual. Präzisionsgefertigte Kicks treffen auf aggressive Synth-Modulation.",
  },
} as const;

export const socials = [
  { id: "spotify", label: "Spotify", href: "https://open.spotify.com" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  { id: "tiktok", label: "TikTok", href: "https://tiktok.com" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com" },
  { id: "soundcloud", label: "SoundCloud", href: "https://soundcloud.com" },
  { id: "discord", label: "Discord", href: "https://discord.com" },
] as const;

export type Track = {
  slug: string;
  title: string;
  genre: string;
  bpm: number;
  duration: string;
  releasedAt: string; // ISO date
  cover: string;
  description: string;
  lyrics?: string;
  story?: string;
  streams: { platform: string; url: string }[];
  stats: { plays: string; likes: string; shares: string };
};

export const tracks: Track[] = [
  {
    slug: "cortex-overload",
    title: "Cortex Overload",
    genre: "Hardtekk",
    bpm: 165,
    duration: "04:32",
    releasedAt: "2024-03-15",
    cover: cover1,
    description:
      "A relentless assault on the auditory cortex — layered kicks, distorted leads, industrial percussion.",
    story:
      "Written during a 72-hour session in a decommissioned Berlin power plant. The main kick was captured from a modular Eurorack chain and pushed through a broken tape machine.",
    lyrics: "// instrumental",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com" },
      { platform: "Apple Music", url: "https://music.apple.com" },
      { platform: "YouTube", url: "https://youtube.com" },
      { platform: "Tidal", url: "https://tidal.com" },
      { platform: "Deezer", url: "https://deezer.com" },
      { platform: "Amazon Music", url: "https://music.amazon.com" },
      { platform: "SoundCloud", url: "https://soundcloud.com" },
    ],
    stats: { plays: "1.2M", likes: "84K", shares: "12K" },
  },
  {
    slug: "warehouse-ritual",
    title: "Warehouse Ritual",
    genre: "Schranz",
    bpm: 168,
    duration: "05:11",
    releasedAt: "2024-02-28",
    cover: cover2,
    description:
      "Ceremonial percussion for underground gatherings. Deep pounding rhythms with cinematic tension.",
    story: "Recorded live at a warehouse party in Kreuzberg with a stripped down modular setup.",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com" },
      { platform: "Apple Music", url: "https://music.apple.com" },
      { platform: "YouTube", url: "https://youtube.com" },
      { platform: "SoundCloud", url: "https://soundcloud.com" },
    ],
    stats: { plays: "890K", likes: "62K", shares: "8K" },
  },
  {
    slug: "glitch-pulse",
    title: "Glitch Pulse",
    genre: "Hardtekk",
    bpm: 162,
    duration: "03:58",
    releasedAt: "2024-01-12",
    cover: cover3,
    description: "Fragmented rhythms and glitched vocal chops over pounding kicks.",
    story: "Built around a corrupted audio file that refused to play back cleanly — the errors became the hook.",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com" },
      { platform: "YouTube", url: "https://youtube.com" },
      { platform: "Tidal", url: "https://tidal.com" },
    ],
    stats: { plays: "540K", likes: "38K", shares: "5K" },
  },
  {
    slug: "voltage-spike",
    title: "Voltage Spike",
    genre: "Hardtekk",
    bpm: 172,
    duration: "04:48",
    releasedAt: "2023-11-04",
    cover: cover4,
    description: "High voltage kicks meet acid basslines. Peak time weapon.",
    story: "The first single of the Voltage Spike EP.",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com" },
      { platform: "Apple Music", url: "https://music.apple.com" },
      { platform: "SoundCloud", url: "https://soundcloud.com" },
    ],
    stats: { plays: "310K", likes: "24K", shares: "3K" },
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
