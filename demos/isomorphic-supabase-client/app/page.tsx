import { Suspense } from "react";
import { OrdersTable } from "@/components/orders-table";
import { OrdersTableSkeleton } from "@/components/orders-table-skeleton";
import {
  PendingFilter,
  PendingFilterSkeleton,
} from "@/components/pending-filter";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ pending?: string }>;
}) {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Coffee Shop Orders</h1>

      <div className="mb-4">
        <Suspense fallback={<PendingFilterSkeleton />}>
          <PendingFilter searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense fallback={<OrdersTableSkeleton />}>
        <OrdersTable searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
