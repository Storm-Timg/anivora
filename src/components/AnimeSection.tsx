import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimeCard } from "./AnimeCard";
import { cn } from "@/lib/utils";

// Import anime images
import anime1 from "@/assets/anime-1.jpg";
import anime2 from "@/assets/anime-2.jpg";
import anime3 from "@/assets/anime-3.jpg";
import anime4 from "@/assets/anime-4.jpg";

interface Anime {
  id: string;
  title: string;
  titleArabic: string;
  image: string;
  rating: number;
  year: number;
  episodes: number;
  status: "مستمر" | "مكتمل" | "قادم";
  genres: string[];
}

interface AnimeSectionProps {
  title: string;
  animes: Anime[];
  className?: string;
}

export function AnimeSection({ title, animes, className }: AnimeSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground" dir="rtl">
            {title}
          </h2>
        </div>

        {/* Coming Soon Card */}
        <div className="relative">
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-8 text-center shadow-card">
            <div className="animate-bounce mb-4">
              🔧
            </div>
            <div className="text-lg font-medium text-muted-foreground mb-2">
              🔒 قريبًا... نحن نعمل على هذا القسم!
            </div>
            <div className="text-sm text-muted-foreground/70">
              سيتم إضافة المحتوى قريباً
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sample data generator
export function generateSampleAnimes(): Anime[] {
  const sampleAnimes: Anime[] = [
    {
      id: "1",
      title: "Attack on Titan",
      titleArabic: "هجوم العمالقة",
      image: anime1,
      rating: 9.0,
      year: 2023,
      episodes: 87,
      status: "مكتمل",
      genres: ["أكشن", "دراما", "فانتازيا"]
    },
    {
      id: "2",
      title: "Demon Slayer",
      titleArabic: "قاتل الشياطين",
      image: anime2,
      rating: 8.7,
      year: 2023,
      episodes: 44,
      status: "مستمر",
      genres: ["أكشن", "خارق للطبيعة", "تاريخي"]
    },
    {
      id: "3",
      title: "Your Name",
      titleArabic: "اسمك",
      image: anime3,
      rating: 8.4,
      year: 2016,
      episodes: 1,
      status: "مكتمل",
      genres: ["رومانسي", "دراما", "فانتازيا"]
    },
    {
      id: "4",
      title: "Spirited Away",
      titleArabic: "المختطفة",
      image: anime4,
      rating: 9.3,
      year: 2001,
      episodes: 1,
      status: "مكتمل",
      genres: ["مغامرة", "عائلي", "فانتازيا"]
    },
    {
      id: "5",
      title: "One Piece",
      titleArabic: "ون بيس",
      image: anime1,
      rating: 9.1,
      year: 2023,
      episodes: 1000,
      status: "مستمر",
      genres: ["أكشن", "مغامرة", "كوميديا"]
    },
    {
      id: "6",
      title: "My Hero Academia",
      titleArabic: "أكاديمية الأبطال",
      image: anime2,
      rating: 8.5,
      year: 2023,
      episodes: 138,
      status: "مستمر",
      genres: ["أكشن", "مدرسي", "أبطال خارقين"]
    }
  ];

  return sampleAnimes;
}