"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { OrderWithDrinks } from "@/lib/data/getOrders";
import type { Drink } from "@/lib/data/getDrinks";
import { EditOrderDialog } from "@/components/edit-order-dialog";

function formatItems(orderDrinks: OrderWithDrinks["order_drinks"]): string {
  if (orderDrinks.length === 0) return "No items";

  return orderDrinks
    .map((od) => {
      const sizeName = od.size.charAt(0).toUpperCase() + od.size.slice(1);
      const drinkName = od.drinks?.name ?? "Unknown";
      return `${od.quantity}x ${sizeName} ${drinkName}`;
    })
    .join(", ");
}

function calculateTotal(orderDrinks: OrderWithDrinks["order_drinks"]): string {
  const total = orderDrinks.reduce((sum, od) => {
    return sum + (od.unit_price ?? 0) * od.quantity;
  }, 0);
  return `$${total.toFixed(2)}`;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function StatusBadge({ status }: { status: OrderWithDrinks["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        {
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200":
            status === "pending",
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200":
            status === "completed",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200":
            status === "cancelled",
        },
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

interface OrdersTableClientProps {
  orders: OrderWithDrinks[];
  drinks: Drink[];
}

export function OrdersTableClient({ orders, drinks }: OrdersTableClientProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDrinks | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowClick = (order: OrderWithDrinks) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              onClick={() => handleRowClick(order)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{formatItems(order.order_drinks)}</TableCell>
              <TableCell>{calculateTotal(order.order_drinks)}</TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatTime(order.created_at)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedOrder && (
        <EditOrderDialog
          order={selectedOrder}
          drinks={drinks}
          open={dialogOpen}
          onOpenChange={handleDialogOpenChange}
        />
      )}
    </>
  );
}
