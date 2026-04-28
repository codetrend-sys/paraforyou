// 4YouPara — homepage (rebuild)
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Truck, ShieldCheck, HeartHandshake, Leaf, Gift, Percent, ChevronLeft, ChevronRight ,Sparkles} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { CollectionShowcase } from "@/components/site/CollectionShowcase";
import { HeroSlider } from "@/components/site/HeroSlider";
import { categories, products, blogPosts, brands } from "@/data/products";
import kbeautyImg from "@/assets/kbeauty-hero.jpg";
import solaireImg from "@/assets/cat-solaire.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "4YouPara — Parapharmacie & Cosmétiques en ligne au Maroc" },
      { name: "description", content: "Découvrez 4YouPara : sélection experte de soins visage, corps, cheveux, bébé et compléments. Livraison partout au Maroc." },
      { property: "og:title", content: "4YouPara — Parapharmacie & Cosmétiques" },
      { property: "og:description", content: "Soins authentiques et conseils experts. Livraison partout au Maroc." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.slice(0, 8);
  const promos = products.filter((p) => p.oldPrice).slice(0, 3);
  const kbeautyProducts = products.filter((p) => p.category === "visage").slice(0, 8);
  const solaireProducts = products.filter((p) => p.category === "solaire").slice(0, 8);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let interval: NodeJS.Timeout;
    
    const startScroll = () => {
      interval = setInterval(() => {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardWidth = el.children[0]?.clientWidth || 300;
          el.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
        }
      }, 3500);
    };

    startScroll();

    const stopScroll = () => clearInterval(interval);
    el.addEventListener("mouseenter", stopScroll);
    el.addEventListener("mouseleave", startScroll);
    el.addEventListener("touchstart", stopScroll);
    el.addEventListener("touchend", startScroll);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", stopScroll);
      el.removeEventListener("mouseleave", startScroll);
      el.removeEventListener("touchstart", stopScroll);
      el.removeEventListener("touchend", startScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
      scrollRef.current.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
      scrollRef.current.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    }
  };

  return (
    <SiteShell>
      {/* HERO CAROUSEL */}
      <section className="container mx-auto px-4">
        <HeroSlider />
      </section>

     

      {/* TICKER PROMOTIONS (VIVANT & ATTIRANT) */}
      <section className="relative z-20 mt-8 mb-12 -rotate-2 scale-[1.05] shadow-glow-rose bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 border-y border-rose-300/30">
        <div className="overflow-hidden w-full py-5">
          {/* Vous pouvez modifier la durée (animationDuration) ci-dessous pour ralentir ou accélérer le texte */}
          <div className="flex gap-12 animate-marquee whitespace-nowrap items-center text-white" style={{ width: "max-content", animationDuration: "45s" }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                <span className="text-display text-2xl font-semibold flex items-center gap-3">
                  <Percent className="h-7 w-7 text-white animate-pulse" /> VENTES FLASH
                </span>
                <span className="text-lg font-light text-white/90 italic">
                  Jusqu'à <strong className="font-bold text-white">-30%</strong> sur la nouvelle collection
                </span>
                <span className="text-display text-2xl font-semibold flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-white animate-pulse" /> NOUVELLES RÉDUCTIONS
                </span>
                <span className="text-lg font-light text-white/90 italic">
                  Code promo : <strong className="font-bold text-white underline tracking-wider">BEAUTY26</strong>
                </span>
                <span className="text-display text-2xl font-semibold flex items-center gap-3">
                  <Gift className="h-7 w-7 text-white animate-bounce" /> CADEAU OFFERT
                </span>
                <span className="text-lg font-light text-white/90 italic">
                  Dans chaque commande dès 500 DH
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* SOLAIRE SHOWCASE */}
      <CollectionShowcase
        eyebrow="Protection Solaire"
        title="L'essentiel pour l'été"
        description="Découvrez notre sélection de crèmes solaires, fluides invisibles et laits après-soleil pour protéger votre peau des rayons UV en toute légèreté."
        ctaLabel="Explorer Solaire"
        ctaTo="/categories/solaire"
        image={solaireImg}
        products={solaireProducts}
        accent="sage"
      />


       {/* CATEGORIES */}
      <section className="py-2">
        <div className="container mx-auto px-4">
          <SectionTitle eyebrow="Univers de soin" title="Explorez nos catégories" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((c, i) => {
              const count = products.filter((p) => p.category === c.slug).length;
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
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
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm text-secondary font-medium">
                        Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ANNONCES PROMOS ATTIRANTES */}
     <section className="relative z-20 mt-16 mb-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-500 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <div className="text-display font-semibold text-foreground text-base">Cadeau offert</div>
                <div className="text-xs text-muted-foreground mt-0.5">Dès 500 DH d'achat</div>
              </div>
            </div>
            
            <div className="gradient-button text-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-glow-rose transition-all hover:-translate-y-1 cursor-pointer group shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 scale-[2.5] -translate-y-1/4 translate-x-1/4">
                <Percent className="h-24 w-24" />
              </div>
              <div className="h-12 w-12 rounded-full bg-white/20 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                <Percent className="h-5 w-5" />
              </div>
              <div className="relative z-10">
                <div className="text-display font-semibold text-white text-base">-20% Solaire</div>
                <div className="text-xs text-white/90 mt-0.5">Code: <span className="font-bold tracking-wider">SUN26</span></div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-sage-100 dark:bg-sage-900/40 text-secondary flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-display font-semibold text-foreground text-base">Livraison gratuite</div>
                <div className="text-xs text-muted-foreground mt-0.5">Partout au Maroc</div>
              </div>
            </div>
          </div>
        </div>
      </section>


       {/* K-BEAUTY SHOWCASE */}
      <CollectionShowcase
        eyebrow="Collection K-Beauty"
        title="Le rituel glass-skin"
        description="Sérums hydratants, essences et soins venus de Corée pour une peau lumineuse, fraîche et repulpée."
        ctaLabel="Explorer K-Beauty"
        ctaTo="/categories"
        image={kbeautyImg}
        products={kbeautyProducts}
        accent="rose"
      />
      

      {/* PROMO BANNER */}
      <section className="">
        <div className="container mx-auto px-4">
          <div className="relative glass-strong  rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-elevated">
            <div className="blob blob-rose w-[400px] h-[400px] -top-20 -right-20 animate-blob" />
            <div className="blob blob-sage w-[400px] h-[400px] -bottom-20 -left-20 animate-blob-2" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-secondary">
                  Offres limitées
                </span>
                <h2 className="mt-4 text-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
                  Jusqu'à <span className="text-secondary">-30%</span> sur les soins essentiels
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Profitez d'une sélection exceptionnelle de marques expertes à prix doux,
                  jusqu'à dimanche minuit.
                </p>
                <Link
                  to="/promotions"
                  className="mt-6 inline-flex items-center gap-2 gradient-button text-white rounded-full px-7 py-3 text-sm font-medium shadow-soft hover:shadow-glow-rose transition-all"
                >
                  Voir les promotions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {promos.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-soft"
                    style={{ background: p.gradient }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={600}
                      height={800}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-2 glass-strong">
                      <div className="text-[10px] text-muted-foreground line-through">{p.oldPrice} DH</div>
                      <div className="text-display text-base font-semibold text-foreground">{p.price} DH</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* PRODUITS VEDETTES */}
      <section className="py-20 relative">
        <div className="blob blob-rose w-[400px] h-[400px] top-20 -right-20 animate-blob" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <SectionTitle eyebrow="Sélection" title="Nos produits vedettes" align="left" />
            <Link to="/categories" className="text-sm text-secondary hover:text-secondary/80 inline-flex items-center gap-1 group">
              Voir tout <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="relative group/carousel">
            <button 
              onClick={scrollLeft}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-[calc(50%+1rem)] z-20 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-foreground transition-all duration-100 hover:scale-110 hover:bg-white dark:hover:bg-black opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
            </button>
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-5 pb-8 pt-4 -mx-4 px-4 snap-x snap-mandatory flex-nowrap scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {featured.map((p, i) => (
                <div key={p.id} className="w-[260px] md:w-[300px] flex-none snap-start">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
            <button 
              onClick={scrollRight}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-[calc(50%+1rem)] z-20 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-foreground transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-black opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      

      

      {/* AVANTAGES */}
      <section className="py-2">
        <div className="container mx-auto px-4">
          <SectionTitle eyebrow="L'expérience 4YouPara" title="Le soin, jusque dans les détails" />
          <div className="mt-12 grid md:grid-cols-4 gap-5">
            {[
              { icon: Truck, title: "Livraison 24h/24", desc: "Partout au Maroc, soigneusement emballé." },
              { icon: ShieldCheck, title: "Authentique", desc: "Produits originaux, traçabilité garantie." },
              { icon: HeartHandshake, title: "Conseil pharmacien", desc: "Une expertise humaine derrière chaque commande." },
              { icon: Leaf, title: "Sélection bio", desc: "Une attention particulière aux formules naturelles." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-3xl p-6 hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-2xl gradient-sage inline-flex items-center justify-center text-white mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* MARQUES MARQUEE */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Les marques de confiance
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-marquee whitespace-nowrap items-center py-4" style={{ width: "max-content" }}>
            {[...brands, ...brands].map((b, i) => (
              <div key={i} className="flex items-center gap-4 glass px-5 py-3 rounded-full hover:shadow-elevated hover:bg-white dark:hover:bg-black/50 border border-white/40 dark:border-white/10 transition-all cursor-pointer group">
                <div 
                  className="h-12 w-12 rounded-full flex shrink-0 items-center justify-center text-white font-semibold text-lg shadow-soft transition-transform duration-300 group-hover:scale-110"
                  style={{ background: b.gradient }}
                >
                  {b.monogram}
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-display text-foreground font-semibold text-lg overflow-hidden leading-tight">{b.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{b.origin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <SectionTitle eyebrow="Conseils & rituels" title="Le journal beauté" align="left" />
            <Link to="/blog" className="text-sm text-secondary hover:text-secondary/80 inline-flex items-center gap-1 group">
              Tous les articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block glass rounded-3xl overflow-hidden hover:shadow-elevated transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] gradient-hero relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-display text-7xl text-white/40">
                      ✿
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="text-secondary">{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2 text-display text-lg leading-snug text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function SectionTitle({ eyebrow, title, align = "center" }: { eyebrow: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      <span className="text-xs uppercase tracking-[0.3em] text-secondary">{eyebrow}</span>
      <h2 className="mt-3 text-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">{title}</h2>
    </div>
  );
}
 {/* ANNONCES PROMOS ATTIRANTES */}
      {/* <section className="relative z-20 mt-16 mb-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-500 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <div className="text-display font-semibold text-foreground text-base">Cadeau offert</div>
                <div className="text-xs text-muted-foreground mt-0.5">Dès 500 DH d'achat</div>
              </div>
            </div>
            
            <div className="gradient-button text-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-glow-rose transition-all hover:-translate-y-1 cursor-pointer group shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 scale-[2.5] -translate-y-1/4 translate-x-1/4">
                <Percent className="h-24 w-24" />
              </div>
              <div className="h-12 w-12 rounded-full bg-white/20 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                <Percent className="h-5 w-5" />
              </div>
              <div className="relative z-10">
                <div className="text-display font-semibold text-white text-base">-20% Solaire</div>
                <div className="text-xs text-white/90 mt-0.5">Code: <span className="font-bold tracking-wider">SUN26</span></div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-sage-100 dark:bg-sage-900/40 text-secondary flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-display font-semibold text-foreground text-base">Livraison gratuite</div>
                <div className="text-xs text-muted-foreground mt-0.5">Partout au Maroc</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
