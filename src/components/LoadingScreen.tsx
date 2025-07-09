import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Zap, Shield, Swords, Flame } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    { text: 'تحضير المعركة...', progress: 'اشحن طاقتك', icon: Zap },
    { text: 'تجميع القوى...', progress: 'استعد للقتال', icon: Shield },
    { text: 'شحن الأسلحة...', progress: 'جهز أدواتك', icon: Swords },
    { text: 'إطلاق القوة...', progress: 'انطلق بقوة', icon: Flame },
    { text: 'بداية الأسطورة...', progress: 'لحظات قليلة', icon: Zap },
    { text: 'مرحباً بالمحارب...', progress: 'أهلاً وسهلاً', icon: Shield }
  ];

  useEffect(() => {
    // إنشاء جسيمات بسيطة وقوية
    const createSimpleParticles = () => {
      const container = document.querySelector('.anime-particles');
      if (!container) return;
      
      const particleCount = 15; // قللنا العدد
      container.innerHTML = '';
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        particle.style.cssText = `
          position: absolute;
          width: 3px;
          height: 3px;
          background: hsl(var(--primary));
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          animation: float ${Math.random() * 2 + 4}s infinite linear;
          animation-delay: ${Math.random() * 4}s;
          opacity: 0.7;
          box-shadow: 0 0 8px hsl(var(--primary));
        `;
        container.appendChild(particle);
      }
    };

    createSimpleParticles();

    // محاكاة التحميل المطورة
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 1.5 + 0.8;
        const newProgress = Math.min(prev + increment, 100);
        
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          
          setTimeout(() => {
            onLoadingComplete();
          }, 2500);
        }
        
        return newProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  useEffect(() => {
    // تأثيرات تفاعلية متقدمة
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      // تأثير تحريك الخلفية
      const bgOffset = 15;
      document.body.style.backgroundPosition = 
        `${50 + (mouseX * bgOffset)}% ${50 + (mouseY * bgOffset)}%`;

      // تأثير الجسيمات التفاعلية
      const particles = document.querySelectorAll('.particle, .special-particle');
      particles.forEach((particle, index) => {
        const el = particle as HTMLElement;
        const factor = (index % 3 + 1) * 0.5;
        el.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
      });
    };

    // تأثير النقر المطور
    const handleClick = (e: MouseEvent) => {
      // تأثير التموج الأساسي
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 0, 110, 0.6) 0%, rgba(131, 56, 236, 0.4) 50%, transparent 70%);
        transform: scale(0);
        animation: megaRipple 1s ease-out;
        left: ${e.clientX - 50}px;
        top: ${e.clientY - 50}px;
        width: 100px;
        height: 100px;
        pointer-events: none;
        z-index: 9999;
      `;
      
      document.body.appendChild(ripple);
      
      // تأثير الشرر
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        
        spark.style.cssText = `
          position: fixed;
          width: 3px;
          height: 3px;
          background: linear-gradient(45deg, #ff006e, #06ffa5);
          border-radius: 50%;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          animation: sparkFly 0.8s ease-out forwards;
          transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px);
          opacity: 1;
          pointer-events: none;
          z-index: 9998;
        `;
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
          if (document.body.contains(spark)) {
            document.body.removeChild(spark);
          }
        }, 800);
      }
      
      setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    // إضافة الأنماط المطورة
    const style = document.createElement('style');
    style.textContent = `
      @keyframes megaRipple {
        to {
          transform: scale(3);
          opacity: 0;
        }
      }
      
      @keyframes sparkFly {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(var(--x, 0), var(--y, 0)) scale(0);
          opacity: 0;
        }
      }
      
      @keyframes starTwinkle {
        0%, 100% { opacity: 0.8; transform: scale(1) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
      }
      
      @keyframes specialFloat {
        0% {
          transform: translateY(100vh) rotate(0deg) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translateY(50vh) rotate(180deg) scale(1.2);
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg) scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const currentStepData = loadingSteps[currentStep];
  const CurrentIcon = currentStepData.icon;

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-gradient-cyber overflow-hidden",
      "flex flex-col items-center justify-center",
      "transition-all duration-1000 ease-in-out",
      isComplete && "opacity-0 scale-90 blur-sm"
    )}>
      {/* الجسيمات المتحركة المطورة */}
      <div className="anime-particles absolute inset-0 pointer-events-none z-10" />
      
      {/* تأثير الضوء الخلفي */}
      <div className="absolute inset-0 bg-gradient-pulse opacity-30 animate-pulse" />
      
      {/* إطار الأنمي المطور */}
      <div className="absolute top-8 left-8 w-20 h-20 border-2 border-primary rounded-xl 
                      flex items-center justify-center bg-gradient-neon p-1 animate-cyber-spin
                      shadow-cyber">
        <div className="w-full h-full bg-background/90 rounded-lg flex items-center justify-center text-3xl">
          📺
        </div>
      </div>

      {/* حاوية الشعار المطورة */}
      <div className="relative z-20 mb-16 text-center">
        <h1 className="font-orbitron text-8xl md:text-9xl font-black text-transparent 
                       bg-gradient-neon bg-clip-text mb-4 animate-pulse-glow
                       drop-shadow-2xl">
          أنمي سلاير
        </h1>
        <div className="relative">
          <p className="font-electrolize text-2xl text-primary font-bold tracking-[0.3em] 
                         opacity-90 animate-neon-flicker">
            موقع الأنمي الأول في العالم العربي
          </p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 
                          bg-gradient-neon rounded-full animate-pulse" />
        </div>
      </div>

      {/* دائرة التحميل الملحمية */}
      <div className="relative w-40 h-40 mb-12 animate-pulse-glow">
        {/* الحلقات الدوارة */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent 
                        border-t-primary border-r-primary/50 animate-spin shadow-neon" 
             style={{ animationDuration: '1s' }} />
        <div className="absolute inset-2 rounded-full border-4 border-transparent 
                        border-b-accent border-l-accent/50 animate-spin shadow-cyber" 
             style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-4 rounded-full border-4 border-transparent 
                        border-l-anime-purple border-t-anime-purple/50 animate-spin" 
             style={{ animationDuration: '2s' }} />
        
        {/* النسبة المئوية */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CurrentIcon className="w-8 h-8 text-primary mb-2 animate-bounce" />
          <span className="font-russo text-3xl font-bold text-foreground animate-pulse">
            {Math.round(progress)}%
          </span>
        </div>
        
        {/* تأثير الهالة */}
        <div className="absolute -inset-4 rounded-full bg-gradient-pulse opacity-50 blur-sm animate-pulse" />
      </div>

      {/* نص التحميل الملحمي */}
      <div className="text-center mb-10 space-y-3">
        <div className="font-russo text-3xl text-foreground animate-pulse">
          {isComplete ? (
            <span className="text-transparent bg-gradient-neon bg-clip-text">
              🔥 أهلاً بالمحارب! 🔥
            </span>
          ) : (
            currentStepData.text
          )}
        </div>
        <div className="font-electrolize text-lg text-primary/80">
          {isComplete ? 'استعد للمعركة' : currentStepData.progress}
        </div>
      </div>

      {/* شريط التقدم المطور */}
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        <div className="w-full h-3 bg-muted/20 rounded-full overflow-hidden border border-primary/30 shadow-cyber">
          <div 
            className="h-full bg-gradient-neon rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                            animate-shimmer" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* النقاط المتحركة البسيطة */}
      <div className="flex gap-3 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-primary animate-bounce shadow-neon"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>

      {/* رمز بسيط */}
      <div className="absolute bottom-8 right-8 text-6xl animate-float opacity-80">
        ⚡
      </div>
      
      {/* تذييل بسيط */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="font-electrolize text-sm text-primary/70 tracking-wider">
          الإصدار 3.0 - تحضير للمعركة
        </div>
      </div>
    </div>
  );
}