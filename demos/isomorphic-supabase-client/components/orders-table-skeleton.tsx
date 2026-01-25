import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SkeletonCell({ className }: { className?: string }) {
  return (
    <div
      className={`h-4 bg-muted animate-pulse rounded ${className ?? "w-20"}`}
    />
  );
}

const SKELETON_ROWS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

function SkeletonRow() {
  return (
    <>
      <TableCell>
        <SkeletonCell className="w-12" />
      </TableCell>
      <TableCell>
        <SkeletonCell className="w-24" />
      </TableCell>
      <TableCell>
        <SkeletonCell className="w-48" />
      </TableCell>
      <TableCell>
        <SkeletonCell className="w-16" />
      </TableCell>
      <TableCell>
        <SkeletonCell className="w-20" />
      </TableCell>
      <TableCell>
        <SkeletonCell className="w-24" />
      </TableCell>
    </>
  );
}

export function OrdersTableSkeleton() {
  return (
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
        {SKELETON_ROWS.map((id) => (
          <TableRow key={id}>
            <SkeletonRow />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
