import { Heart, Mail, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function Footer() {
  return <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4" dir="rtl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                أنمي سلاير
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              منصة الأنمي الأولى في العالم العربي. تمتع بمشاهدة أحدث وأفضل الأنميات بجودة عالية وترجمة احترافية.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>صنع بحب للمجتمع العربي</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4" dir="rtl">
            <h4 className="font-semibold text-foreground">روابط سريعة</h4>
            <ul className="space-y-2">
              {["الصفحة الرئيسية", "الأنميات الجديدة", "الأكثر مشاهدة", "المفضلة", "قائمة المشاهدة"].map(link => <li key={link}>
                  <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-primary">
                    {link}
                  </Button>
                </li>)}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4" dir="rtl">
            <h4 className="font-semibold text-foreground">التصنيفات</h4>
            <ul className="space-y-2">
              {["أكشن", "رومانسي", "كوميدي", "درامي", "فانتازيا"].map(category => <li key={category}>
                  <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-primary">
                    {category}
                  </Button>
                </li>)}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4" dir="rtl">
            <h4 className="font-semibold text-foreground">ابق على اطلاع</h4>
            <p className="text-sm text-muted-foreground">
              اشترك ليصلك كل جديد من الأنميات والتحديثات
            </p>
            <div className="space-y-2">
              <Input type="email" placeholder="عنوان البريد الإلكتروني" className="bg-background" dir="rtl" />
              <Button variant="anime" className="w-full">
                <Mail className="h-4 w-4 ml-2" />
                اشتراك
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground" dir="rtl">
            <span>© 2026 أنمي سلاير. جميع الحقوق محفوظة.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Shield className="h-4 w-4" />
              الخصوصية
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              الشروط
            </Button>
          </div>
        </div>
      </div>
    </footer>;
}