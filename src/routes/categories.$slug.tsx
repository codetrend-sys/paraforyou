import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/products";

const searchSchema = z.object({
  sort: fallback(z.enum(["pop", "asc", "desc", "rating"]), "pop").default("pop"),
  brand: fallback(z.string(), "").default(""),
  badge: fallback(z.string(), "").default(""),
  max: fallback(z.number(), 0).default(0),
});

export const Route = createFileRoute("/categories/$slug")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Catégorie"} — 4YouPara` },
      { name: "description", content: loaderData?.cat.description ?? "" },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-display text-4xl">Catégorie introuvable</h1>
        <Link to="/categories" className="mt-6 inline-block text-secondary">Retour aux catégories</Link>
      </div>
    </SiteShell>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const { sort, brand, badge, max } = Route.useSearch();
  const navigate = useNavigate({ from: "/categories/$slug" });

  const baseList = useMemo(() => products.filter((p) => p.category === cat.slug), [cat.slug]);

  const brandsInCategory = useMemo(
    () => Array.from(new Set(baseList.map((p) => p.brand))).sort(),
    [baseList]
  );
  const badgesInCategory = useMemo(
    () => Array.from(new Set(baseList.map((p) => p.badge).filter(Boolean) as string[])),
    [baseList]
  );
  const priceMax = useMemo(
    () => Math.max(0, ...baseList.map((p) => p.price)),
    [baseList]
  );
  const effectiveMax = max > 0 ? max : priceMax;

  const filtered = baseList.filter((p) => {
    if (brand && p.brand !== brand) return false;
    if (badge && p.badge !== badge) return false;
    if (max > 0 && p.price > max) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const setParam = (patch: Partial<{ sort: string; brand: string; badge: string; max: number }>) => {
    navigate({
      params: { slug: cat.slug },
      search: ((prev: Record<string, unknown>) => ({ ...prev, ...patch })) as never,
    });
  };

  const resetFilters = () => {
    navigate({
      params: { slug: cat.slug },
      search: (() => ({ sort: "pop", brand: "", badge: "", max: 0 })) as never,
    });
  };

  const activeCount = (brand ? 1 : 0) + (badge ? 1 : 0) + (max > 0 ? 1 : 0);

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12">
        <nav className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Accueil</Link> ·{" "}
          <Link to="/categories" className="hover:text-foreground">Catégories</Link> ·{" "}
          <span className="text-foreground">{cat.name}</span>
        </nav>

        <div className="mt-6 rounded-3xl shadow-soft relative overflow-hidden min-h-[280px] md:min-h-[340px] flex items-end">
          {/* Background image */}
          <img
            src={cat.image}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="blob blob-rose w-80 h-80 -top-20 -right-20 animate-blob opacity-60" />

          <div className="relative p-8 md:p-12 w-full">
            <div className="text-display text-6xl text-foreground/40">{cat.emoji}</div>
            <h1 className="mt-3 text-display text-4xl md:text-5xl font-semibold text-foreground drop-shadow-sm">{cat.name}</h1>
            <p className="mt-3 text-foreground/80 max-w-2xl">{cat.description}</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters sidebar */}
          <aside className="glass rounded-3xl p-5 h-fit lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-secondary" />
                <h2 className="text-display text-base font-semibold">Filtres</h2>
                {activeCount > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {activeCount}
                  </span>
                )}
              </div>
              {activeCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Réinitialiser
                </button>
              )}
            </div>

            {brandsInCategory.length > 0 && (
              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Marque</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setParam({ brand: "" })}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${!brand ? "bg-secondary text-secondary-foreground" : "glass text-foreground/70 hover:text-foreground"}`}
                  >
                    Toutes
                  </button>
                  {brandsInCategory.map((b) => (
                    <button
                      key={b}
                      onClick={() => setParam({ brand: brand === b ? "" : b })}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${brand === b ? "bg-secondary text-secondary-foreground" : "glass text-foreground/70 hover:text-foreground"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {badgesInCategory.length > 0 && (
              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Étiquette</p>
                <div className="flex flex-wrap gap-1.5">
                  {badgesInCategory.map((b) => (
                    <button
                      key={b}
                      onClick={() => setParam({ badge: badge === b ? "" : b })}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${badge === b ? "bg-secondary text-secondary-foreground" : "glass text-foreground/70 hover:text-foreground"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                <span>Prix max</span>
                <span className="text-foreground font-medium normal-case tracking-normal">{effectiveMax} DH</span>
              </div>
              <input
                type="range"
                min={0}
                max={priceMax}
                step={10}
                value={effectiveMax}
                onChange={(e) => setParam({ max: Number(e.target.value) === priceMax ? 0 : Number(e.target.value) })}
                className="w-full accent-[hsl(var(--secondary))]"
              />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {sorted.length} produit{sorted.length > 1 ? "s" : ""}
                {activeCount > 0 && ` · ${activeCount} filtre${activeCount > 1 ? "s" : ""} actif${activeCount > 1 ? "s" : ""}`}
              </p>
              <select
                value={sort}
                onChange={(e) => setParam({ sort: e.target.value })}
                className="glass rounded-full px-4 py-2 text-sm text-foreground border-none focus:ring-2 focus:ring-secondary outline-none"
              >
                <option value="pop">Tri : Popularité</option>
                <option value="rating">Mieux notés</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>

            {sorted.length === 0 ? (
              <div className="mt-8 glass rounded-3xl p-12 text-center">
                <p className="text-muted-foreground">Aucun produit ne correspond à vos critères.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center gap-2 glass-strong rounded-full px-5 py-2 text-sm text-foreground hover:bg-rose-soft/50"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-5">
                {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
