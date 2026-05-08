import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { getBlogPostBySlug } from "@/lib/api";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title ?? "Article"} — 4YouPara` },
      { name: "description", content: loaderData?.post.excerpt ?? "" },
    ],
  }),
  component: BlogPostPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-display text-4xl">Article introuvable</h1>
        <Link to="/blog" className="mt-6 inline-block text-secondary">Retour au blog</Link>
      </div>
    </SiteShell>
  ),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  return (
    <SiteShell>
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Tous les articles
        </Link>

        <header className="mt-8 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-secondary">{post.category}</div>
          <h1 className="mt-3 text-display text-4xl md:text-6xl font-semibold leading-[1.05]">{post.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">{post.date} · {post.readTime} de lecture</p>
        </header>

        <div className="mt-10 aspect-[16/9] rounded-3xl overflow-hidden shadow-elevated">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" width={1280} height={896} />
        </div>

        <div className="mt-12 prose prose-lg max-w-none text-foreground">
          <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>

          <h2 className="text-display text-3xl mt-10 mb-4">Le rituel pas à pas</h2>
          <p className="text-muted-foreground leading-relaxed">
            Adopter une routine beauté efficace, c'est avant tout une question de régularité et de gestes adaptés
            à votre type de peau. Nos pharmaciens recommandent une approche en plusieurs étapes, douce et progressive,
            pour révéler le meilleur de votre peau sans la brusquer.
          </p>

          <h3 className="text-display text-2xl mt-8 mb-3">1. Nettoyer en douceur</h3>
          <p className="text-muted-foreground leading-relaxed">
            Choisissez un nettoyant pH neutre, sans sulfate, qui respecte votre barrière cutanée.
            Massez délicatement matin et soir avec de l'eau tiède.
          </p>

          <h3 className="text-display text-2xl mt-8 mb-3">2. Hydrater intelligemment</h3>
          <p className="text-muted-foreground leading-relaxed">
            L'hydratation est la clé. Optez pour des actifs comme l'acide hyaluronique ou la glycérine végétale,
            adaptés à toutes les peaux.
          </p>

          <h3 className="text-display text-2xl mt-8 mb-3">3. Protéger chaque jour</h3>
          <p className="text-muted-foreground leading-relaxed">
            Une protection solaire SPF 30 minimum est non négociable, même en hiver. C'est l'investissement
            beauté le plus rentable à long terme.
          </p>

          <div className="mt-10 glass rounded-3xl p-8 text-center">
            <p className="text-display text-2xl text-foreground italic">
              « La beauté véritable naît d'une peau en bonne santé, pas d'un masque parfait. »
            </p>
            <p className="mt-3 text-sm text-muted-foreground">— L'équipe 4YouPara</p>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
