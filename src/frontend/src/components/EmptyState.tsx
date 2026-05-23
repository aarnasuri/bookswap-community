import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-center animate-fade-in"
      data-ocid="empty-state"
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="font-display font-semibold text-foreground text-lg">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button size="sm" onClick={action.onClick} data-ocid="empty-state-cta">
          {action.label}
        </Button>
      )}
    </div>
  );
}
