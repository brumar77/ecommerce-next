"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "../../../../utils/currencyFormat";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. productos</span>
      <span className="text-right">{itemsInCart}</span>

      <span>Subtotal </span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
 