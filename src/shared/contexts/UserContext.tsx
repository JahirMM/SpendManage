"use client";

import { createContext, useContext, ReactNode } from "react";
import { useUser } from "@/src/shared/hooks/useUser";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, error, refetch } = useUser();

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error: error as Error | null,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext debe usarse dentro de UserProvider");
  }

  return context;
}
