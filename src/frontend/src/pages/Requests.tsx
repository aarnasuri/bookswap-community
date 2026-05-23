import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Inbox,
  MessageCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "../components/EmptyState";
import {
  useAcceptBookRequest,
  useDeclineBookRequest,
  useMyRequestInbox,
  useMyRequests,
} from "../hooks/useRequests";
import type { BookRequest, RequestStatus } from "../types";

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  RequestStatus,
  { label: string; className: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pending",
    className: "bg-primary text-primary-foreground border-border",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    className: "bg-secondary text-secondary-foreground border-border",
    icon: CheckCircle,
  },
  declined: {
    label: "Declined",
    className: "bg-destructive text-destructive-foreground border-border",
    icon: XCircle,
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const diff = Date.now() - ms;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function RequestSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card rounded-lg border border-border p-4 flex items-start gap-3"
        >
          <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ── Outgoing request card ─────────────────────────────────────────────────────

function SentRequestCard({ request }: { request: BookRequest }) {
  const navigate = useNavigate();
  const cfg = STATUS_CONFIG[request.status];
  const StatusIcon = cfg.icon;

  return (
    <div
      className="bg-card rounded-lg border border-border p-4 flex items-start gap-3 shadow-warm-sm transition-colors hover:border-border"
      data-ocid="sent-request-card"
    >
      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <BookOpen className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground text-sm leading-snug truncate">
          {request.bookTitle}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Owner:{" "}
          <span className="font-medium text-foreground">
            {request.ownerName ?? "Community member"}
          </span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Requested · {formatDate(request.createdAt)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${cfg.className}`}
        >
          <StatusIcon className="w-3 h-3" />
          {cfg.label}
        </span>
        {request.status === "accepted" && (
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2 gap-1 border-border text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate({ to: "/messages" })}
            data-ocid="sent-request-open-chat-btn"
          >
            <MessageCircle className="w-3 h-3" />
            Open Chat
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Incoming request card ─────────────────────────────────────────────────────

function IncomingRequestCard({ request }: { request: BookRequest }) {
  const navigate = useNavigate();
  const acceptMutation = useAcceptBookRequest();
  const declineMutation = useDeclineBookRequest();
  const cfg = STATUS_CONFIG[request.status];
  const StatusIcon = cfg.icon;

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(request.id);
      toast.success("Request accepted! A chat thread has been opened.");
    } catch {
      toast.error("Couldn't accept the request. Please try again.");
    }
  };

  const handleDecline = async () => {
    try {
      await declineMutation.mutateAsync(request.id);
      toast.info("Request declined.");
    } catch {
      toast.error("Couldn't decline the request. Please try again.");
    }
  };

  const isActing = acceptMutation.isPending || declineMutation.isPending;

  return (
    <div
      className="bg-card rounded-lg border border-border p-4 flex items-start gap-3 shadow-warm-sm transition-colors hover:border-border"
      data-ocid="incoming-request-card"
    >
      <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
        <Inbox className="w-4 h-4 text-accent-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground text-sm leading-snug truncate">
          {request.bookTitle}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          From:{" "}
          <span className="font-medium text-foreground">
            {request.requesterName ?? "A reader"}
          </span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDate(request.createdAt)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${cfg.className}`}
        >
          <StatusIcon className="w-3 h-3" />
          {cfg.label}
        </span>

        {request.status === "pending" && (
          <div className="flex gap-1.5">
            <Button
              size="sm"
              className="h-6 text-xs px-2"
              onClick={handleAccept}
              disabled={isActing}
              data-ocid="incoming-request-accept-btn"
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2"
              onClick={handleDecline}
              disabled={isActing}
              data-ocid="incoming-request-decline-btn"
            >
              Decline
            </Button>
          </div>
        )}

        {request.status === "accepted" && (
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2 gap-1 border-border text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate({ to: "/messages" })}
            data-ocid="incoming-request-open-chat-btn"
          >
            <MessageCircle className="w-3 h-3" />
            Open Chat
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RequestsPage() {
  const {
    data: sentRequests = [],
    isLoading: sentLoading,
    isError: sentError,
  } = useMyRequests();

  const {
    data: incomingRequests = [],
    isLoading: incomingLoading,
    isError: incomingError,
  } = useMyRequestInbox();

  const pendingInboxCount = incomingRequests.filter(
    (r) => r.status === "pending",
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
          My Requests
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Books you've requested and requests received for your books
        </p>
      </div>

      <Tabs defaultValue="sent" data-ocid="requests-tabs">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger
            value="sent"
            className="gap-1.5 flex-1 sm:flex-none"
            data-ocid="requests-tab-sent"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Sent Requests
            {sentRequests.length > 0 && (
              <Badge className="ml-1 h-4 px-1.5 text-[10px] bg-primary text-primary-foreground border-0 rounded-full">
                {sentRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="incoming"
            className="gap-1.5 flex-1 sm:flex-none"
            data-ocid="requests-tab-incoming"
          >
            <Inbox className="w-3.5 h-3.5" />
            Incoming
            {pendingInboxCount > 0 && (
              <Badge className="ml-1 h-4 px-1.5 text-[10px] bg-accent text-accent-foreground border-0 rounded-full">
                {pendingInboxCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── Sent ── */}
        <TabsContent value="sent" data-ocid="requests-sent-list">
          {sentLoading ? (
            <RequestSkeleton />
          ) : sentError ? (
            <EmptyState
              icon={<XCircle className="w-8 h-8 text-destructive" />}
              title="Couldn't load your requests"
              description="Something went wrong. Please refresh the page to try again."
            />
          ) : sentRequests.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="w-8 h-8" />}
              title="No requests sent yet"
              description="Browse the community library and request books you'd like to borrow."
            />
          ) : (
            <div className="flex flex-col gap-3">
              {sentRequests.map((r) => (
                <SentRequestCard key={String(r.id)} request={r} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Incoming ── */}
        <TabsContent value="incoming" data-ocid="requests-incoming-list">
          {incomingLoading ? (
            <RequestSkeleton />
          ) : incomingError ? (
            <EmptyState
              icon={<XCircle className="w-8 h-8 text-destructive" />}
              title="Couldn't load incoming requests"
              description="Something went wrong. Please refresh the page to try again."
            />
          ) : incomingRequests.length === 0 ? (
            <EmptyState
              icon={<Inbox className="w-8 h-8" />}
              title="No incoming requests"
              description="When someone requests one of your books, it will appear here."
            />
          ) : (
            <div className="flex flex-col gap-3">
              {incomingRequests.map((r) => (
                <IncomingRequestCard key={String(r.id)} request={r} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
