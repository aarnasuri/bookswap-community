import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createActor } from "../backend";

const SESSION_KEY = "bookbank_session_token";
const EMAIL_KEY = "bookbank_email";

export interface AuthUser {
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  sessionToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

// Context + Provider exported from here; used in main.tsx
import { type ReactNode, createElement } from "react";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  sessionToken: null,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(() =>
    localStorage.getItem(SESSION_KEY),
  );
  const [email, setEmail] = useState<string | null>(() =>
    localStorage.getItem(EMAIL_KEY),
  );
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  // Keep state in sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === SESSION_KEY) setSessionToken(e.newValue);
      if (e.key === EMAIL_KEY) setEmail(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(
    async (emailArg: string, password: string) => {
      if (!actor) throw new Error("Service unavailable. Please try again.");
      const result = await actor.login(emailArg, password);
      if (result.__kind__ === "err") {
        throw new Error("Email or password is incorrect.");
      }
      const token = result.ok;
      localStorage.setItem(SESSION_KEY, token);
      localStorage.setItem(EMAIL_KEY, emailArg);
      setSessionToken(token);
      setEmail(emailArg);
    },
    [actor],
  );

  const logout = useCallback(async () => {
    if (actor && sessionToken) {
      try {
        await actor.signOut(sessionToken);
      } catch {
        // ignore
      }
    }
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setSessionToken(null);
    setEmail(null);
    queryClient.clear();
  }, [actor, sessionToken, queryClient]);

  const register = useCallback(
    async (emailArg: string, password: string) => {
      if (!actor) throw new Error("Service unavailable. Please try again.");
      const result = await actor.register(emailArg, password);
      if (result.__kind__ === "err") {
        if (
          result.err.toLowerCase().includes("already") ||
          result.err.toLowerCase().includes("exist")
        ) {
          throw new Error("Email already registered. Sign in instead.");
        }
        throw new Error(result.err);
      }
      const token = result.ok;
      localStorage.setItem(SESSION_KEY, token);
      localStorage.setItem(EMAIL_KEY, emailArg);
      setSessionToken(token);
      setEmail(emailArg);
    },
    [actor],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: email ? { email } : null,
      sessionToken,
      isLoggedIn: !!sessionToken,
      login,
      logout,
      register,
    }),
    [email, sessionToken, login, logout, register],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
