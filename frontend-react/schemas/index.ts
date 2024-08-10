import * as z from "zod";

export const ClientSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre es requerido",
  }),
  type_identification: z.string({required_error: "No selecciono nada"}).min(1, {
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
