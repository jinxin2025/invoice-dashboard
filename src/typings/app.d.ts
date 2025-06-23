namespace App {
  type InvoiceStatus = "Pending" | "Paid" | "Overdue";

  interface InvoiceLineItem {
    description: string;
    quantity: number;
    price: number;
  }

  interface ClientItem {
    clientId: string;
    name: string;
    email: string;
    address: string;
  }

  interface InvoiceItem {
    invoiceNumber: string;
    clientId: string;
    dueDate: string;
    status: InvoiceStatus;
    lineItems: InvoiceLineItem[];
  }
}
