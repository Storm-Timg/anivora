import { useState, useEffect } from "react";
import { Search, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimeCard } from "./AnimeCard";
import { generateSampleAnimes } from "./AnimeSection";
import { Loading } from "./Loading";

export function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(generateSampleAnimes());

  useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true);
      // Simulate search delay
      setTimeout(() => {
        const filtered = generateSampleAnimes().filter(anime =>
          anime.titleArabic.includes(searchQuery) ||
          anime.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
      }, 500);
    } else {
      setResults(generateSampleAnimes());
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="ابحث عن أنمي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              dir="rtl"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
            <Button variant="outline" className="gap-2">
              <SortAsc className="h-4 w-4" />
              ترتيب
            </Button>
          </div>
        </div>

        {searchQuery && (
          <p className="text-muted-foreground" dir="rtl">
            نتائج البحث عن: "<span className="text-foreground font-medium">{searchQuery}</span>"
            {!loading && ` (${results.length} نتيجة)`}
          </p>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loading text="جاري البحث..." />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((anime) => (
            <AnimeCard
              key={anime.id}
              {...anime}
              onPlay={(id) => console.log("Playing:", id)}
            />
          ))}
        </div>
      )}

      {!loading && results.length === 0 && searchQuery && (
        <div className="text-center py-12" dir="rtl">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
          <p className="text-muted-foreground">
            لم نجد أي أنمي يطابق بحثك. جرب كلمات مختلفة أو تصفح التصنيفات.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSearchQuery("")}
          >
            مسح البحث
          </Button>
        </div>
      )}
    </div>
  );
}