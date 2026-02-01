"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { getUserAction } from "@/src/shared/actions/getUserAction";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserAction();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,
  };
};
