import { O as useActor, Q as useQuery, S as useQueryClient, T as useMutation, V as createActor } from "./index-D8jmrdk6.js";
function useMyRequests() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myRequests"],
    queryFn: async () => {
      var _a;
      if (!actor) return [];
      try {
        const result = await ((_a = actor.getMyRequests) == null ? void 0 : _a.call(actor));
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching
  });
}
function useMyRequestInbox() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myRequestInbox"],
    queryFn: async () => {
      var _a;
      if (!actor) return [];
      try {
        const result = await ((_a = actor.getMyRequestInbox) == null ? void 0 : _a.call(actor));
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching
  });
}
function useSendBookRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookId) => {
      var _a;
      if (!actor) throw new Error("Actor not available");
      return (_a = actor.sendBookRequest) == null ? void 0 : _a.call(actor, bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequests"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    }
  });
}
function useAcceptBookRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId) => {
      var _a;
      if (!actor) throw new Error("Actor not available");
      return (_a = actor.acceptBookRequest) == null ? void 0 : _a.call(actor, requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequestInbox"] });
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
      queryClient.invalidateQueries({ queryKey: ["myChatThreads"] });
    }
  });
}
function useDeclineBookRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId) => {
      var _a;
      if (!actor) throw new Error("Actor not available");
      return (_a = actor.declineBookRequest) == null ? void 0 : _a.call(actor, requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequestInbox"] });
    }
  });
}
export {
  useMyRequestInbox as a,
  useAcceptBookRequest as b,
  useDeclineBookRequest as c,
  useSendBookRequest as d,
  useMyRequests as u
};
