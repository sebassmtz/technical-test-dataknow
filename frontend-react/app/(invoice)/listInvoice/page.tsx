"use client"
import { CardWrapper } from "@/components/card/card-wrapper";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import dynamic from "next/dynamic";
import { getAllInvoices } from "@/actions/invoice";
import { TableInvoices } from "@/components/invoice/table-invoice";
const BeatLoader = dynamic(
  () => import("react-spinners").then((mod) => mod.BeatLoader),
  { ssr: false }
);

function ListInvoicePage() {
  const {
    isLoading,
    error,
    data: client,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });
  return (
    <CardWrapper
      mainLabel="Facturas"
      headerLabel=""
    >
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <BeatLoader
            className="flex justify-center items-center"
            color="#000"
            size={40}
          />
        </div>
      ) : (
        <TableInvoices data={client ?? []} />
      )}
    </CardWrapper>
  );
}

export default ListInvoicePage;
