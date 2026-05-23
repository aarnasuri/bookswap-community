import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ChatThread, Message } from "../types";

type ActorMethods = Record<string, (...args: unknown[]) => Promise<unknown>>;

export function useMyChatThreads() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ChatThread[]>({
    queryKey: ["myChatThreads"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as ActorMethods
        ).getMyChatThreads?.();
        return (result as ChatThread[]) ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 8000,
  });
}

export function useChatMessages(threadId: string | bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const tid = threadId ? BigInt(threadId.toString()) : undefined;

  return useQuery<Message[]>({
    queryKey: ["chatMessages", tid?.toString()],
    queryFn: async () => {
      if (!actor || tid === undefined) return [];
      try {
        const result = await (
          actor as unknown as ActorMethods
        ).getChatMessages?.(tid);
        return (result as Message[]) ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching && tid !== undefined,
    refetchInterval: 3000,
  });
}

export function useGetOrCreateChatThread() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as ActorMethods).getOrCreateChatThread?.(
        requestId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myChatThreads"] });
    },
  });
}

export function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { threadId: bigint; content: string }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as ActorMethods).sendMessage?.(
        params.threadId,
        params.content,
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chatMessages", variables.threadId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["myChatThreads"] });
    },
  });
}
