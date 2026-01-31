import { supabaseClient } from "@/src/shared/lib/supabaseClient";

interface InserUserRequest {
  id: string;
  names: string;
}

export const userService = async (request: InserUserRequest) => {
  const { data, error } = await supabaseClient.from("users").insert(request);

  if (error) {
    throw error;
  }

  return data;
};
