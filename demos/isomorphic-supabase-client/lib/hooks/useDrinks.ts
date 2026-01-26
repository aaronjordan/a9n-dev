import { useCallback, useRef, useState } from "react";
import { type Drink, getDrinks } from "../data/getDrinks";

export function useDrinks(initialDrinks: Drink[]) {
	const [drinks, setDrinks] = useState(initialDrinks);
	const isRefreshing = useRef(false); // please use `react-query` IRL

	const refresh = useCallback(async () => {
		if (isRefreshing.current) return;
		isRefreshing.current = true;

		const res = await getDrinks();
		if (!Array.isArray(res.drinks)) {
			isRefreshing.current = false;
			console.error("Failed to fetch drinks");
			return;
		}

		isRefreshing.current = false;
		setDrinks(res.drinks);
	}, []);

	return { all: drinks, refresh };
}
