import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { useCategories, useProducts } from "@/hooks/useData";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Catégories — 4YouPara" },
      { name: "description", content: "Explorez toutes les catégories de soins de la parapharmacie 4YouPara." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts();

  if (categoriesLoading || productsLoading) {
    return (
      <SiteShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-rose-soft border-t-rose animate-spin" />
            <p className="text-muted-foreground animate-pulse">Exploration de nos univers...</p>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="blob blob-sage w-[500px] h-[500px] -top-20 -right-20 animate-blob" />
        <div className="text-center max-w-2xl mx-auto relative">
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Univers de soin</span>
          <h1 className="mt-3 text-display text-5xl md:text-6xl font-semibold">Toutes nos catégories</h1>
          <p className="mt-4 text-muted-foreground">
            Chaque catégorie est pensée comme un rituel. Trouvez le soin qui vous ressemble.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c: any, i: number) => {
            const count = products.filter((p: any) => p.category === c.slug).length;
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="group block glass rounded-3xl overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-display text-3xl text-foreground/60 drop-shadow-sm">{c.emoji}</span>
                    <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-muted-foreground">
                      {count} produits
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-display text-2xl text-foreground">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-secondary font-medium">
                      Voir les produits <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
