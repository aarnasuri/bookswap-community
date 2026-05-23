import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-center animate-fade-in"
      data-ocid="error-state"
    >
      <div className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-foreground text-lg">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          data-ocid="error-retry-btn"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
