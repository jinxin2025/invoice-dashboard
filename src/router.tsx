import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import InvoicePage from "@/pages/invoice";
import DetailPage from "@/pages/invoice-detail";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoicePage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </Router>
  );
}

const Fallback = () => {
  return (
    <div className="h-[70vh] flex justify-center items-start pt-20">
      <h1 className="text-5xl font-bold">404 Not Found</h1>
    </div>
  );
};
