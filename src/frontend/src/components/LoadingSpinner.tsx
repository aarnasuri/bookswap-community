import { BookOpen } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({
  message = "Loading…",
  fullPage = false,
}: LoadingSpinnerProps) {
  const inner = (
    <div
      className="flex flex-col items-center gap-3 text-muted-foreground animate-fade-in"
      data-ocid="loading-spinner"
    >
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <div className="absolute inset-2 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        {inner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{inner}</div>;
}
