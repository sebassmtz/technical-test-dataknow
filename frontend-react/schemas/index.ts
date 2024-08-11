import { Invoice } from "./../../backend-node/src/models/invoice.module";
import * as z from "zod";

export const ClientSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre es requerido",
  }),
  type_identification: z
    .string({ required_error: "No selecciono nada" })
    .min(1, {
      message: "Tipo de identificación es requerido",
    }),
  number_identification: z.string().min(1, {
    message: "Número de identificación es requerido",
  }),
  observations: z.optional(
    z.string().max(500, {
      message: "Observaciones debe tener menos de 500 caracteres",
    })
  ),
});

export const InvoiceSchema = z.object({
  date: z.string().min(1, {
    message: "Fecha es requerida",
  }),
  name_product: z.string().min(1, {
    message: "Nombre del producto es requerido",
  }),
  price: z.string().min(1, {
    message: "Precio es requerido",
  }),
  discount_value: z.string().min(1, {
    message: "Valor de descuento es requerido",
  }),
  total_value: z.string().min(0, {
    message: "Valor total es requerido",
  }),
  clientId: z.number().min(1, {
    message: "Cliente es requerido",
  }),
});
