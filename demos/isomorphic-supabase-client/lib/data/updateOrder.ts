"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Database } from "@/lib/supabase/db.types";

type OrderStatus = Database["public"]["Enums"]["order_status"];
type Size = Database["public"]["Enums"]["size"];

export type OrderItemInput = {
  id?: number; // undefined = new item
  drink_id: number;
  size: Size;
  quantity: number;
  unit_price: number;
  _delete?: boolean; // mark for deletion
};

export type UpdateOrderInput = {
  orderId: number;
  name: string;
  status: OrderStatus;
  items: OrderItemInput[];
};

export async function updateOrder(
  input: UpdateOrderInput,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Update the order itself
  const { error: orderError } = await supabase
    .from("orders")
    .update({
      name: input.name,
      status: input.status,
    })
    .eq("id", input.orderId);

  if (orderError) {
    return { success: false, error: orderError.message };
  }

  // Process items: delete, update, or insert
  const toDelete = input.items.filter((item) => item._delete && item.id);
  const toUpdate = input.items.filter(
    (item) => !item._delete && item.id !== undefined,
  );
  const toInsert = input.items.filter(
    (item) => !item._delete && item.id === undefined,
  );

  // Delete items marked for deletion
  if (toDelete.length > 0) {
    const deleteIds = toDelete.map((item) => item.id!);
    const { error: deleteError } = await supabase
      .from("order_drinks")
      .delete()
      .in("id", deleteIds);

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }
  }

  // Update existing items
  for (const item of toUpdate) {
    const { error: updateError } = await supabase
      .from("order_drinks")
      .update({
        drink_id: item.drink_id,
        size: item.size,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })
      .eq("id", item.id!);

    if (updateError) {
      return { success: false, error: updateError.message };
    }
  }

  // Insert new items
  if (toInsert.length > 0) {
    const newItems = toInsert.map((item) => ({
      order_id: input.orderId,
      drink_id: item.drink_id,
      size: item.size,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }));

    const { error: insertError } = await supabase
      .from("order_drinks")
      .insert(newItems);

    if (insertError) {
      return { success: false, error: insertError.message };
    }
  }

  revalidatePath("/");

  return { success: true };
}
