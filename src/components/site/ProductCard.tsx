import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Heart, Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/contexts/ShopContext";
import { QuickViewDialog } from "./QuickViewDialog";
import type { Product } from "@/data/products";

const badgeStyles: Record<string, string> = {
  "Nouveau": "bg-sage-soft text-primary",
  "Best-seller": "gradient-button text-white",
  "Promo": "bg-secondary text-secondary-foreground",
  "Bio": "bg-primary text-primary-foreground",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleFavorite, isFavorite, addToCart } = useShop();
  const [quickOpen, setQuickOpen] = useState(false);
  const fav = isFavorite(product.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      >
        <Link
          to="/produit/$id"
          params={{ id: product.id }}
          className="group block glass rounded-3xl overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
        >
          <div
            className="relative aspect-square overflow-hidden"
            style={{ background: product.gradient }}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {product.badge && (
              <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-medium ${badgeStyles[product.badge]}`}>
                {product.badge}
              </span>
            )}

            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
              className="absolute top-3 right-3 h-9 w-9 glass-strong rounded-full inline-flex items-center justify-center hover:shadow-glow-rose transition-all"
              aria-label="Ajouter aux favoris"
            >
              <Heart className={`h-4 w-4 transition-colors ${fav ? "fill-secondary text-secondary" : "text-secondary"}`} />
            </button>

            {/* Hover actions */}
            <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={(e) => { e.preventDefault(); setQuickOpen(true); }}
                className="flex-1 glass-strong rounded-full px-3 py-2 text-xs font-medium text-foreground inline-flex items-center justify-center gap-1.5 hover:bg-rose-soft/60"
              >
                <Eye className="h-3.5 w-3.5" /> Aperçu
              </button>
              <button
                onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
                className="flex-1 gradient-button text-white rounded-full px-3 py-2 text-xs font-medium inline-flex items-center justify-center gap-1.5 active:scale-95"
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Ajouter
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
          </div>

          <div className="p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {typeof product.brand === 'string' ? product.brand : (product as any).brands?.name || (product as any).brand}
            </p>
            <h3 className="mt-1 text-display text-lg leading-tight text-foreground line-clamp-2 min-h-[3.4rem]">
              {product.name}
            </h3>

            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
              <span className="font-medium text-foreground">{product.rating}</span>
              <span>· {product.reviews} avis</span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-display text-xl font-semibold text-foreground">{product.price} <span className="text-sm">DH</span></span>
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">{product.oldPrice} DH</span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      <QuickViewDialog product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </>
  );
}
