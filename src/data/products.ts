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
import solLaroche from "@/assets/solaire-laroche.jpg";
import solEucerin from "@/assets/solaire-eucerin.jpg";
import solNuxe from "@/assets/solaire-nuxe.jpg";
import solAvene from "@/assets/solaire-avene.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "visage", name: "Soins Visage", description: "Sérums, crèmes et nettoyants pour une peau éclatante", emoji: "✿", image: catVisage },
  { slug: "corps", name: "Soins Corps", description: "Hydratation, gommages et huiles précieuses", emoji: "❀", image: catCorps },
  { slug: "cheveux", name: "Cheveux", description: "Shampooings, masques et soins capillaires experts", emoji: "✾", image: catCheveux },
  { slug: "solaire", name: "Solaire", description: "Protection SPF & after-sun pour toutes peaux", emoji: "☀", image: catSolaire },
  { slug: "bebe", name: "Bébé & Maman", description: "Douceur et sécurité pour les plus petits", emoji: "♡", image: catBebe },
  { slug: "complements", name: "Compléments", description: "Vitamines & nutricosmétiques bien-être", emoji: "✦", image: catComplements },
  { slug: "hygiene", name: "Hygiène", description: "Essentiels d'hygiène quotidienne premium", emoji: "✧", image: catHygiene },
  { slug: "minceur", name: "Minceur", description: "Programmes silhouette & détox", emoji: "❋", image: catMinceur },
];

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

export const products: Product[] = [
  { id: "p1", name: "Sérum Vitamine C Éclat", brand: "La Roche-Posay", category: "visage", price: 289, oldPrice: 349, rating: 4.8, reviews: 142, badge: "Best-seller",
    description: "Un sérum concentré qui illumine le teint et atténue les taches pigmentaires en 4 semaines.",
    ingredients: "Vitamine C 10%, Acide Hyaluronique, Niacinamide, Glycérine végétale.",
    usage: "Appliquer matin et/ou soir sur peau propre avant la crème hydratante.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.85 0.09 25))", image: p1 },
  { id: "p2", name: "Crème Hydratante Cica", brand: "Avène", category: "visage", price: 189, rating: 4.7, reviews: 98, badge: "Nouveau",
    description: "Réparation intense pour peaux sensibles et irritées, texture fondante.",
    ingredients: "Centella Asiatica, Eau Thermale Avène, Beurre de Karité.",
    usage: "Matin et soir sur visage et cou parfaitement nettoyés.",
    gradient: "linear-gradient(135deg, oklch(0.9 0.05 145), oklch(0.92 0.04 25))", image: p2 },
  { id: "p3", name: "Huile Précieuse Argan", brand: "Nuxe", category: "corps", price: 320, rating: 4.9, reviews: 215, badge: "Bio",
    description: "Huile sèche multi-usages corps, visage et cheveux à l'argan bio du Maroc.",
    ingredients: "Huile d'Argan Bio, Huile de Macadamia, Vitamine E.",
    usage: "Quelques gouttes sur peau humide ou cheveux pour un effet glow.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.13 80), oklch(0.78 0.1 50))", image: p3 },
  { id: "p4", name: "Shampooing Réparateur Kératine", brand: "Klorane", category: "cheveux", price: 145, oldPrice: 175, rating: 4.6, reviews: 87, badge: "Promo",
    description: "Restaure la fibre capillaire et apporte brillance dès la première utilisation.",
    ingredients: "Kératine végétale, Quinoa, Huile d'Avocat.",
    usage: "Masser le cuir chevelu, laisser poser 2 minutes, rincer abondamment.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.06 280), oklch(0.88 0.05 320))", image: p4 },
  { id: "p5", name: "Crème Solaire SPF 50+ Invisible", brand: "Bioderma", category: "solaire", price: 235, rating: 4.8, reviews: 176, badge: "Best-seller",
    description: "Protection très haute, fini invisible, résistante à l'eau et à la sueur.",
    ingredients: "Filtres minéraux + organiques, Vitamine E, Eau thermale.",
    usage: "Appliquer généreusement 20 minutes avant l'exposition, renouveler toutes les 2h.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.1 90), oklch(0.88 0.09 60))", image: p5 },
  { id: "p6", name: "Liniment Oléo-Calcaire Bio", brand: "Mustela", category: "bebe", price: 98, rating: 4.9, reviews: 312, badge: "Bio",
    description: "Nettoie et protège les fesses de bébé en douceur, certifié bio.",
    ingredients: "Huile d'olive vierge bio, Eau de chaux.",
    usage: "Imbiber un coton, nettoyer les fesses, ne pas rincer.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.04 25), oklch(0.95 0.03 80))", image: p6 },
  { id: "p7", name: "Collagène Marin Beauté", brand: "Arkopharma", category: "complements", price: 285, oldPrice: 340, rating: 4.5, reviews: 64, badge: "Promo",
    description: "Complément nutricosmétique pour la fermeté de la peau et la brillance des cheveux.",
    ingredients: "Collagène marin hydrolysé 5g, Vitamine C, Zinc, Acide hyaluronique.",
    usage: "1 stick par jour dilué dans un grand verre d'eau, le matin.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.09 25), oklch(0.82 0.08 15))", image: p7 },
  { id: "p8", name: "Gel Douche Fleur de Coton", brand: "Le Petit Marseillais", category: "hygiene", price: 65, rating: 4.4, reviews: 220,
    description: "Lavant doux pH neutre, parfum délicat fleur de coton, format familial.",
    ingredients: "Extrait de coton, Glycérine, Base lavante douce.",
    usage: "Faire mousser sur peau humide, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.95 0.02 145), oklch(0.92 0.04 25))", image: p8 },
  { id: "p9", name: "Masque Argile Verte Purifiant", brand: "Cattier", category: "visage", price: 89, rating: 4.7, reviews: 134, badge: "Bio",
    description: "Absorbe l'excès de sébum et resserre les pores en 10 minutes.",
    ingredients: "Argile verte montmorillonite, Aloe vera bio.",
    usage: "Couche fine 1 à 2 fois par semaine, laisser poser 10 min, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.08 145), oklch(0.7 0.07 150))", image: p9 },
  { id: "p10", name: "Patchs Yeux Rose & Or", brand: "Talika", category: "visage", price: 220, rating: 4.6, reviews: 78, badge: "Nouveau",
    description: "Anti-cernes et anti-poches, action immédiate avec extrait de rose et particules d'or.",
    ingredients: "Extrait de rose, Or colloïdal, Acide hyaluronique.",
    usage: "Appliquer sous les yeux, laisser poser 15 minutes 2-3 fois par semaine.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.08 25), oklch(0.85 0.1 60))", image: p10 },
  { id: "p11", name: "Brûleur Naturel Thé Vert", brand: "Forté Pharma", category: "minceur", price: 195, rating: 4.3, reviews: 56,
    description: "Action coup de pouce minceur grâce aux actifs végétaux brûle-graisses.",
    ingredients: "Thé vert, Guarana, Caféine naturelle, Chrome.",
    usage: "2 gélules le matin avec un grand verre d'eau pendant 30 jours.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.1 145), oklch(0.7 0.09 130))", image: p11 },
  { id: "p12", name: "Masque Capillaire Karité Profond", brand: "René Furterer", category: "cheveux", price: 245, rating: 4.8, reviews: 102, badge: "Best-seller",
    description: "Nutrition intense pour cheveux secs et abîmés, brillance miroir.",
    ingredients: "Beurre de Karité, Huile d'Argan, Provitamine B5.",
    usage: "Sur cheveux humides, laisser poser 5 minutes, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.06 60), oklch(0.85 0.07 40))", image: p12 },
  { id: "p13", name: "Sérum Rose Apaisant", brand: "Caudalie", category: "visage", price: 265, rating: 4.7, reviews: 89, badge: "Nouveau",
    description: "Sérum à l'eau de rose pour apaiser et raviver l'éclat des peaux sensibles.",
    ingredients: "Eau de rose, Polyphénols de raisin, Acide hyaluronique.",
    usage: "Matin et soir avant la crème hydratante.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.06 25), oklch(0.88 0.05 60))", image: p13 },
  { id: "p14", name: "Crème Anti-Âge Globale", brand: "Filorga", category: "visage", price: 425, oldPrice: 495, rating: 4.9, reviews: 187, badge: "Best-seller",
    description: "Soin anti-âge complet qui lisse, repulpe et illumine en 4 semaines.",
    ingredients: "NCTF Complex, Acide hyaluronique, Peptides.",
    usage: "Matin et/ou soir sur visage, cou et décolleté.",
    gradient: "linear-gradient(135deg, oklch(0.9 0.05 145), oklch(0.92 0.04 80))", image: p14 },
  { id: "p15", name: "Lait Corps Hydratant 48h", brand: "Eucerin", category: "corps", price: 175, rating: 4.6, reviews: 124,
    description: "Hydratation longue durée pour peaux très sèches, texture fondante non grasse.",
    ingredients: "Urée 5%, Céramides, Glycérine.",
    usage: "Appliquer quotidiennement sur peau propre, insister sur les zones sèches.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.05 25), oklch(0.95 0.03 60))", image: p15 },
  { id: "p16", name: "Shampooing Anti-Chute Énergisant", brand: "René Furterer", category: "cheveux", price: 215, oldPrice: 255, rating: 4.7, reviews: 98, badge: "Promo",
    description: "Stimule la croissance et fortifie la fibre dès la racine.",
    ingredients: "Complexe RF80, Huiles essentielles, Vitamines B.",
    usage: "Masser le cuir chevelu, laisser poser 5 min, rincer. 3 fois par semaine.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.1 40), oklch(0.7 0.09 30))", image: p16 },
  { id: "p17", name: "Fluide Solaire Visage SPF 50+", brand: "Vichy", category: "solaire", price: 195, rating: 4.8, reviews: 156, badge: "Best-seller",
    description: "Fluide ultra-léger non gras, idéal sous le maquillage.",
    ingredients: "Filtres Mexoryl, Eau thermale Vichy, Vitamine E.",
    usage: "Appliquer généreusement avant l'exposition.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.1 80), oklch(0.88 0.08 60))", image: p17 },
  { id: "p18", name: "Eau Nettoyante Bébé Sans Rinçage", brand: "Mustela", category: "bebe", price: 115, rating: 4.8, reviews: 203,
    description: "Nettoie en douceur le visage, le corps et le siège de bébé sans rinçage.",
    ingredients: "Avocat Perseose, Aloe vera, Glycérine.",
    usage: "Imbiber un coton et nettoyer délicatement.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.04 230), oklch(0.95 0.03 80))", image: p18 },
  { id: "p19", name: "Multivitamines Énergie & Vitalité", brand: "Arkopharma", category: "complements", price: 165, rating: 4.5, reviews: 78,
    description: "Cure complète pour combler les carences et booster l'énergie quotidienne.",
    ingredients: "Vitamines A, B, C, D, E, Magnésium, Zinc.",
    usage: "1 gélule par jour le matin pendant 30 jours.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.1 80), oklch(0.82 0.09 50))", image: p19 },
  { id: "p20", name: "Savon Liquide Mains Verveine", brand: "Le Petit Marseillais", category: "hygiene", price: 55, rating: 4.5, reviews: 167,
    description: "Lavant doux pour les mains au parfum frais de verveine.",
    ingredients: "Extrait de verveine, Glycérine végétale.",
    usage: "Une pression suffit, faire mousser et rincer.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.08 130), oklch(0.95 0.05 145))", image: p20 },
  { id: "p21", name: "Gel Minceur Concentré 7 Actifs", brand: "Forté Pharma", category: "minceur", price: 245, oldPrice: 295, rating: 4.4, reviews: 89, badge: "Promo",
    description: "Action ciblée anti-capitons, peau plus lisse et tonique.",
    ingredients: "Caféine, L-Carnitine, Extraits végétaux brûle-graisses.",
    usage: "Massage matin et soir sur les zones concernées pendant 4 semaines.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.1 145), oklch(0.7 0.09 130))", image: p21 },
  { id: "p22", name: "Mousse Nettoyante Douce Visage", brand: "Bioderma", category: "visage", price: 135, rating: 4.7, reviews: 145,
    description: "Mousse onctueuse qui nettoie sans dessécher, idéale peaux sensibles.",
    ingredients: "Brevet D.A.F., Glycérine, Eau micellaire.",
    usage: "Faire mousser dans les mains, masser le visage humide, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.06 25), oklch(0.9 0.05 60))", image: p22 },
  { id: "p23", name: "Gommage Corps Sucre & Argan", brand: "Nuxe", category: "corps", price: 225, rating: 4.8, reviews: 134, badge: "Bio",
    description: "Exfoliant doux qui lisse et nourrit pour une peau soyeuse.",
    ingredients: "Sucre roux, Huile d'argan bio, Vitamine E.",
    usage: "Sous la douche, masser sur peau humide, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.1 80), oklch(0.78 0.09 50))", image: p23 },
  { id: "p24", name: "Huile Capillaire Réparatrice", brand: "Klorane", category: "cheveux", price: 185, rating: 4.6, reviews: 112, badge: "Bio",
    description: "Nourrit en profondeur et apporte une brillance miroir aux cheveux secs.",
    ingredients: "Huile d'argan bio, Huile de figue de Barbarie.",
    usage: "Quelques gouttes sur cheveux humides ou secs, sur les longueurs.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.13 70), oklch(0.78 0.1 50))", image: p24 },
  { id: "p25", name: "Lait Après-Soleil Apaisant", brand: "Bioderma", category: "solaire", price: 165, rating: 4.7, reviews: 98,
    description: "Hydrate, apaise et prolonge le bronzage après une exposition solaire.",
    ingredients: "Aloe vera, Beurre de karité, Vitamine E.",
    usage: "Appliquer généreusement sur tout le corps après la douche.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.08 230), oklch(0.88 0.06 200))", image: p25 },
  { id: "p26", name: "Shampooing Bébé Très Doux", brand: "Mustela", category: "bebe", price: 105, rating: 4.9, reviews: 245, badge: "Best-seller",
    description: "Formule sans larmes, respecte le cuir chevelu fragile de bébé.",
    ingredients: "Avocat Perseose, Base lavante extra-douce.",
    usage: "Faire mousser sur cuir chevelu humide, rincer délicatement.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.05 25), oklch(0.95 0.03 60))", image: p26 },
  { id: "p27", name: "Gummies Beauté Peau & Cheveux", brand: "Forté Pharma", category: "complements", price: 215, rating: 4.6, reviews: 87, badge: "Nouveau",
    description: "Délicieuses gummies pour la beauté de la peau, cheveux et ongles.",
    ingredients: "Biotine, Zinc, Vitamine E, Acide hyaluronique.",
    usage: "2 gummies par jour pendant 30 jours.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.09 25), oklch(0.85 0.08 15))", image: p27 },
  { id: "p28", name: "Dentifrice Blancheur Naturel", brand: "Avène", category: "hygiene", price: 75, rating: 4.4, reviews: 134,
    description: "Blanchit en douceur sans abîmer l'émail, fraîcheur longue durée.",
    ingredients: "Bicarbonate, Extraits naturels, Fluor.",
    usage: "Brosser 2 minutes 2 fois par jour.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.06 145), oklch(0.95 0.04 60))", image: p28 },
  { id: "p29", name: "Crème Anti-Cellulite Tonique", brand: "Vichy", category: "minceur", price: 235, rating: 4.5, reviews: 102, badge: "Nouveau",
    description: "Lisse l'aspect peau d'orange et raffermit la peau en 28 jours.",
    ingredients: "Caféine 5%, Lipocidine, Eau thermale.",
    usage: "Massage circulaire matin et soir sur cuisses et hanches.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.09 145), oklch(0.72 0.08 130))", image: p29 },
  { id: "p30", name: "Sérum Rétinol Nuit Anti-Âge", brand: "La Roche-Posay", category: "visage", price: 345, oldPrice: 395, rating: 4.8, reviews: 156, badge: "Promo",
    description: "Atténue rides et taches pour un teint visiblement rajeuni.",
    ingredients: "Rétinol pur 0.3%, Niacinamide, Eau thermale.",
    usage: "Le soir uniquement, sur peau propre, suivre d'un SPF le matin.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.1 60), oklch(0.78 0.09 40))", image: p30 },
  { id: "p31", name: "Lait Corps Karité Profond", brand: "Nuxe", category: "corps", price: 195, rating: 4.7, reviews: 132,
    description: "Nourrit intensément les peaux sèches, parfum gourmand délicat.",
    ingredients: "Beurre de karité 10%, Huile d'amande douce.",
    usage: "Appliquer quotidiennement sur tout le corps après la douche.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.05 80), oklch(0.95 0.03 60))", image: p31 },
  { id: "p32", name: "Shampooing Sec Volumateur", brand: "Klorane", category: "cheveux", price: 125, rating: 4.6, reviews: 178, badge: "Best-seller",
    description: "Absorbe l'excès de sébum et donne du volume entre deux shampooings.",
    ingredients: "Lait d'avoine, Amidon naturel.",
    usage: "Vaporiser à 20 cm des racines, masser et brosser.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.07 80), oklch(0.85 0.06 50))", image: p32 },
  
];

export type Brand = {
  name: string;
  origin: string;
  tagline: string;
  signature: string;
  gradient: string;
  accent: string;
  monogram: string;
};

export const brands: Brand[] = [
  { name: "La Roche-Posay", origin: "France", tagline: "Dermatologie de référence", signature: "Eau thermale apaisante", gradient: "linear-gradient(135deg, oklch(0.92 0.04 240 / 0.7), oklch(0.85 0.06 220 / 0.5))", accent: "oklch(0.55 0.12 240)", monogram: "LRP" },
  { name: "Avène", origin: "France", tagline: "Peaux sensibles depuis 1990", signature: "Eau thermale d'Avène", gradient: "linear-gradient(135deg, oklch(0.93 0.03 200 / 0.7), oklch(0.88 0.05 180 / 0.5))", accent: "oklch(0.6 0.08 200)", monogram: "AV" },
  { name: "Nuxe", origin: "France", tagline: "Naturalité botanique", signature: "Huile Prodigieuse®", gradient: "linear-gradient(135deg, oklch(0.92 0.06 70 / 0.7), oklch(0.86 0.08 50 / 0.5))", accent: "oklch(0.6 0.1 65)", monogram: "NX" },
  { name: "Bioderma", origin: "France", tagline: "Biologie au service de la peau", signature: "Sensibio H2O", gradient: "linear-gradient(135deg, oklch(0.93 0.04 160 / 0.7), oklch(0.86 0.06 145 / 0.5))", accent: "oklch(0.55 0.09 150)", monogram: "BD" },
  { name: "Vichy", origin: "France", tagline: "Force minérale revitalisante", signature: "Eau volcanique", gradient: "linear-gradient(135deg, oklch(0.91 0.05 260 / 0.7), oklch(0.84 0.07 240 / 0.5))", accent: "oklch(0.5 0.13 260)", monogram: "VC" },
  { name: "Mustela", origin: "France", tagline: "Bébé & maternité", signature: "Avocat Perseose®", gradient: "linear-gradient(135deg, oklch(0.94 0.04 25 / 0.7), oklch(0.88 0.06 15 / 0.5))", accent: "oklch(0.65 0.1 20)", monogram: "MS" },
  { name: "Klorane", origin: "France", tagline: "Botanique capillaire", signature: "Shampooing à l'avoine", gradient: "linear-gradient(135deg, oklch(0.93 0.05 95 / 0.7), oklch(0.86 0.07 80 / 0.5))", accent: "oklch(0.55 0.1 95)", monogram: "KL" },
  { name: "Caudalie", origin: "Bordeaux, France", tagline: "Vinothérapie® anti-âge", signature: "Resvératrol-lift", gradient: "linear-gradient(135deg, oklch(0.9 0.06 340 / 0.7), oklch(0.82 0.08 330 / 0.5))", accent: "oklch(0.5 0.15 340)", monogram: "CD" },
  { name: "Eucerin", origin: "Allemagne", tagline: "Science dermatologique", signature: "Hyaluron-Filler", gradient: "linear-gradient(135deg, oklch(0.92 0.04 50 / 0.7), oklch(0.85 0.06 35 / 0.5))", accent: "oklch(0.55 0.12 45)", monogram: "EU" },
  { name: "Filorga", origin: "France", tagline: "Médi-cosmétique anti-âge", signature: "NCEF Reverse", gradient: "linear-gradient(135deg, oklch(0.9 0.04 25 / 0.7), oklch(0.82 0.07 15 / 0.5))", accent: "oklch(0.5 0.14 25)", monogram: "FG" },
  { name: "Talika", origin: "France", tagline: "Beauté par la lumière", signature: "Lipocils", gradient: "linear-gradient(135deg, oklch(0.91 0.05 310 / 0.7), oklch(0.83 0.08 300 / 0.5))", accent: "oklch(0.5 0.15 310)", monogram: "TK" },
  { name: "René Furterer", origin: "Provence, France", tagline: "Rituels capillaires", signature: "Complexe 5", gradient: "linear-gradient(135deg, oklch(0.92 0.05 130 / 0.7), oklch(0.85 0.07 115 / 0.5))", accent: "oklch(0.5 0.1 130)", monogram: "RF" },
];

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
