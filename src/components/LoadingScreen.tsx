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
    'تحميل التطبيق...',
    'تحضير قاعدة البيانات...',
    'التحقق من الاتصال...',
    'جاهز للمشاهدة!'
  ];

  useEffect(() => {
    // إنشاء جسيمات بسيطة وأنيقة
    const createSimpleParticles = () => {
      const container = document.querySelector('.particles');
      if (!container) return;
      
      const particleCount = 15;
      container.innerHTML = '';
      
      for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          const isBlue = Math.random() > 0.5;
          
          particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: ${isBlue ? 'rgba(52, 152, 219, 0.5)' : 'rgba(255, 138, 101, 0.5)'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: float 6s linear infinite;
            animation-delay: ${Math.random() * 6}s;
          `;
          container.appendChild(particle);
        }, i * 300);
      }
    };

    createSimpleParticles();

    // محاكاة التحميل
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 12 + 8;
          const newProgress = Math.min(prev + increment, 100);
          
          // تحديث النص حسب التقدم
          if (newProgress > 25 && currentStep < 1) {
            setCurrentStep(1);
          } else if (newProgress > 50 && currentStep < 2) {
            setCurrentStep(2);
          } else if (newProgress > 75 && currentStep < 3) {
            setCurrentStep(3);
          }
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            
            setTimeout(() => {
              onLoadingComplete();
            }, 1000);
          }
          
          return newProgress;
        });
      }, 150);
    }, 2000);
  }, [currentStep, onLoadingComplete]);

  useEffect(() => {
    // إضافة الأنماط البسيطة
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes logoAppear {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes subtitleAppear {
        to {
          opacity: 1;
        }
      }
      
      @keyframes textAppear {
        to {
          opacity: 1;
        }
      }
      
      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: scale(0.98);
        }
      }
      
      @keyframes glow {
        from {
          box-shadow: 0 0 20px rgba(255, 138, 101, 0.5);
        }
        to {
          box-shadow: 0 0 40px rgba(52, 152, 219, 0.8);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className={cn(
      "fixed inset-0 z-50 overflow-hidden",
      "flex flex-col items-center justify-center",
      "transition-all duration-1000 ease-in-out",
      "bg-gradient-to-br from-black via-blue-900/20 to-blue-800/10",
      isComplete && "opacity-0 scale-[0.98]"
    )}>
      {/* خطوط هندسية بسيطة */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-48 h-0.5 top-[20%] left-[10%] bg-gradient-to-r from-orange-400 to-blue-500 
                        opacity-0 animate-[slideIn_2s_ease-out_0.5s_forwards] shadow-sm" />
        <div className="absolute w-36 h-0.5 top-[25%] right-[15%] bg-gradient-to-r from-orange-400 to-blue-500 
                        opacity-0 animate-[slideIn_2s_ease-out_1s_forwards] shadow-sm" />
        <div className="absolute w-0.5 h-24 bottom-[30%] left-[20%] bg-gradient-to-b from-orange-400 to-blue-500 
                        opacity-0 animate-[slideIn_2s_ease-out_1.5s_forwards] shadow-sm" />
        <div className="absolute w-0.5 h-20 bottom-[35%] right-[25%] bg-gradient-to-b from-orange-400 to-blue-500 
                        opacity-0 animate-[slideIn_2s_ease-out_2s_forwards] shadow-sm" />
      </div>
      
      {/* الجسيمات البسيطة */}
      <div className="particles absolute inset-0 pointer-events-none" />
      
      {/* الشعار الرئيسي */}
      <div className="relative z-20 mb-8 text-center">
        <h1 className="font-black text-8xl md:text-9xl text-transparent 
                       bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text
                       opacity-0 transform translate-y-8 animate-[logoAppear_1.5s_ease-out_1s_forwards]
                       tracking-[0.3em] drop-shadow-2xl">
          Anivora
        </h1>
      </div>

      {/* العنوان الفرعي */}
      <div className="relative z-20 mb-12">
        <p className="text-2xl text-gray-300 font-light
                      opacity-0 animate-[subtitleAppear_1.5s_ease-out_1.5s_forwards]">
          موقع الأنمي الأول في العالم العربي
        </p>
      </div>

      {/* شريط التحميل */}
      <div className="relative z-20 w-full max-w-sm mb-8">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-orange-400/20">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-blue-500 rounded-full transition-all duration-300
                       shadow-[0_0_10px_rgba(255,138,101,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* نص التحميل */}
      <div className="relative z-20 text-center">
        <p className="text-lg text-white font-normal
                      opacity-0 animate-[textAppear_1s_ease-out_2s_forwards]">
          {loadingSteps[currentStep]}
        </p>
      </div>
    </div>
  );
}