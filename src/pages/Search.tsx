import { SearchResults } from "@/components/SearchResults";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function Search() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchResults />
      <Footer />
      <ScrollToTop />
    </div>
  );
}