import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "@/lib/i18n";
import { PlayerProvider } from "@/lib/player-context";
import { LoadingScreen } from "@/components/loading-screen";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { PlayerBar } from "@/components/player-bar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-extrabold text-neon neon-glow">404</h1>
        <h2 className="mt-4 font-display text-xl font-bold uppercase">Signal lost</h2>
        <p className="mt-2 text-sm text-zinc-400">
          The frequency you're tuning into doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-sm bg-neon px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest text-deep transition-transform hover:scale-105"
          >
            Return to base
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold uppercase text-neon">System failure</h1>
        <p className="mt-2 text-sm text-zinc-400">The transmission was interrupted. Try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-sm bg-neon px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest text-deep transition-transform hover:scale-105"
          >
            Retry
          </button>
          <a
            href="/"
            className="rounded-sm border border-white/10 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:border-neon hover:text-neon"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AZZFIT — Hardtekk Producer" },
      {
        name: "description",
        content:
          "Official site of AZZFIT — Hardtekk producer from Berlin. Latest tracks, streaming links, bookings.",
      },
      { name: "author", content: "AZZFIT" },
      { name: "theme-color", content: "#0d1117" },
      { property: "og:site_name", content: "AZZFIT" },
      { property: "og:title", content: "AZZFIT — Hardtekk Producer" },
      {
        property: "og:description",
        content: "Official site of AZZFIT — Hardtekk producer from Berlin. Latest tracks, streaming links, bookings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AZZFIT — Hardtekk Producer" },
      { name: "twitter:description", content: "Official site of AZZFIT — Hardtekk producer from Berlin. Latest tracks, streaming links, bookings." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "AZZFIT",
          genre: ["Hardtekk", "Schranz", "Industrial Techno"],
          url: "/",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <PlayerProvider>
          <LoadingScreen />
          <SiteNavbar />
          <main className="min-h-screen">
            <Outlet />
          </main>
          <PlayerBar />
          <SiteFooter />
        </PlayerProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
