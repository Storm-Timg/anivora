import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loading({ className, size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-transparent bg-gradient-hero",
        "before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent before:bg-gradient-hero before:mask-radial-gradient",
        sizeClasses[size]
      )}>
        <div className="w-full h-full rounded-full bg-background"></div>
      </div>
      {text && (
        <p className="text-muted-foreground text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-3 bg-muted rounded w-3/4"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-muted rounded w-16"></div>
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
        <div className="flex gap-1">
          <div className="h-6 bg-muted rounded w-12"></div>
          <div className="h-6 bg-muted rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}