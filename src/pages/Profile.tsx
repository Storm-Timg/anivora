import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Heart, Clock, Star } from "lucide-react";

export default function Profile() {
  const userStats = [
    { label: "الأنمي المشاهد", value: "42", icon: Star },
    { label: "المفضلة", value: "18", icon: Heart },
    { label: "ساعات المشاهدة", value: "157", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl bg-gradient-hero text-primary-foreground">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl mb-2" dir="rtl">مستخدم أنيفورا</CardTitle>
                  <Badge variant="secondary" className="mb-4">عضو منذ 2024</Badge>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      إعدادات الحساب
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground" dir="rtl">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recently Watched */}
          <Card>
            <CardHeader>
              <CardTitle dir="rtl">الأنمي المشاهد مؤخراً</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground" dir="rtl">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لم تشاهد أي أنمي بعد</p>
                <p className="text-sm">ابدأ بمشاهدة الأنمي المفضل لديك!</p>
              </div>
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card>
            <CardHeader>
              <CardTitle dir="rtl">المفضلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground" dir="rtl">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد مفضلة بعد</p>
                <p className="text-sm">أضف الأنمي المفضل لديك هنا!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}