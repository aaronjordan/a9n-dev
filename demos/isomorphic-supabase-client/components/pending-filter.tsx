"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function PendingFilterSkeleton() {
  return <div className="h-5 w-48 bg-muted animate-pulse rounded" />;
}

export function PendingFilter({
  searchParams,
}: {
  searchParams: Promise<{ pending?: string }>;
}) {
  const { pending } = use(searchParams);
  const checked = pending === "true";
  const router = useRouter();

  function handleCheckedChange(isChecked: boolean) {
    const params = new URLSearchParams();
    if (isChecked) {
      params.set("pending", "true");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="pending-filter"
        checked={checked}
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor="pending-filter" className="cursor-pointer">
        Show pending orders only
      </Label>
    </div>
  );
}
