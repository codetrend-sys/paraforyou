import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { useBrands, useProducts } from "@/hooks/useData";

export const Route = createFileRoute("/marques")({
  head: () => ({
    meta: [
      { title: "Marques — 4YouPara" },
      { name: "description", content: "Découvrez les marques expertes sélectionnées par 4YouPara : La Roche-Posay, Avène, Nuxe, Caudalie et plus." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const [query, setQuery] = useState("");
  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const { data: products = [], isLoading: productsLoading } = useProducts();

  const productCountByBrand = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      const brandName = typeof p.brand === 'string' ? p.brand : p.brand?.name;
      if (brandName) map.set(brandName, (map.get(brandName) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter(
      (b: any) =>
        b.name.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q),
    );
  }, [query, brands]);

  if (brandsLoading || productsLoading) {
    return (
      <SiteShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-rose-soft border-t-rose animate-spin" />
            <p className="text-muted-foreground animate-pulse">Découverte de nos marques expertes...</p>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="blob blob-rose w-[400px] h-[400px] -top-10 -right-10 animate-blob" />
        <div className="blob blob-sage w-[360px] h-[360px] top-40 -left-10 animate-blob-2" />

        <div className="text-center max-w-2xl mx-auto relative">
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Sélection experte</span>
          <h1 className="mt-3 text-display text-5xl md:text-6xl font-semibold">Nos marques de confiance</h1>
          <p className="mt-4 text-muted-foreground">
            Chaque marque est choisie par nos pharmaciens pour son expertise, son authenticité et son engagement qualité.
          </p>

          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une marque, une origine…"
              className="w-full glass rounded-full pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          <div className="mt-6 flex justify-center gap-6 text-xs text-muted-foreground">
            <span><strong className="text-foreground text-display text-lg">{brands.length}</strong> marques</span>
            <span className="text-foreground/30">·</span>
            <span><strong className="text-foreground text-display text-lg">{products.length}+</strong> produits</span>
            <span className="text-foreground/30">·</span>
            <span><strong className="text-foreground text-display text-lg">100%</strong> authentiques</span>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {filtered.map((b: any, i: number) => {
            const count = productCountByBrand.get(b.name) ?? 0;
            return (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.5 }}
              >
                <Link
                  to="/categories"
                  className="group block relative overflow-hidden rounded-3xl glass shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-500 h-full"
                >
                  {/* Color wash */}
                  <div
                    className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity"
                    style={{ background: b.gradient }}
                  />

                  {/* Brand Background Image */}
                  {b.bgImage && (
                    <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                      <img 
                        src={b.bgImage} 
                        alt="" 
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                      />
                    </div>
                  )}
                  {/* Decorative motif */}
                  <svg
                    className="absolute -right-8 -bottom-8 w-44 h-44 opacity-20 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-700"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <circle cx="50" cy="50" r="30" stroke={b.accent} strokeWidth="0.6" />
                    <circle cx="50" cy="50" r="22" stroke={b.accent} strokeWidth="0.4" />
                    <path d="M50 20 C58 35, 58 65, 50 80 C42 65, 42 35, 50 20Z" fill={b.accent} fillOpacity="0.4" />
                    <path d="M20 50 C35 42, 65 42, 80 50 C65 58, 35 58, 20 50Z" fill={b.accent} fillOpacity="0.3" />
                    <path d="M30 30 C45 38, 55 38, 70 30 C62 45, 62 55, 70 70 C55 62, 45 62, 30 70 C38 55, 38 45, 30 30Z" stroke={b.accent} strokeWidth="0.5" />
                  </svg>

                  <div className="relative p-6 flex flex-col h-full min-h-[220px]">
                    <div className="flex items-start justify-between">
                      <div
                        className="h-14 w-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center overflow-hidden shadow-sm"
                      >
                        <img src={b.image} alt={b.name} className="h-full w-full object-contain p-2" />
                      </div>
                      <span className="glass-strong rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-foreground/70 inline-flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> {count} produit{count > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="mt-auto pt-6">
                      <h3 className="text-display text-2xl text-foreground">{b.name}</h3>
                      <p className="mt-1 text-xs text-foreground/70 inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {b.origin}
                      </p>
                      <p className="mt-3 text-sm text-foreground/80">{b.tagline}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3">
                        <span className="text-[11px] uppercase tracking-wider text-foreground/60">
                          Signature · {b.signature}
                        </span>
                        <ArrowRight className="h-4 w-4 text-foreground/70 group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            Aucune marque ne correspond à « {query} ».
          </div>
        )}
      </div>
    </SiteShell>
  );
}
