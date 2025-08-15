import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [showShimmer, setShowShimmer] = useState(true);
  const [showPulse, setShowPulse] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // إضافة الأنيميشن المخصص للـ shimmer
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% {
          transform: translateX(-100%) skewX(-12deg);
        }
        100% {
          transform: translateX(150%) skewX(-12deg);
        }
      }
    `;
    document.head.appendChild(style);

    // الخطوة الأولى: تأثير اللمعان
    const shimmerTimeout = setTimeout(() => {
      setShowShimmer(false);
      setShowPulse(true);
    }, 2000);

    // الخطوة الثانية: تأثير النبض
    const pulseTimeout = setTimeout(() => {
      setShowPulse(false);
      setIsComplete(true);
    }, 4000);

    // الخطوة الثالثة: الانتقال للتطبيق
    const completeTimeout = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => {
      clearTimeout(shimmerTimeout);
      clearTimeout(pulseTimeout);
      clearTimeout(completeTimeout);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [onLoadingComplete]);

  return (
    <div className={cn(
      "fixed inset-0 z-50 overflow-hidden",
      "flex items-center justify-center",
      "bg-gradient-to-br from-background via-background/90 to-background/80",
      "transition-all duration-1000 ease-in-out",
      isComplete && "opacity-0 scale-95"
    )}>
      {/* الصورة الرئيسية */}
      <div className="relative">
        <img 
          src="/lovable-uploads/f8e62a45-fe18-45c5-8a7b-5ec407ace9e0.png"
          alt="Anivora Logo"
          className={cn(
            "w-64 h-64 md:w-80 md:h-80 object-contain",
            "transition-all duration-1000 ease-in-out",
            showPulse && "animate-pulse-glow scale-110",
            isComplete && "scale-125 opacity-75"
          )}
        />
        
        {/* تأثير اللمعان المار */}
        {showShimmer && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                           animate-[shimmer_2s_ease-in-out] transform -skew-x-12" />
          </div>
        )}
        
        {/* هالة متوهجة أثناء النبض */}
        {showPulse && (
          <div className="absolute inset-0 -m-8">
            <div className="w-full h-full rounded-full bg-primary/20 blur-xl animate-pulse" />
          </div>
        )}
      </div>
      
    </div>
  );
}