import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts, useRouteContext } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShopProvider } from "@/contexts/ShopContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center gradient-soft px-4">
      <div className="glass-strong rounded-3xl p-10 max-w-md text-center shadow-elevated">
        <h1 className="text-display text-7xl font-semibold text-foreground">404</h1>
        <h2 className="mt-2 text-display text-2xl text-foreground">Page introuvable</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Cette page semble s'être évaporée comme un parfum délicat.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full gradient-button px-6 py-2.5 text-sm font-medium text-white shadow-soft hover:shadow-glow-rose transition-all"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "4YouPara — Parapharmacie & Cosmétiques en ligne au Maroc" },
      { name: "description", content: "Parapharmacie en ligne 4YouPara : soins visage, corps, cheveux, bébé et compléments. Marques authentiques, conseils experts, livraison partout au Maroc." },
      { name: "author", content: "4YouPara" },
      { property: "og:title", content: "4YouPara — Parapharmacie & Cosmétiques au Maroc" },
      { property: "og:description", content: "Soins authentiques et conseils experts. Livraison partout au Maroc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
  const { queryClient } = useRouteContext({ from: '__root__' });
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ShopProvider>
          <Outlet />
          <Toaster position="top-right" />
        </ShopProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
