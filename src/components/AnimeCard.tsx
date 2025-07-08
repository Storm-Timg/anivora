import { useState } from "react";
import { Star, Calendar, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  id: string;
  title: string;
  titleArabic: string;
  image: string;
  rating: number;
  year: number;
  episodes: number;
  status: "مستمر" | "مكتمل" | "قادم";
  genres: string[];
  className?: string;
  onPlay?: (id: string) => void;
}

export function AnimeCard({
  id,
  title,
  titleArabic,
  image,
  rating,
  year,
  episodes,
  status,
  genres,
  className,
  onPlay
}: AnimeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مستمر": return "bg-anime-green";
      case "مكتمل": return "bg-anime-blue";
      case "قادم": return "bg-anime-purple";
      default: return "bg-muted";
    }
  };

  return (
    <div 
      className={cn(
        "group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-hover hover:scale-105 hover:border-primary/50",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={titleArabic}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            hovered && "scale-110"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <Badge 
          className={cn(
            "absolute top-2 right-2 text-white border-0",
            getStatusColor(status)
          )}
        >
          {status}
        </Badge>

        {/* Rating */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-xs text-white font-medium">{rating}</span>
        </div>

        {/* Play Button Overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0"
        )}>
          <Button
            variant="anime"
            size="lg"
            onClick={() => onPlay?.(id)}
            className="rounded-full w-16 h-16"
          >
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-foreground line-clamp-1 mb-1" dir="rtl">
            {titleArabic}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {title}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{episodes} حلقة</span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {genres.slice(0, 2).map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="text-xs px-2 py-1"
            >
              {genre}
            </Badge>
          ))}
          {genres.length > 2 && (
            <Badge
              variant="secondary"
              className="text-xs px-2 py-1"
            >
              +{genres.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}