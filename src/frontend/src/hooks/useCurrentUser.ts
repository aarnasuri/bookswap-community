import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Profile, SaveProfileInput } from "../backend.d";
import { useAuth } from "./useAuth";

export function useCurrentUser() {
  const { user, sessionToken, isLoggedIn } = useAuth();
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const profileQuery = useQuery<Profile | null>({
    queryKey: ["currentUserProfile", sessionToken],
    queryFn: async () => {
      if (!actor || !sessionToken) return null;
      return actor.getCallerUserProfile(sessionToken);
    },
    enabled: !!actor && !actorFetching && !!sessionToken,
    retry: false,
  });

  return {
    user,
    isLoggedIn,
    sessionToken,
    profile: profileQuery.data ?? null,
    isLoadingProfile: actorFetching || profileQuery.isLoading,
    isProfileFetched: !!actor && profileQuery.isFetched,
    needsProfileSetup:
      isLoggedIn &&
      !profileQuery.isLoading &&
      profileQuery.isFetched &&
      profileQuery.data === null,
  };
}

export function useSaveProfile() {
  const { sessionToken } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SaveProfileInput) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      await actor.saveCallerUserProfile(sessionToken, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetUserProfile(userId: string | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Profile | null>({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getUserProfile(userId);
    },
    enabled: !!actor && !actorFetching && !!userId,
    retry: false,
  });
}
