import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import heartIcon from "@/assets/heart-icon.png";
import { 
  Home, 
  Search, 
  User, 
  Filter,
  TrendingUp,
  Clock,
  Star,
  PlayCircle,
  X 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const mainMenuItems = [
    { icon: Home, label: "الصفحة الرئيسية", path: "/" },
    { icon: Search, label: "البحث", path: "/search" },
    { icon: "heart-custom", label: "المفضلة", path: "/favorites" },
    { icon: User, label: "الملف الشخصي", path: "/profile" },
  ];

  const categories = [
    { label: "أكشن", count: 45 },
    { label: "مغامرات", count: 32 },
    { label: "دراما", count: 28 },
    { label: "كوميديا", count: 24 },
    { label: "خيال علمي", count: 19 },
    { label: "رومانسي", count: 15 },
  ];

  const quickAccess = [
    { icon: TrendingUp, label: "الأكثر شعبية", path: "/trending" },
    { icon: Clock, label: "أحدث الحلقات", path: "/latest" },
    { icon: Star, label: "الأعلى تقييماً", path: "/top-rated" },
    { icon: PlayCircle, label: "الآن في الأنمي", path: "/now-watching" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 bg-gradient-hero text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-background/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <SheetTitle className="text-primary-foreground text-xl">Anivora</SheetTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-background/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
          {/* Main Menu */}
          <div>
            <h3 className="font-semibold mb-3 text-right" dir="rtl">القائمة الرئيسية</h3>
            <div className="space-y-2">
              {mainMenuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-right"
                  onClick={() => handleNavigation(item.path)}
                  dir="rtl"
                >
                  {item.icon === "heart-custom" ? (
                    <img src={heartIcon} alt="المفضلة" className="h-5 w-5 ml-3" />
                  ) : (
                    <item.icon className="h-5 w-5 ml-3" />
                  )}
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick Access */}
          <div>
            <h3 className="font-semibold mb-3 text-right" dir="rtl">وصول سريع</h3>
            <div className="space-y-2">
              {quickAccess.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-right"
                  onClick={() => handleNavigation(item.path)}
                  dir="rtl"
                >
                  <item.icon className="h-5 w-5 ml-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3 text-right" dir="rtl">التصنيفات</h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-between text-right"
                  onClick={() => handleNavigation(`/category/${category.label}`)}
                  dir="rtl"
                >
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* App Info */}
          <div className="text-center text-muted-foreground text-sm space-y-2">
            <p dir="rtl">أنيفورا - منصة الأنمي المفضلة</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}