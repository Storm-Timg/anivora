import { useState, useEffect } from "react";
import { Play, Info, Bookmark, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-banner.jpg";

interface HeroAnime {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  rating: number;
  year: number;
  episodes: number;
  genres: string[];
  image: string;
}

export function HeroSection() {
  const [currentAnime, setCurrentAnime] = useState(0);
  
  // Featured anime data
  const featuredAnimes: HeroAnime[] = [
    {
      id: "1",
      title: "Attack on Titan",
      titleArabic: "هجوم العمالقة",
      description: "في عالم تحاصره عمالقة عملاقة، تكافح البشرية من أجل البقاء داخل أسوار ضخمة. عندما يهاجم عملاق جبار، يعهد إرين يايغر بالقضاء على جميع العمالقة.",
      rating: 9.0,
      year: 2023,
      episodes: 87,
      genres: ["أكشن", "دراما", "فانتازيا"],
      image: heroImage
    }
  ];

  // Auto-rotate hero (if multiple animes)
  useEffect(() => {
    if (featuredAnimes.length > 1) {
      const interval = setInterval(() => {
        setCurrentAnime((prev) => (prev + 1) % featuredAnimes.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [featuredAnimes.length]);

  const anime = featuredAnimes[currentAnime];

  return (
    <section className="relative h-[100vh] sm:h-[90vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${anime.image})` }}
      />
      
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center sm:justify-start">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center sm:text-right animate-fade-in" dir="rtl">
            {/* Rating */}
            <div className="flex justify-center sm:justify-end">
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-xl px-4 py-2 border border-primary/20 shadow-glow">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{anime.rating}</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight drop-shadow-2xl">
                {anime.titleArabic}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-primary-glow font-medium">
                {anime.title}
              </p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 text-sm sm:text-base text-muted-foreground justify-center sm:justify-end">
              <span className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">{anime.year}</span>
              <span className="hidden sm:inline">•</span>
              <span className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">{anime.episodes} حلقة</span>
              <span className="hidden sm:inline">•</span>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full backdrop-blur-sm border border-primary/30">مكتمل</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              {anime.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="border-primary/40 text-primary bg-primary/15 backdrop-blur-sm hover:bg-primary/25 transition-all duration-300 shadow-sm"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed max-w-2xl text-center sm:text-right mx-auto sm:mx-0 line-clamp-4 sm:line-clamp-none backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
              {anime.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-end flex-wrap items-center">
              <Button variant="anime" size="lg" className="gap-2 flex-1 sm:flex-none shadow-hover animate-pulse-glow">
                <Play className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                <span className="text-sm md:text-base font-semibold">مشاهدة الآن</span>
              </Button>
              
              <Button variant="outline" size="lg" className="gap-2 hidden sm:flex backdrop-blur-md border-primary/30 hover:border-primary/50 hover:bg-primary/10">
                <Info className="h-5 w-5" />
                تفاصيل أكثر
              </Button>
              
              <Button variant="ghost" size="icon" className="sm:hidden backdrop-blur-md hover:bg-white/10">
                <Info className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="backdrop-blur-md hover:bg-white/10 hover:text-primary transition-all duration-300">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Indicators (if multiple animes) */}
      {featuredAnimes.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredAnimes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAnime(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentAnime 
                  ? "bg-primary scale-125" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}