import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  image: string;
  products: Product[];
  accent?: "rose" | "sage";
};

export function CollectionShowcase({
  eyebrow,
  title,
  description,
  ctaLabel = "Découvrir la collection",
  ctaTo = "/categories",
  image,
  products,
  accent = "rose",
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-8 relative">
      <div
        className={`blob ${accent === "rose" ? "blob-rose" : "blob-sage"} w-[420px] h-[420px] -top-10 ${
          accent === "rose" ? "-left-20" : "-right-20"
        } animate-blob`}
      />
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT — visual card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <div className="relative h-full min-h-[440px] rounded-[2.5rem] overflow-hidden glass-strong shadow-elevated group">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />

              <div className="relative h-full p-7 flex flex-col justify-between">
                <span className="self-start inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground">
                  <Sparkles className="h-3 w-3 text-secondary" />
                  {eyebrow}
                </span>

                <div className="text-white">
                  <h2 className="text-display text-4xl md:text-5xl font-semibold leading-[1.05]">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm text-white/85 max-w-xs leading-relaxed">
                    {description}
                  </p>
                  <Link
                    to={ctaTo}
                    className="mt-5 inline-flex items-center gap-2 gradient-button text-white rounded-full px-5 py-2.5 text-xs font-medium shadow-soft hover:shadow-glow-rose transition-all"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — scrollable product rail */}
          <div className="lg:col-span-8 relative">
            <div className="flex items-center justify-end gap-2 mb-3">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Précédent"
                className="h-10 w-10 rounded-full glass-strong inline-flex items-center justify-center hover:bg-rose-soft/50 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Suivant"
                className="h-10 w-10 rounded-full glass-strong inline-flex items-center justify-center hover:bg-rose-soft/50 transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>

            <div
              ref={scrollerRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className="snap-start shrink-0 w-[68%] sm:w-[42%] md:w-[34%] lg:w-[44%] xl:w-[33%]"
                >
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
