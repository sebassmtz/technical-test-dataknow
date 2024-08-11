"use client";
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
import { Button } from "@/components/ui/button";
import { Client } from "@/types/client";

interface TablePreviewProps {
  data: Client[];
}

export function TableClients({ data }: TablePreviewProps) {
  return (
    <>
      <Table>
        <TableCaption>Productos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Tipo de Identificacion</TableHead>
            <TableHead>Numero de Identificacion</TableHead>
            <TableHead>Observaciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((dataFile) => (
            <TableRow key={dataFile.id}>
              <TableCell className="font-medium">{dataFile.id}</TableCell>
              <TableCell className="font-medium">{dataFile.name}</TableCell>
              <TableCell>{dataFile.type_identification}</TableCell>
              <TableCell>{dataFile.number_identification}</TableCell>
              <TableCell>{dataFile.observations}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
