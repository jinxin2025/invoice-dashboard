import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toLocaleString(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function calculateInvoiceTotalAmount(lineItems: App.InvoiceLineItem[]) {
  return lineItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}
