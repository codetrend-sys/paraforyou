import catVisage from "@/assets/cat-visage.jpg";
import catCorps from "@/assets/cat-corps.jpg";
import catCheveux from "@/assets/cat-cheveux.jpg";
import catSolaire from "@/assets/cat-solaire.jpg";
import catBebe from "@/assets/cat-bebe.jpg";
import catComplements from "@/assets/cat-complements.jpg";
import catHygiene from "@/assets/cat-hygiene.jpg";
import catMinceur from "@/assets/cat-minceur.jpg";

import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";
import p11 from "@/assets/p11.jpg";
import p12 from "@/assets/p12.jpg";
import p13 from "@/assets/p13.jpg";
import p14 from "@/assets/p14.jpg";
import p15 from "@/assets/p15.jpg";
import p16 from "@/assets/p16.jpg";
import p17 from "@/assets/p17.jpg";
import p18 from "@/assets/p18.jpg";
import p19 from "@/assets/p19.jpg";
import p20 from "@/assets/p20.jpg";
import p21 from "@/assets/p21.jpg";
import p22 from "@/assets/p22.jpg";
import p23 from "@/assets/p23.jpg";
import p24 from "@/assets/p24.jpg";
import p25 from "@/assets/p25.jpg";
import p26 from "@/assets/p26.jpg";
import p27 from "@/assets/p27.jpg";
import p28 from "@/assets/p28.jpg";
import p29 from "@/assets/p29.jpg";
import p30 from "@/assets/p30.jpg";
import p31 from "@/assets/p31.jpg";
import p32 from "@/assets/p32.jpg";

import aveneLogo from "@/assets/avene.png";
import biodermaLogo from "@/assets/bioderma.png";
import caudalieLogo from "@/assets/cauldie.png";
import eucerinLogo from "@/assets/eucerin.png";
import filorgaLogo from "@/assets/filorga.png";
import furtererLogo from "@/assets/furterer.png";
import kloraneLogo from "@/assets/klorane.png";
import mustelaLogo from "@/assets/mustela.png";
import nuxeLogo from "@/assets/nuxe.png";
import rocheLogo from "@/assets/roche.png";
import talikaLogo from "@/assets/talika.png";
import vichyLogo from "@/assets/vichy.png";
import bgPosay from "@/assets/bg-posay.png";
import bgAvene from "@/assets/bg-avene.png";
import bgNuxe from "@/assets/bg-nuxe.png";
import bgBioderma from "@/assets/bg-bioderma.png";
import bgVichy from "@/assets/bg-vichy.png";
import bgCaudalie from "@/assets/bg-caudalie.png";
import bgFilorga from "@/assets/bg-filorga.png";
import bgEucerin from "@/assets/bg-eucerin.png";
import bgFurterer from "@/assets/bg-furterer.png";
import bgKlorane from "@/assets/bg-klorane.png";
import bgMustela from "@/assets/bg-mustela.png";
import bgTalika from "@/assets/bg-talika.png";

export type Category = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  image: string;
};

export const categories: Category[] = [];

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Nouveau" | "Best-seller" | "Promo" | "Bio";
  description: string;
  ingredients: string;
  usage: string;
  gradient: string;
  image: string;
};

export const products: Product[] = [];

export type Brand = {
  name: string;
  origin: string;
  tagline: string;
  signature: string;
  gradient: string;
  accent: string;
  monogram: string;
  image: string;
  bgImage?: string;
};

export const brands: Brand[] = [];

import blogRoutineEclat from "@/assets/blog-routine-eclat.jpg";
import blogSolaire from "@/assets/blog-solaire.jpg";
import blogArgan from "@/assets/blog-argan.jpg";
import blogBebe from "@/assets/blog-bebe.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  { slug: "routine-eclat-peau", title: "5 étapes essentielles pour une peau éclatante au naturel", excerpt: "Découvrez la routine experte de nos pharmaciens pour révéler la luminosité de votre teint sans surcharger votre peau.", category: "Visage", readTime: "6 min", date: "12 Avril 2026", image: blogRoutineEclat },
  { slug: "proteger-soleil-maroc", title: "Protection solaire : nos conseils pour le climat marocain", excerpt: "SPF, textures, gestes : tout ce qu'il faut savoir pour préserver votre peau du soleil méditerranéen.", category: "Solaire", readTime: "4 min", date: "5 Avril 2026", image: blogSolaire },
  { slug: "huile-argan-bienfaits", title: "L'huile d'argan, l'or liquide du Maroc décrypté", excerpt: "Bienfaits, mode d'emploi et faux amis : notre guide complet de l'ingrédient star.", category: "Corps", readTime: "5 min", date: "28 Mars 2026", image: blogArgan },
  { slug: "soin-bebe-douceur", title: "Soin de bébé : choisir des produits sûrs et efficaces", excerpt: "Les critères à connaître absolument et les ingrédients à éviter pour la peau fragile des nourrissons.", category: "Bébé", readTime: "7 min", date: "20 Mars 2026", image: blogBebe },
];
