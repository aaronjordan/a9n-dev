import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/db.types";

export type Drink = Pick<Tables<"drinks">, "id" | "name" | "base_price">;

export async function getDrinks(): Promise<{
  drinks: Drink[] | null;
  error: Error | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("drinks")
    .select("id, name, base_price")
    .order("name");

  if (error) {
    return { drinks: null, error: new Error(error.message) };
  }

  return { drinks: data, error: null };
}
