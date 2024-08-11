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
import { Invoice } from "@/types/invoice";

interface TablePreviewProps {
  data: Invoice[];
}

export function TableInvoices({ data }: TablePreviewProps) {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  // Función para formatear los valores monetarios
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "COP", // Cambia esto al código de la moneda que necesitas
      minimumFractionDigits: 2,
    }).format(value);
  };
  return (
    <>
      <Table>
        <TableCaption>Facturas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[100px]">Fecha</TableHead>
            <TableHead>Nombre del Producto</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Descuento</TableHead>
            <TableHead>IVA</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Cliente ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((dataFile) => (
            <TableRow key={dataFile.id}>
              <TableCell className="font-medium">{dataFile.id}</TableCell>
              <TableCell className="font-medium">
                {formatDate(dataFile.date)}
              </TableCell>
              <TableCell>{dataFile.name_product}</TableCell>
              <TableCell>{formatCurrency(dataFile.price)}</TableCell>
              <TableCell>{dataFile.discount_value}</TableCell>
              <TableCell>{dataFile.vat_value}</TableCell>
              <TableCell>{formatCurrency(dataFile.total_value)}</TableCell>
              <TableCell>{dataFile.clientId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
