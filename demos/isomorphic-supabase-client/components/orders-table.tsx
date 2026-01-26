import { getOrders } from "@/lib/data/getOrders";
import { getDrinks } from "@/lib/data/getDrinks";
import { OrdersTableClient } from "@/components/orders-table-client";

export async function OrdersTable({
  searchParams,
}: {
  searchParams: Promise<{ pending?: string }>;
}) {
  const { pending } = await searchParams;
  const pendingOnly = pending === "true";

  const [{ orders, error: ordersError }, { drinks, error: drinksError }] =
    await Promise.all([getOrders({ pendingOnly }), getDrinks()]);

  if (ordersError) {
    return (
      <div className="text-red-500 p-4">
        Failed to load orders: {ordersError.message}
      </div>
    );
  }

  if (drinksError) {
    return (
      <div className="text-red-500 p-4">
        Failed to load drinks: {drinksError.message}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-muted-foreground p-4 text-center">
        {pendingOnly ? "No pending orders" : "No orders found"}
      </div>
    );
  }

  return <OrdersTableClient orders={orders} drinks={drinks ?? []} />;
}
