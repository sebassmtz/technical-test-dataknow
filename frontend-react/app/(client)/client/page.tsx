import { CardWrapper } from "@/components/card/card-wrapper";
import { ClientForm } from "@/components/client/client-form";
import React from "react";

function ClientPage() {
  return (
    <CardWrapper
      mainLabel="Clientes"
      headerLabel=""
    >
      <ClientForm />
    </CardWrapper>
  );
}

export default ClientPage;
