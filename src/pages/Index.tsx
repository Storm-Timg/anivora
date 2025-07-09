import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AnimeSection, generateSampleAnimes } from "@/components/AnimeSection";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const sampleAnimes = generateSampleAnimes();

  useEffect(() => {
    const showAnimeNotification = () => {
      toast({
        title: "✨ لدينا أنمي مذهل متاح الآن: Kimetsu no Yaiba!",
        description: "اضغط هنا لمشاهدته بجودة عالية وتجربة مريحة! 🔥",
        action: (
          <Button 
            variant="anime" 
            size="sm"
            onClick={() => navigate("/watch/kimetsu-no-yaiba")}
          >
            🎬 شاهد الآن
          </Button>
        ),
        duration: 10000,
      });
    };

    // Show notification after 2 seconds
    const timer = setTimeout(showAnimeNotification, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Latest Episodes */}
      <AnimeSection 
        title="أحدث الحلقات"
        animes={sampleAnimes}
      />
      
      {/* Categories */}
      <Categories />
      
      {/* Popular Anime */}
      <AnimeSection 
        title="الأكثر شعبية"
        animes={sampleAnimes.slice().reverse()}
        className="bg-muted/20"
      />
      
      {/* Trending Now */}
      <AnimeSection 
        title="الأكثر مشاهدة الآن"
        animes={sampleAnimes.slice(1, 5)}
      />
      
      {/* Completed Series */}
      <AnimeSection 
        title="المسلسلات المكتملة"
        animes={sampleAnimes.filter(anime => anime.status === "مكتمل")}
        className="bg-muted/20"
      />
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
