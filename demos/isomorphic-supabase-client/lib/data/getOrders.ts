import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/db.types";

interface OrderDrink
  extends Pick<
    Tables<"order_drinks">,
    "id" | "size" | "unit_price" | "quantity" | "drink_id"
  > {
  drinks: Pick<Tables<"drinks">, "name"> | null;
}

export interface OrderWithDrinks extends Tables<"orders"> {
  order_drinks: OrderDrink[];
}

export type GetOrdersOptions = {
  pendingOnly?: boolean;
  limit?: number;
};

export async function getOrders(
  options: GetOrdersOptions = {},
): Promise<{ orders: OrderWithDrinks[] | null; error: Error | null }> {
  const { pendingOnly = false, limit = 10 } = options;
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select(
      `
      id,
      name,
      status,
      created_at,
      order_drinks (
        id,
        drink_id,
        quantity,
        size,
        unit_price,
        drinks (
          name
        )
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (pendingOnly) {
    query = query.eq("status", "pending");
  }

  const { data, error } = await query;

  if (error) {
    return { orders: null, error: new Error(error.message) };
  }

  return { orders: data as OrderWithDrinks[], error: null };
}
