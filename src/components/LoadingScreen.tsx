import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    { text: 'جاري تحميل أحدث الحلقات...', progress: 'جاري الاتصال بالخادم...' },
    { text: 'تحميل قاعدة البيانات...', progress: 'جاري تحميل المحتوى...' },
    { text: 'تحديث قائمة الأنمي...', progress: 'معالجة البيانات...' },
    { text: 'تحضير واجهة المستخدم...', progress: 'تحسين الأداء...' },
    { text: 'تحميل الترجمات...', progress: 'إعداد المشغل...' },
    { text: 'إعداد التجربة النهائية...', progress: 'اكتمال التحميل...' }
  ];

  useEffect(() => {
    // إنشاء الجسيمات المتحركة
    const createParticles = () => {
      const container = document.querySelector('.anime-particles');
      if (!container) return;
      
      const particleCount = 30;
      container.innerHTML = ''; // مسح الجسيمات السابقة
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: hsl(var(--primary));
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          animation: float ${Math.random() * 4 + 6}s infinite linear;
          animation-delay: ${Math.random() * 8}s;
          opacity: 0.6;
        `;
        container.appendChild(particle);
      }
    };

    createParticles();

    // محاكاة عملية التحميل
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 2 + 1;
        const newProgress = Math.min(prev + increment, 100);
        
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          
          setTimeout(() => {
            onLoadingComplete();
          }, 2300);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  useEffect(() => {
    // إضافة تأثير تفاعلي عند تحريك الماوس
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const bgOffset = 10;
      document.body.style.backgroundPosition = 
        `${50 + (mouseX * bgOffset)}% ${50 + (mouseY * bgOffset)}%`;
    };

    // تأثير النقر
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: hsl(var(--primary) / 0.3);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
        pointer-events: none;
        z-index: 9999;
      `;
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 600);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const currentStepData = loadingSteps[currentStep];

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-accent/20",
      "flex flex-col items-center justify-center overflow-hidden",
      "transition-all duration-800 ease-in-out",
      isComplete && "opacity-0 scale-95 blur-md"
    )}>
      {/* الجسيمات المتحركة */}
      <div className="anime-particles absolute inset-0 pointer-events-none z-10" />
      
      {/* إطار الأنمي */}
      <div className="absolute top-12 left-12 w-15 h-15 border-2 border-primary rounded-lg 
                      flex items-center justify-center bg-primary/10 text-2xl text-primary
                      animate-pulse">
        📺
      </div>

      {/* حاوية الشعار */}
      <div className="relative z-20 mb-15 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-3 
                       animate-glow drop-shadow-glow">
          أنمي سلاير
        </h1>
        <p className="text-xl text-primary font-light tracking-wider opacity-80">
          موقع الأنمي الأول في العالم العربي
        </p>
      </div>

      {/* دائرة التحميل */}
      <div className="relative w-30 h-30 mb-10">
        <div className="absolute inset-0 rounded-full border-3 border-transparent 
                        border-t-primary animate-spin" 
             style={{ animationDuration: '1.2s' }} />
        <div className="absolute inset-0 rounded-full border-3 border-transparent 
                        border-b-accent animate-spin" 
             style={{ animationDuration: '1.8s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 rounded-full border-3 border-transparent 
                        border-l-anime-purple animate-spin" 
             style={{ animationDuration: '2.4s' }} />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* نص التحميل */}
      <div className="text-2xl text-foreground text-center mb-8 animate-pulse">
        {isComplete ? 'مرحباً بك في أنمي سلاير! 🎉' : currentStepData.text}
      </div>

      {/* شريط التقدم */}
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-hero rounded-full transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                            animate-shimmer" />
          </div>
        </div>
        <p className="text-primary font-medium">
          {isComplete ? 'جاهز للمشاهدة' : currentStepData.progress}
        </p>
      </div>

      {/* النقاط المتحركة */}
      <div className="flex gap-2 mt-5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>

      {/* أيقونة الأنمي */}
      <div className="absolute bottom-12 right-12 text-6xl text-primary opacity-80 animate-float">
        🎭
      </div>
      
      {/* معلومات التذييل */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 
                      text-sm text-muted-foreground text-center">
        الإصدار 2.0 - تجربة مشاهدة محسنة
      </div>

    </div>
  );
}