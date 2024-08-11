"use client";
import { getAllClients } from "@/actions/client";
import { CardWrapper } from "@/components/card/card-wrapper";
import { TableClients } from "@/components/client/table-clients";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import dynamic from "next/dynamic";
const BeatLoader = dynamic(
  () => import("react-spinners").then((mod) => mod.BeatLoader),
  { ssr: false }
);

function ListClientPage() {
  const {
    isLoading,
    error,
    data: client,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
  });

  return (
    <CardWrapper
      mainLabel="Clientes"
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
        <TableClients data={client ?? []} />
      )}
    </CardWrapper>
  );
}

export default ListClientPage;
