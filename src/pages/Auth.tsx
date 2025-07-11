import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect to profile if user is logged in
        if (session?.user) {
          navigate('/profile');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/profile');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !username)) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message === "Invalid login credentials") {
            toast({
              title: "خطأ في تسجيل الدخول",
              description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
              variant: "destructive",
            });
          } else {
            toast({
              title: "خطأ في تسجيل الدخول",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "تم تسجيل الدخول بنجاح! 🎉",
            description: "مرحباً بك في Anivora",
          });
        }
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              username: username,
              display_name: username
            }
          }
        });

        if (error) {
          if (error.message === "User already registered") {
            toast({
              title: "حساب موجود بالفعل",
              description: "هذا البريد الإلكتروني مسجل مسبقاً. جرب تسجيل الدخول.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "خطأ في إنشاء الحساب",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "تم إنشاء الحساب بنجاح! 🎉",
            description: "يرجى التحقق من بريدك الإلكتروني للتفعيل",
          });
        }
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">Anivora</h1>
          </div>
          <CardTitle dir="rtl">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </CardTitle>
          <CardDescription dir="rtl">
            {isLogin 
              ? "ادخل بياناتك لتسجيل الدخول إلى حسابك" 
              : "أنشئ حساباً جديداً للاستمتاع بأفضل الأنمي"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" dir="rtl">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username" dir="rtl">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                dir="rtl"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password" dir="rtl">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
            />
          </div>
          <Button 
            onClick={handleAuth} 
            className="w-full" 
            disabled={loading}
            variant="anime"
          >
            {loading ? "جاري التحميل..." : (isLogin ? "تسجيل الدخول" : "إنشاء حساب")}
          </Button>
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              dir="rtl"
            >
              {isLogin 
                ? "ليس لديك حساب؟ أنشئ حساباً جديداً" 
                : "لديك حساب بالفعل؟ سجل دخولك"
              }
            </Button>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full"
            dir="rtl"
          >
            العودة للصفحة الرئيسية
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}