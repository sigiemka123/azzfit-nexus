// Content source of truth. Edit this file (or later swap for a CMS fetch)
// to change tracks, artist bio, socials, contact info without touching UI code.

import artistPortrait from "@/assets/artist-portrait.jpg";
import heroArtwork from "@/assets/artwork-hero.jpg";

export const artist = {
  name: "AZZFIT",
  tagline: "Poland's first hardtekk rapper.",
  email: "AVEAZZFITMGMT@GMAIL.COM",
  portrait: "https://i.imgur.com/NrCxjmy.png",
  heroArtwork,
  bio: {
    pl: "Azzfit to legenda, głównie hardtekk - Na co dzień mieszka w Polsce, pozostając przy tym niezwykle autentycznym i bezpośrednim człowiekiem – ceni sobie proste przyjemności, ruchanie i piwo.",
    en: "Azzfit is a legend, best known for his hardtekk tracks. Based in Poland, he remains an incredibly authentic and down-to-earth guy who enjoys life’s simple pleasures—getting laid and having a beer.",
    de: "Azzfit ist eine Legende, vor allem bekannt für seine Hardtekk-Tracks. Er lebt in Polen und ist nach wie vor ein unglaublich authentischer und bodenständiger Typ, der die einfachen Freuden des Lebens genießt – vögeln und ein Bierchen trinken.",
  },
  // Reused across artist portrait fallback
  _unusedHero: heroArtwork,
  _unusedPortrait: artistPortrait,
} as const;

export const socials = [
  { id: "spotify", label: "Spotify", href: "https://open.spotify.com/artist/1vJnRexjkzusA8ZBZUkp4o" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/azzfitcsx/" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@azzfitcsx" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/channel/UCzJAnRzRlBHmRpHJBoV81EQ" },
  { id: "soundcloud", label: "SoundCloud", href: "https://soundcloud.com/azzfit1" },
] as const;

export type Track = {
  slug: string;
  title: string;
  genre: string;
  bpm: number;
  duration: string;
  releasedAt: string; // ISO date
  cover: string;
  spotifyUri: string;   // e.g. spotify:track:xxx or spotify:album:xxx
  spotifyUrl: string;   // public open.spotify.com link
  description: string;
  lyrics?: string;
  story?: string;
  streams: { platform: string; url: string }[];
  stats: { plays: string; likes: string; shares: string };
};

export const tracks: Track[] = [
  {
    slug: "wyebau-bombe",
    title: "WYEBAU BOMBE",
    genre: "Hardtekk",
    bpm: 170,
    duration: "02:45",
    releasedAt: "2024-06-14",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028d5fd557fa2a648397d6a99f",
    spotifyUri: "spotify:album:6CLhZF9JUcQUuk0cjA9Rna",
    spotifyUrl: "https://open.spotify.com/album/6CLhZF9JUcQUuk0cjA9Rna",
    description: "Wyebau Bombe - to klasyczny wpierdol dla uszu, coś przyjemnego tzw. dobry letniaczek.",
    story: "podczas walenia konia doszło do wybuchu",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com/album/6CLhZF9JUcQUuk0cjA9Rna" },
    ],
    stats: { plays: "—", likes: "—", shares: "—" },
  },
  {
    slug: "zabka",
    title: "ZABKA",
    genre: "Hardtekk",
    bpm: 168,
    duration: "02:31",
    releasedAt: "2024-05-03",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0267a391433eeb547b8db706d8",
    spotifyUri: "spotify:track:5NhI2NK6vA839EP49G6WxU",
    spotifyUrl: "https://open.spotify.com/track/5NhI2NK6vA839EP49G6WxU",
    description: "Zabka - To polskie zgrupowanie meneli jest coraz niebiezpieczniejsze.",
    story: "mały wielki sklep",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com/track/5NhI2NK6vA839EP49G6WxU" },
    ],
    stats: { plays: "—", likes: "—", shares: "—" },
  },
  {
    slug: "nike",
    title: "NIKE",
    genre: "Hardtekk",
    bpm: 172,
    duration: "02:22",
    releasedAt: "2024-04-18",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e027549c670ae21ddf9c5095c62",
    spotifyUri: "spotify:track:0TYa1Ha9ysZTcG3MHeMCNy",
    spotifyUrl: "https://open.spotify.com/track/0TYa1Ha9ysZTcG3MHeMCNy",
    description: "Nike - Brzmieniowy gigant, który na zwale potrafi przyjebać.",
    story: "air force one linia lotnicza",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com/track/0TYa1Ha9ysZTcG3MHeMCNy" },
    ],
    stats: { plays: "—", likes: "—", shares: "—" },
  },
  {
    slug: "dziwka-3",
    title: "DZIWKA 3",
    genre: "Hardtekk",
    bpm: 170,
    duration: "02:38",
    releasedAt: "2024-03-22",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f2718a4dae6027895e118744",
    spotifyUri: "spotify:track:2TYWDFt4UeUlWL1oT5buiX",
    spotifyUrl: "https://open.spotify.com/track/2TYWDFt4UeUlWL1oT5buiX",
    description: "Dziwka 3 - Klasyczna dziweczka",
    story: "Nagrana po detoksie walenia heroiny z pięt syroklatesa.",
    streams: [
      { platform: "Spotify", url: "https://open.spotify.com/track/2TYWDFt4UeUlWL1oT5buiX" },
    ],
    stats: { plays: "—", likes: "—", shares: "—" },
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
