import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Star, Calendar, Eye, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Import anime poster image
import kimetsuPoster from "@/assets/anime-2.jpg";

const WatchAnime = () => {
  const { id } = useParams();

  // Sample data for Kimetsu no Yaiba
  const animeData = {
    id: "kimetsu-no-yaiba",
    title: "Demon Slayer: Kimetsu no Yaiba",
    titleArabic: "قاتل الشياطين: كيميتسو نو يايبا",
    poster: kimetsuPoster,
    rating: 8.7,
    year: 2019,
    episodes: 44,
    status: "مستمر",
    genres: ["أكشن", "خارق للطبيعة", "تاريخي"],
    description: "في عالم تهيمن عليه الشياطين المفترسة، يصبح تانجيرو كاميدو صياد شياطين بعد أن قتلت عائلته على يد شيطان، ولم تنج سوى أخته نيزوكو التي تحولت إلى شيطان. يبدأ رحلة ملحمية للعثور على علاج لأخته والانتقام من قاتل عائلته.",
    trailer: "https://www.youtube.com/embed/VQGCKyvzIM4"
  };

  if (id !== "kimetsu-no-yaiba") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">الأنمي غير موجود</h1>
          <Link to="/">
            <Button variant="outline">العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${animeData.poster})`
        }}
      >
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-card/80 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4" dir="rtl">
                {animeData.titleArabic}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 text-white/80 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{animeData.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{animeData.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{animeData.episodes} حلقة</span>
                </div>
                <Badge variant="secondary" className="text-xs md:text-sm">{animeData.status}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {animeData.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="text-white border-white/30">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-white/90 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none" dir="rtl">
                {animeData.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 md:gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-none">
                  <Play className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  ▶️ ابدأ المشاهدة
                </Button>
                <Button variant="outline" size="sm" className="bg-card/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/10 sm:hidden">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="bg-card/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/10 hidden sm:flex">
                  <Heart className="h-5 w-5 mr-2" />
                  إضافة للمفضلة
                </Button>
                <Button variant="outline" size="sm" className="bg-card/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/10 sm:hidden">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="bg-card/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/10 hidden sm:flex">
                  <Share2 className="h-5 w-5 mr-2" />
                  مشاركة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4" dir="rtl">عن الأنمي</h2>
                <p className="text-muted-foreground leading-relaxed" dir="rtl">
                  {animeData.description}
                </p>
              </CardContent>
            </Card>

            {/* Trailer Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4" dir="rtl">المقطع الدعائي</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-card">
                  <iframe
                    src={animeData.trailer}
                    title="Anime Trailer"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4" dir="rtl">معلومات الأنمي</h3>
                <div className="space-y-3">
                  <div className="flex justify-between" dir="rtl">
                    <span className="text-muted-foreground">الاسم الإنجليزي:</span>
                    <span className="font-medium">{animeData.title}</span>
                  </div>
                  <div className="flex justify-between" dir="rtl">
                    <span className="text-muted-foreground">سنة الإنتاج:</span>
                    <span className="font-medium">{animeData.year}</span>
                  </div>
                  <div className="flex justify-between" dir="rtl">
                    <span className="text-muted-foreground">عدد الحلقات:</span>
                    <span className="font-medium">{animeData.episodes}</span>
                  </div>
                  <div className="flex justify-between" dir="rtl">
                    <span className="text-muted-foreground">الحالة:</span>
                    <Badge variant="secondary">{animeData.status}</Badge>
                  </div>
                  <div className="flex justify-between" dir="rtl">
                    <span className="text-muted-foreground">التقييم:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{animeData.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4" dir="rtl">الأنواع</h3>
                <div className="flex flex-wrap gap-2">
                  {animeData.genres.map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchAnime;