import { useState, useEffect } from "react";
import { Search, Filter, Menu, User, Bookmark, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
interface HeaderProps {
  onMenuToggle?: () => void;
  className?: string;
}
export function Header({
  onMenuToggle,
  className
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    } else {
      navigate('/search');
    }
  };

  const handleFilter = () => {
    navigate('/search?filter=true');
  };

  const handleBookmarks = () => {
    navigate('/favorites');
  };

  const handleProfile = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const handleMenuToggle = () => {
    if (onMenuToggle) {
      onMenuToggle();
    } else {
      setIsSidebarOpen(true);
    }
  };
  return <header className={cn("sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg", className)}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleMenuToggle} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/src/assets/anivora-logo.png" alt="Anivora" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">Anivora</h1>
          </div>
        </div>

        {/* Search Button */}
        <Button variant="ghost" size="icon" onClick={handleSearch} className="hidden sm:flex">
          <Search className="h-5 w-5" />
        </Button>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="sm:hidden" onClick={handleSearch}>
          <Search className="h-5 w-5" />
        </Button>

        {/* Navigation and Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={handleFilter}>
            <Filter className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => navigate("/")}>
            <Home className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={handleBookmarks}>
            <Bookmark className="h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="icon" onClick={handleProfile}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>;
}