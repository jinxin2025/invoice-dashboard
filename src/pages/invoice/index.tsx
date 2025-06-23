import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceData from "@/data/invoices-attelas.json";
import ClientData from "@/data/clients-attelas.json";
import { calculateInvoiceTotalAmount, toLocaleString } from "@/lib/utils";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface InvoiceListItem extends App.InvoiceItem {
  clientName: string;
}

export default function InvoicePage() {
  const navigate = useNavigate();

  const invoices: InvoiceListItem[] = useMemo(() => {
    return InvoiceData.map((invoice) => {
      const client = ClientData.find(
        (client) => client.clientId === invoice.clientId
      );
      return {
        ...invoice,
        status: invoice.status as App.InvoiceStatus,
        clientName: client ? client.name : "Unknown Client",
      };
    });
  }, []);

  const invoiceTotal = useMemo(() => {
    return invoices.reduce(
      (total, invoice) =>
        total + calculateInvoiceTotalAmount(invoice.lineItems),
      0
    );
  }, [invoices]);

  const gotoDetails = (invoice: InvoiceListItem) => {
    navigate(`/details/${invoice.invoiceNumber}`);
  };

  return (
    <div className="flex flex-col flex-1 py-6 container mx-auto">
      <div className="shadow bg-white p-8 min-h-[200px] flex-1 flex-col rounded-lg relative">
        <h1 className="text-4xl font-bold text-primary mb-6">Invoice</h1>
        <div className="flex flex-1 flex-col">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Total Amount Due</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.invoiceNumber}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    gotoDetails(invoice);
                  }}
                >
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell>
                    {toLocaleString(
                      calculateInvoiceTotalAmount(invoice.lineItems)
                    )}
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className="text-right">{invoice.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  {toLocaleString(invoiceTotal)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
