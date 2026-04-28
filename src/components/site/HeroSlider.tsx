import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "@/assets/hero-banner-1.png";
import banner2 from "@/assets/hero-banner-2.png";
import banner3 from "@/assets/hero-banner-3.png";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
const slides = [
  {
    image: banner1,
    // title: "Soin Visage Expert",
    // subtitle: "Révélez votre éclat naturel avec nos sérums premium.",
  },
   {
    image: hero2,
    // title: "Douceur Bébé",
    // subtitle: "Des soins purs et naturels pour les plus petits.",
  },
  {
    image: banner2,
    // title: "Dermo-Cosmétique",
    // subtitle: "La science au service de votre peau sensible.",
  },
   {
    image: hero3,
    // title: "Douceur Bébé",
    // subtitle: "Des soins purs et naturels pour les plus petits.",
  },
  {
    image: banner3,
    // title: "Douceur Bébé",
    // subtitle: "Des soins purs et naturels pour les plus petits.",
  },
   {
    image: hero1,
    // title: "Douceur Bébé",
    // subtitle: "Des soins purs et naturels pour les plus petits.",
  },
];

export function HeroSlider() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group ">
      <div className="overflow-hidden rounded-[2.5rem] shadow-elevated" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[400px] md:h-[600px]">
              <img
                src={slide.image}
                // alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center">
                <div className="container mx-auto px-8 md:px-16">
                  <div className="max-w-xl text-white">
                    <h2 className="text-display text-4xl md:text-6xl font-semibold mb-4 drop-shadow-lg">
                      {/* {slide.title} */}
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 drop-shadow-md">
                      {/* {slide.subtitle} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 transition-all rounded-full ${
              selectedIndex === i ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
