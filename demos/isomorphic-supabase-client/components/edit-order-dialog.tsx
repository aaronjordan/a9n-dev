"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import type { OrderWithDrinks } from "@/lib/data/getOrders";
import type { Drink } from "@/lib/data/getDrinks";
import { updateOrder, type OrderItemInput } from "@/lib/data/updateOrder";
import type { Database } from "@/lib/supabase/db.types";
import { useDrinks } from "@/lib/hooks/useDrinks";

type OrderStatus = Database["public"]["Enums"]["order_status"];
type Size = Database["public"]["Enums"]["size"];

const SIZES: Size[] = ["small", "medium", "large"];
const STATUSES: OrderStatus[] = ["pending", "completed", "cancelled"];

// Size pricing: small = base, medium = base + 0.50, large = base + 1.00
function calculateUnitPrice(basePrice: number, size: Size): number {
	switch (size) {
		case "small":
			return basePrice;
		case "medium":
			return basePrice + 0.5;
		case "large":
			return basePrice + 1.0;
	}
}

type EditableItem = {
	tempId: string; // for React key, even for existing items
	id?: number;
	drink_id: number;
	size: Size;
	quantity: number;
	unit_price: number;
	_delete?: boolean;
};

interface EditOrderDialogProps {
	order: OrderWithDrinks;
	drinks: Drink[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function EditOrderDialog({
	order,
	drinks,
	open,
	onOpenChange,
}: EditOrderDialogProps) {
	const activeDrinks = useDrinks(drinks);
	// Local form state
	const [name, setName] = useState(order.name);
	const [status, setStatus] = useState<OrderStatus>(order.status);
	const [items, setItems] = useState<EditableItem[]>(() =>
		order.order_drinks.map((od, idx) => ({
			tempId: `existing-${idx}`,
			id: od.id,
			drink_id: od.drink_id,
			size: od.size,
			quantity: od.quantity,
			unit_price: od.unit_price ?? 0,
		})),
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Reset state when order changes
	const resetState = () => {
		setName(order.name);
		setStatus(order.status);
		setItems(
			order.order_drinks.map((od, idx) => ({
				tempId: `existing-${idx}`,
				id: od.id,
				drink_id: od.drink_id,
				size: od.size,
				quantity: od.quantity,
				unit_price: od.unit_price ?? 0,
			})),
		);
		setError(null);
	};

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen) {
			resetState();
		}
		onOpenChange(newOpen);
	};

	const updateItem = (tempId: string, updates: Partial<EditableItem>) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.tempId !== tempId) return item;

				const updated = { ...item, ...updates };

				// Recalculate unit price if drink or size changed
				if (updates.drink_id !== undefined || updates.size !== undefined) {
					const drink = activeDrinks.all.find((d) => d.id === updated.drink_id);
					if (drink) {
						updated.unit_price = calculateUnitPrice(
							drink.base_price,
							updated.size,
						);
					}
				}

				return updated;
			}),
		);
	};

	const removeItem = (tempId: string) => {
		setItems((prev) =>
			prev.map((item) =>
				item.tempId === tempId ? { ...item, _delete: true } : item,
			),
		);
	};

	const addItem = () => {
		const firstDrink = activeDrinks.all[0];
		if (!firstDrink) return;

		const newItem: EditableItem = {
			tempId: `new-${Date.now()}`,
			drink_id: firstDrink.id,
			size: "medium",
			quantity: 1,
			unit_price: calculateUnitPrice(firstDrink.base_price, "medium"),
		};
		setItems((prev) => [...prev, newItem]);
	};

	const handleSave = async () => {
		setIsLoading(true);
		setError(null);

		const itemsToSend: OrderItemInput[] = items.map((item) => ({
			id: item.id,
			drink_id: item.drink_id,
			size: item.size,
			quantity: item.quantity,
			unit_price: item.unit_price,
			_delete: item._delete,
		}));

		const result = await updateOrder({
			orderId: order.id,
			name,
			status,
			items: itemsToSend,
		});

		setIsLoading(false);

		if (result.success) {
			onOpenChange(false);
		} else {
			setError(result.error ?? "Failed to update order");
		}
	};

	const visibleItems = items.filter((item) => !item._delete);
	const total = visibleItems.reduce(
		(sum, item) => sum + item.unit_price * item.quantity,
		0,
	);

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Edit Order #{order.id}</DialogTitle>
					<DialogDescription>
						Make changes to the order. Click save when you're done.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{/* Customer Name */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Customer
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>

					{/* Status */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Status</Label>
						<Select
							value={status}
							onValueChange={(v) => setStatus(v as OrderStatus)}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{STATUSES.map((s) => (
									<SelectItem key={s} value={s}>
										{s.charAt(0).toUpperCase() + s.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Items */}
					<div className="space-y-2">
						<Label>Items</Label>
						<div className="space-y-2 max-h-[300px] overflow-y-auto">
							{visibleItems.map((item) => {
								const drink = activeDrinks.all.find(
									(d) => d.id === item.drink_id,
								);
								return (
									<div
										key={item.tempId}
										className="flex items-center gap-2 p-2 border rounded-md"
									>
										{/* Drink Select */}
										<Select
											value={item.drink_id.toString()}
											onValueChange={(v) =>
												updateItem(item.tempId, { drink_id: parseInt(v, 10) })
											}
										>
											<SelectTrigger className="w-[150px]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{activeDrinks.all.map((d) => (
													<SelectItem key={d.id} value={d.id.toString()}>
														{d.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										{/* Size Select */}
										<Select
											value={item.size}
											onValueChange={(v) =>
												updateItem(item.tempId, { size: v as Size })
											}
										>
											<SelectTrigger className="w-[100px]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{SIZES.map((s) => (
													<SelectItem key={s} value={s}>
														{s.charAt(0).toUpperCase() + s.slice(1)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										{/* Quantity */}
										<Input
											type="number"
											min={1}
											value={item.quantity}
											onChange={(e) =>
												updateItem(item.tempId, {
													quantity: parseInt(e.target.value, 10) || 1,
												})
											}
											className="w-[70px]"
										/>

										{/* Price Display */}
										<span className="text-sm text-muted-foreground w-[60px] text-right">
											${(item.unit_price * item.quantity).toFixed(2)}
										</span>

										{/* Remove Button */}
										<Button
											variant="ghost"
											size="icon"
											onClick={() => removeItem(item.tempId)}
										>
											<Trash2 className="h-4 w-4 text-destructive" />
										</Button>
									</div>
								);
							})}
						</div>

						{/* Add Item Button */}
						<Button
							variant="outline"
							size="sm"
							onClick={addItem}
							className="w-full"
							disabled={activeDrinks.all.length === 0}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Item
						</Button>
					</div>

					{/* Total */}
					<div className="flex justify-end pt-2 border-t">
						<span className="text-lg font-semibold">
							Total: ${total.toFixed(2)}
						</span>
					</div>

					{/* Error */}
					{error && <p className="text-sm text-destructive">{error}</p>}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={activeDrinks.refresh}>
						Refresh Drinks
					</Button>
					<Button
						variant="outline"
						onClick={() => handleOpenChange(false)}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={isLoading}>
						{isLoading ? "Saving..." : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
