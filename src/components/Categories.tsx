import { useState } from "react";
import { Sword, Heart, Laugh, Zap, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  nameArabic: string;
  icon: any;
  color: string;
  count: number;
}

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: "action",
      name: "Action",
      nameArabic: "أكشن",
      icon: Sword,
      color: "from-red-500 to-orange-500",
      count: 245
    },
    {
      id: "romance",
      name: "Romance",
      nameArabic: "رومانسي",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      count: 156
    },
    {
      id: "comedy",
      name: "Comedy",
      nameArabic: "كوميدي",
      icon: Laugh,
      color: "from-yellow-500 to-amber-500",
      count: 189
    },
    {
      id: "supernatural",
      name: "Supernatural",
      nameArabic: "خارق للطبيعة",
      icon: Zap,
      color: "from-purple-500 to-violet-500",
      count: 134
    },
    {
      id: "fantasy",
      name: "Fantasy",
      nameArabic: "فانتازيا",
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      count: 203
    },
    {
      id: "drama",
      name: "Drama",
      nameArabic: "دراما",
      icon: Crown,
      color: "from-emerald-500 to-green-500",
      count: 167
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" dir="rtl">
            تصفح حسب النوع
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" dir="rtl">
            اكتشف الأنميات المفضلة لديك من خلال تصفح مختلف الأنواع والتصنيفات
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => setSelectedCategory(
                  isSelected ? null : category.id
                )}
                className={cn(
                  "h-auto p-6 flex flex-col items-center gap-3 group transition-all duration-300 hover:scale-105",
                  "bg-card border border-border rounded-xl",
                  isSelected && "ring-2 ring-primary shadow-glow"
                )}
              >
                {/* Icon with gradient background */}
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br transition-all duration-300 group-hover:scale-110",
                  category.color,
                  isSelected && "shadow-lg"
                )}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>

                {/* Category Info */}
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-foreground" dir="rtl">
                    {category.nameArabic}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.name}
                  </p>
                  <span className="text-xs text-primary font-medium">
                    {category.count} أنمي
                  </span>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            عرض جميع التصنيفات
          </Button>
        </div>
      </div>
    </section>
  );
}