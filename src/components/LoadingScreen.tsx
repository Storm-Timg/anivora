import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Zap, Rocket, Crown, Sword } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const loadingSteps = [
    { text: '🚀 إشعال المحركات...', progress: 'تدمير الحواجز', icon: Rocket },
    { text: '⚡ تفجير الطاقة...', progress: 'كسر القيود', icon: Zap },
    { text: '👑 تجهيز العرش...', progress: 'قيادة الأساطير', icon: Crown },
    { text: '⚔️ شحذ السيوف...', progress: 'الاستعداد للمعركة', icon: Sword },
    { text: '🔥 إطلاق الجحيم...', progress: 'لا رحمة للأعداء', icon: Zap },
    { text: '💀 السيطرة المطلقة...', progress: 'أنت الملك الآن', icon: Crown }
  ];

  useEffect(() => {
    // إنشاء جسيمات مجنونة ومتفجرة
    const createInsaneParticles = () => {
      const container = document.querySelector('.anime-particles');
      if (!container) return;
      
      const particleCount = 50; // جسيمات أكثر للجنون
      container.innerHTML = '';
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const colors = ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          animation: explodeFloat ${Math.random() * 3 + 2}s infinite linear;
          animation-delay: ${Math.random() * 5}s;
          opacity: 0.8;
          box-shadow: 0 0 15px ${color}, 0 0 30px ${color};
          filter: brightness(1.5);
        `;
        container.appendChild(particle);
      }
      
      // إضافة نجوم متفجرة
      for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.cssText = `
          position: absolute;
          font-size: ${Math.random() * 15 + 10}px;
          left: ${Math.random() * 100}%;
          animation: starExplode ${Math.random() * 4 + 3}s infinite ease-in-out;
          animation-delay: ${Math.random() * 6}s;
          opacity: 0.9;
          filter: drop-shadow(0 0 10px #ffbe0b);
        `;
        container.appendChild(star);
      }
    };

    createInsaneParticles();

    // محاكاة التحميل المطورة
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 1.5 + 0.8;
        const newProgress = Math.min(prev + increment, 100);
        
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setShowExplosion(true);
          
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 1500);
          }, 1000);
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

    // إضافة الأنماط المجنونة
    const style = document.createElement('style');
    style.textContent = `
      @keyframes megaRipple {
        to {
          transform: scale(5);
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
      
      @keyframes explodeFloat {
        0% {
          transform: translateY(100vh) rotate(0deg) scale(0.5);
          opacity: 0;
        }
        20% {
          opacity: 1;
          transform: translateY(80vh) rotate(90deg) scale(1.2);
        }
        50% {
          transform: translateY(40vh) rotate(180deg) scale(1.5);
          opacity: 1;
        }
        80% {
          transform: translateY(10vh) rotate(270deg) scale(1);
          opacity: 0.8;
        }
        100% {
          transform: translateY(-20vh) rotate(360deg) scale(0.3);
          opacity: 0;
        }
      }
      
      @keyframes starExplode {
        0% {
          transform: translateY(100vh) rotate(0deg) scale(0.5);
          opacity: 0;
        }
        25% {
          opacity: 1;
          transform: translateY(75vh) rotate(180deg) scale(2);
        }
        50% {
          transform: translateY(50vh) rotate(360deg) scale(1.5);
          opacity: 1;
        }
        75% {
          transform: translateY(25vh) rotate(540deg) scale(2.5);
          opacity: 0.8;
        }
        100% {
          transform: translateY(-10vh) rotate(720deg) scale(0.2);
          opacity: 0;
        }
      }
      
      @keyframes finalExplosion {
        0% {
          transform: scale(0) rotate(0deg);
          opacity: 0;
        }
        50% {
          transform: scale(3) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: scale(8) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes insaneShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-10px) rotate(-2deg); }
        20% { transform: translateX(10px) rotate(2deg); }
        30% { transform: translateX(-8px) rotate(-1deg); }
        40% { transform: translateX(8px) rotate(1deg); }
        50% { transform: translateX(-6px) rotate(-0.5deg); }
        60% { transform: translateX(6px) rotate(0.5deg); }
        70% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
        90% { transform: translateX(-2px); }
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
      "fixed inset-0 z-50 overflow-hidden",
      "flex flex-col items-center justify-center",
      "transition-all duration-1000 ease-in-out",
      "bg-gradient-to-br from-black via-purple-900 to-black",
      isComplete && "opacity-0 scale-90 blur-sm",
      showExplosion && "animate-[insaneShake_0.5s_ease-in-out]"
    )}>
      {/* الجسيمات المجنونة */}
      <div className="anime-particles absolute inset-0 pointer-events-none z-10" />
      
      {/* تأثيرات الخلفية المتفجرة */}
      <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-purple-500/10 to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/15 via-transparent to-cyan-500/10 animate-ping" />
      
      {/* إطار مجنون */}
      <div className="absolute top-8 left-8 w-24 h-24 border-4 border-red-500 rounded-2xl 
                      flex items-center justify-center bg-gradient-to-r from-purple-600 to-red-600 p-2
                      shadow-[0_0_50px_red] animate-[cyber-spin_2s_ease-in-out_infinite]">
        <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center text-4xl animate-bounce">
          🎮
        </div>
      </div>
      
      {/* رمز الانفجار */}
      <div className="absolute top-8 right-8 w-24 h-24 border-4 border-yellow-500 rounded-2xl 
                      flex items-center justify-center bg-gradient-to-r from-orange-600 to-yellow-600 p-2
                      shadow-[0_0_50px_yellow] animate-[cyber-spin_1.5s_ease-in-out_infinite_reverse]">
        <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center text-4xl animate-pulse">
          💥
        </div>
      </div>

      {/* انفجار نهائي */}
      {showExplosion && (
        <div className="absolute inset-0 z-30">
          <div className="absolute inset-0 bg-gradient-radial from-white via-yellow-400 to-red-500 
                          animate-[finalExplosion_1s_ease-out] opacity-80" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                          text-9xl animate-[finalExplosion_1s_ease-out]">
            💥🔥💥
          </div>
        </div>
      )}

      {/* الشعار المجنون */}
      <div className={cn(
        "relative z-20 mb-20 text-center",
        showExplosion && "animate-[insaneShake_0.3s_ease-in-out]"
      )}>
        <h1 className="font-orbitron text-7xl md:text-8xl font-black text-transparent 
                       bg-gradient-to-r from-red-500 via-purple-500 via-blue-500 to-cyan-500 
                       bg-clip-text mb-6 animate-pulse-glow drop-shadow-2xl
                       filter drop-shadow-[0_0_30px_#ff006e]">
          🔥 أنمي سلاير 🔥
        </h1>
        <div className="relative">
          <p className="font-electrolize text-3xl text-red-400 font-bold tracking-[0.4em] 
                         opacity-90 animate-neon-flicker filter drop-shadow-[0_0_20px_#ff0040]">
            👑 إمبراطورية الأنمي 👑
          </p>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-2 
                          bg-gradient-to-r from-red-500 to-purple-500 rounded-full animate-pulse 
                          shadow-[0_0_20px_#ff006e]" />
        </div>
      </div>

      {/* دوائر التحميل المتفجرة */}
      <div className={cn(
        "relative w-48 h-48 mb-16",
        showExplosion && "animate-[insaneShake_0.2s_ease-in-out_infinite]"
      )}>
        {/* حلقات دوارة مجنونة */}
        <div className="absolute inset-0 rounded-full border-8 border-transparent 
                        border-t-red-500 border-r-red-400 animate-spin 
                        shadow-[0_0_40px_red]" 
             style={{ animationDuration: '0.8s' }} />
        <div className="absolute inset-3 rounded-full border-6 border-transparent 
                        border-b-purple-500 border-l-purple-400 animate-spin 
                        shadow-[0_0_30px_purple]" 
             style={{ animationDuration: '1.2s', animationDirection: 'reverse' }} />
        <div className="absolute inset-6 rounded-full border-4 border-transparent 
                        border-l-blue-500 border-t-cyan-400 animate-spin
                        shadow-[0_0_20px_blue]" 
             style={{ animationDuration: '1.6s' }} />
        
        {/* المركز المتفجر */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CurrentIcon className="w-12 h-12 text-red-400 mb-3 animate-bounce 
                                  filter drop-shadow-[0_0_15px_#ff0040]" />
          <span className="font-russo text-4xl font-black text-white animate-pulse
                           filter drop-shadow-[0_0_10px_#ffffff]">
            {Math.round(progress)}%
          </span>
          {showExplosion && (
            <div className="absolute text-6xl animate-ping">💥</div>
          )}
        </div>
        
        {/* هالة متفجرة */}
        <div className="absolute -inset-8 rounded-full bg-gradient-radial 
                        from-red-500/30 via-purple-500/20 to-transparent 
                        blur-sm animate-pulse" />
      </div>

      {/* النصوص المجنونة */}
      <div className={cn(
        "text-center mb-12 space-y-4",
        showExplosion && "animate-[insaneShake_0.1s_ease-in-out_infinite]"
      )}>
        <div className="font-russo text-4xl font-black text-transparent bg-gradient-to-r 
                        from-red-400 via-purple-400 to-cyan-400 bg-clip-text animate-pulse">
          {isComplete ? (
            <span className="filter drop-shadow-[0_0_20px_#ff006e]">
              🎯 السيطرة المطلقة! 🎯
            </span>
          ) : showExplosion ? (
            <span className="filter drop-shadow-[0_0_20px_#ff006e]">
              💀 تدمير شامل! 💀
            </span>
          ) : (
            currentStepData.text
          )}
        </div>
        <div className="font-electrolize text-xl text-purple-300 font-bold">
          {isComplete ? '🔥 أنت المَلِك الآن! 🔥' : showExplosion ? '⚡ انفجار نووي! ⚡' : currentStepData.progress}
        </div>
      </div>

      {/* شريط التقدم المتفجر */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        <div className="w-full h-6 bg-black/50 rounded-full overflow-hidden border-2 border-red-500/50 
                        shadow-[0_0_30px_red]">
          <div 
            className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 
                       rounded-full transition-all duration-300 relative overflow-hidden
                       shadow-[0_0_20px_#ff006e]"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent
                            animate-shimmer" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/40 to-purple-400/40 animate-pulse" />
            {showExplosion && (
              <div className="absolute inset-0 bg-white animate-ping" />
            )}
          </div>
        </div>
      </div>

      {/* الكرات المجنونة */}
      <div className="flex gap-4 mt-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-purple-400 
                       animate-bounce shadow-[0_0_15px_red]"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* رموز الانفجار */}
      <div className="absolute bottom-12 right-12 text-8xl animate-float opacity-90 
                      filter drop-shadow-[0_0_20px_#ffbe0b]">
        🚀
      </div>
      
      <div className="absolute bottom-12 left-12 text-8xl animate-float opacity-90 
                      filter drop-shadow-[0_0_20px_#ff006e]">
        ⚡
      </div>
      
      {/* تذييل مجنون */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <div className="font-electrolize text-lg text-red-400/80 tracking-wider font-bold
                        filter drop-shadow-[0_0_10px_#ff0040]">
          🔥 الإصدار الأسطوري - لا رحمة للأعداء 🔥
        </div>
      </div>
    </div>
  );
}