import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AnimeSection, generateSampleAnimes } from "@/components/AnimeSection";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  const sampleAnimes = generateSampleAnimes();
  
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
