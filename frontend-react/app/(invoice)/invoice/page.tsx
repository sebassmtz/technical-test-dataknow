import { CardWrapper } from "@/components/card/card-wrapper";
import { InvoiceForm } from "@/components/invoice/invoice-form";
import React from "react";

function InvoicePage() {
  return (
    <CardWrapper
      mainLabel="Facturas"
      headerLabel=""
    >
      <InvoiceForm />
    </CardWrapper>
  );
}

export default InvoicePage;
