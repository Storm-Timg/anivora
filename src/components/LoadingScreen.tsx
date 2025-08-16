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
    // إضافة الأنيميشن المخصص للمعان الدائري
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer-circle {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
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
        
        {/* تأثير اللمعان الدائري حول الصورة */}
        {showShimmer && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 border-4 border-transparent 
                           border-t-white/60 border-r-white/20 rounded-full
                           animate-[shimmer-circle_2s_linear]" />
          </div>
        )}
      </div>
      
    </div>
  );
}