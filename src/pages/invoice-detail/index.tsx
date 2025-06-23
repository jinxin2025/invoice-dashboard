import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceData from "@/data/invoices-attelas.json";
import ClientData from "@/data/clients-attelas.json";
import { calculateInvoiceTotalAmount, toLocaleString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChaseDialog } from "./components/ChaseDialog";

export default function InvoiceDetailPage() {
  const navigate = useNavigate();
  const { id: invoiceNumber } = useParams<{ id: string }>();

  const [invoiceData, setInvoiceData] = useState<App.InvoiceItem | null>(null);
  const [clientData, setClientData] = useState<App.ClientItem | null>(null);
  const [showChaseDialog, setShowChaseDialog] = useState(false);

  useEffect(() => {
    if (!invoiceNumber) return;
    const invoice = InvoiceData.find(
      (invoice) => invoice.invoiceNumber === invoiceNumber
    );
    if (invoice) {
      setInvoiceData(invoice as App.InvoiceItem);
      const client = ClientData.find(
        (client) => client.clientId === invoice.clientId
      );
      if (client) {
        setClientData(client);
      } else {
        console.error("Client not found for invoice:", invoiceNumber);
      }
    } else {
      console.error("Invoice not found:", invoiceNumber);
      setInvoiceData(null);
    }
  }, [invoiceNumber]);

  if (!invoiceData) {
    return (
      <div className="h-[70vh] flex justify-center items-start pt-20">
        <h1 className="text-5xl font-bold">Invoice No found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 py-6 container mx-auto">
      <div className="shadow bg-white p-8 min-h-[200px] flex-1 flex-col rounded-lg relative">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">Invoice: {invoiceNumber}</h1>
          <X
            className="cursor-pointer hover:opacity-60 transition-opacity w-10 h-10 text-black"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="gap-y-6 grid grid-cols-2 mb-6">
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold">Invoice Number</h3>
            <p>{invoiceData.invoiceNumber}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold">Client Name</h3>
            <p>{clientData?.name}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold">Total Amount Due</h3>
            <p>
              {toLocaleString(
                calculateInvoiceTotalAmount(invoiceData.lineItems)
              )}
            </p>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold">Due Date</h3>
            <p>{invoiceData.dueDate}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold">Invoice Status</h3>
            <p>{invoiceData.status}</p>
          </div>
        </div>
        <div className="flex flex-col mb-6">
          <h3 className="font-semibold">Invoice Line Items</h3>
          <ul>
            {invoiceData.lineItems.map((item, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span>{item.description}</span>
                <span>
                  {item.quantity} x {toLocaleString(item.price)} ={" "}
                  {toLocaleString(item.quantity * item.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="w-[200px]"
            size="lg"
            onClick={() => setShowChaseDialog(true)}
          >
            Chase
          </Button>
        </div>
      </div>

      <ChaseDialog
        invoiceData={invoiceData}
        clientData={clientData}
        open={showChaseDialog}
        onClose={() => setShowChaseDialog(false)}
      />
    </div>
  );
}
