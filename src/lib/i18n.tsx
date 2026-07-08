import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pl" | "en" | "de";

const dict = {
  pl: {
    nav: { about: "O mnie", tracks: "Utwory", contact: "Kontakt", login: "Zaloguj" },
    hero: {
      subtitle: "Producent Hardtekk • Industrial Rave",
      cta: "SŁUCHAJ TERAZ",
      badge: "NAJNOWSZY DROP",
    },
    about: {
      heading: "Pionier",
      accent: "Rewolucji Schranz",
      follow: "OBSERWUJ",
    },
    tracks: {
      heading: "Najnowsze Utwory",
      count: (n: number) => `${n} UTWORÓW`,
      viewAll: "Zobacz wszystkie",
      play: "Odtwórz",
    },
    contact: {
      heading: "BOOKING",
      copy: "Kopiuj Email",
      copied: "Skopiowano!",
      name: "IMIĘ",
      email: "EMAIL",
      message: "WIADOMOŚĆ",
      send: "WYŚLIJ TRANSMISJĘ",
      writeMail: "NAPISZ MAILA",
    },
    footer: { rights: "WSZYSTKIE PRAWA ZASTRZEŻONE.", top: "Do góry" },
    player: { now: "Teraz gra" },
    loading: "WCHODZĘ W HARDTEKK EXPERIENCE",
    trackDetail: {
      streams: "STRUMIENIOWANIE",
      about: "O UTWORZE",
      story: "HISTORIA",
      stats: "STATYSTYKI",
      plays: "Odtworzenia",
      likes: "Polubienia",
      shares: "Udostępnienia",
      share: "UDOSTĘPNIJ",
      related: "POLECANE",
    },
    login: {
      title: "LOGOWANIE",
      subtitle: "Wejdź w swoje konto AZZFIT",
      email: "Email",
      password: "Hasło",
      signIn: "ZALOGUJ",
      signUp: "Zarejestruj się",
      forgot: "Zapomniałeś hasła?",
      or: "lub",
    },
  },
  en: {
    nav: { about: "About", tracks: "Tracks", contact: "Contact", login: "Login" },
    hero: {
      subtitle: "Hardtekk Producer • Industrial Rave",
      cta: "LISTEN NOW",
      badge: "LATEST DROP",
    },
    about: {
      heading: "Pioneering",
      accent: "the Schranz Revival",
      follow: "FOLLOW",
    },
    tracks: {
      heading: "Latest Circuits",
      count: (n: number) => `${n} TRACKS`,
      viewAll: "View all",
      play: "Play",
    },
    contact: {
      heading: "BOOKING",
      copy: "Copy Email",
      copied: "Copied!",
      name: "NAME",
      email: "EMAIL",
      message: "MESSAGE",
      send: "SUBMIT TRANSMISSION",
      writeMail: "WRITE EMAIL",
    },
    footer: { rights: "ALL RIGHTS RESERVED.", top: "Back to top" },
    player: { now: "Now Playing" },
    loading: "ENTERING THE HARDTEKK EXPERIENCE",
    trackDetail: {
      streams: "STREAMING",
      about: "ABOUT TRACK",
      story: "STORY",
      stats: "STATS",
      plays: "Plays",
      likes: "Likes",
      shares: "Shares",
      share: "SHARE",
      related: "RELATED",
    },
    login: {
      title: "LOGIN",
      subtitle: "Enter your AZZFIT account",
      email: "Email",
      password: "Password",
      signIn: "SIGN IN",
      signUp: "Create account",
      forgot: "Forgot password?",
      or: "or",
    },
  },
  de: {
    nav: { about: "Über", tracks: "Tracks", contact: "Kontakt", login: "Anmelden" },
    hero: {
      subtitle: "Hardtekk Producer • Industrial Rave",
      cta: "JETZT HÖREN",
      badge: "NEUESTER DROP",
    },
    about: {
      heading: "Pionier",
      accent: "der Schranz-Renaissance",
      follow: "FOLGEN",
    },
    tracks: {
      heading: "Neueste Tracks",
      count: (n: number) => `${n} TRACKS`,
      viewAll: "Alle ansehen",
      play: "Play",
    },
    contact: {
      heading: "BOOKING",
      copy: "Email kopieren",
      copied: "Kopiert!",
      name: "NAME",
      email: "EMAIL",
      message: "NACHRICHT",
      send: "ÜBERTRAGUNG SENDEN",
      writeMail: "EMAIL SCHREIBEN",
    },
    footer: { rights: "ALLE RECHTE VORBEHALTEN.", top: "Nach oben" },
    player: { now: "Läuft gerade" },
    loading: "EINTRITT IN DAS HARDTEKK ERLEBNIS",
    trackDetail: {
      streams: "STREAMING",
      about: "ÜBER DEN TRACK",
      story: "GESCHICHTE",
      stats: "STATISTIKEN",
      plays: "Wiedergaben",
      likes: "Likes",
      shares: "Shares",
      share: "TEILEN",
      related: "EMPFOHLEN",
    },
    login: {
      title: "ANMELDUNG",
      subtitle: "Melde dich in deinem AZZFIT-Konto an",
      email: "Email",
      password: "Passwort",
      signIn: "ANMELDEN",
      signUp: "Konto erstellen",
      forgot: "Passwort vergessen?",
      or: "oder",
    },
  },
};

type Dict = typeof dict.en;
const dicts: Record<Lang, Dict> = dict as Record<Lang, Dict>;

const I18nCtx = createContext<{
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}>({ lang: "en", t: dicts.en, setLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("azzfit.lang") as Lang | null) : null;
    if (stored && (stored === "pl" || stored === "en" || stored === "de")) {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("azzfit.lang", l);
  };

  return <I18nCtx.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
export const LANGS: Lang[] = ["pl", "en", "de"];
