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
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${anime.image})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-6 text-right" dir="rtl">
            {/* Rating */}
            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{anime.rating}</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {anime.titleArabic}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {anime.title}
              </p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-end">
              <span>{anime.year}</span>
              <span>•</span>
              <span>{anime.episodes} حلقة</span>
              <span>•</span>
              <span>مكتمل</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 justify-end">
              {anime.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="border-primary/30 text-primary bg-primary/10"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-foreground/90 leading-relaxed max-w-xl text-right">
              {anime.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end flex-wrap">
              <Button variant="anime" size="lg" className="gap-2">
                <Play className="h-5 w-5 fill-current" />
                مشاهدة الآن
              </Button>
              
              <Button variant="outline" size="lg" className="gap-2">
                <Info className="h-5 w-5" />
                تفاصيل أكثر
              </Button>
              
              <Button variant="ghost" size="lg" className="gap-2">
                <Bookmark className="h-5 w-5" />
                إضافة للمفضلة
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