import { useState } from "react";
import { Search, Filter, Menu, User, Bookmark, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
interface HeaderProps {
  onMenuToggle?: () => void;
  className?: string;
}
export function Header({
  onMenuToggle,
  className
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  return <header className={cn("sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg", className)}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">Anivora</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input type="text" placeholder="ابحث عن الأنمي..." value={searchValue} onChange={e => setSearchValue(e.target.value)} className="pl-10 pr-4 bg-card border-border focus:ring-primary" dir="rtl" />
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Filter className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Home className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bookmark className="h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>;
}