import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { calculateInvoiceTotalAmount, toLocaleString } from "@/lib/utils";

export interface ChaseDialogProps {
  open?: boolean;
  invoiceData: App.InvoiceItem;
  clientData: App.ClientItem;
  onClose?: () => void;
}

export function ChaseDialog({
  open,
  invoiceData,
  clientData,
  onClose,
}: ChaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:min-w-2xl">
        <DialogHeader>
          <DialogTitle>#{invoiceData.invoiceNumber}</DialogTitle>
        </DialogHeader>
        <div className="font-sans p-4 bg-white border rounded shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Reminder: Invoice #{invoiceData.invoiceNumber} - Payment Due
            </h2>
          </div>
          <p className="text-gray-800 mb-4">
            Dear {clientData.name},
            <br />
            <br />I hope this email finds you well. We would like to kindly
            remind you that invoice #{invoiceData.invoiceNumber}, amounting to{" "}
            {toLocaleString(calculateInvoiceTotalAmount(invoiceData.lineItems))}
            , is now due for payment. The due date for this invoice is{" "}
            {invoiceData.dueDate}.
            <br />
            <br />
            Your prompt settlement of this invoice would be greatly appreciated.
            It will help us maintain a smooth business operation and ensure that
            we can continue to provide you with the best service possible.
            <br />
            <br />
            If you have any questions or concerns regarding this invoice, please
            do not hesitate to reach out to our accounts payable team at
            invoice@xxx.com.
            <br />
            <br />
            Thank you for your understanding and cooperation.
          </p>
          <p className="text-gray-800 mb-4 text-right">Best regards</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
