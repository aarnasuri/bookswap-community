import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { BookRequest } from "../types";

type ActorMethods = Record<string, (...args: unknown[]) => Promise<unknown>>;

export function useMyRequests() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<BookRequest[]>({
    queryKey: ["myRequests"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as ActorMethods
        ).getMyRequests?.();
        return (result as BookRequest[]) ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useMyRequestInbox() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<BookRequest[]>({
    queryKey: ["myRequestInbox"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as ActorMethods
        ).getMyRequestInbox?.();
        return (result as BookRequest[]) ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSendBookRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as ActorMethods).sendBookRequest?.(bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequests"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    },
  });
}

export function useAcceptBookRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as ActorMethods).acceptBookRequest?.(requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequestInbox"] });
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
      queryClient.invalidateQueries({ queryKey: ["myChatThreads"] });
    },
  });
}

export function useDeclineBookRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as ActorMethods).declineBookRequest?.(requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequestInbox"] });
    },
  });
}
