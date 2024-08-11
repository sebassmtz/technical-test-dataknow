"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ClientSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addClient } from "@/actions/client";

export function ClientForm() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Cliente creado correctamente");
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: "",
      type_identification: "",
      number_identification: "",
      observations: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ClientSchema>) => {
    console.log(values);
    const formattedValues = {
      ...values,
      number_identification: parseInt(values.number_identification),
    };
    mutate(formattedValues);
  };

  return (
    <div className="mx-2">
      <div className="bg-[#EEE9FF] py-2">
        <h1 className="text-lg mx-4">Rellena la siguiente información</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 mt-4"
        >
          <div className="space-y-1 w-1/2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Escribe Nombre del cliente"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row space-x-4">
            <FormField
              control={form.control}
              name="type_identification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Identificacion</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CC">Cedula Ciudadania</SelectItem>
                      <SelectItem value="CE">Cedula Extranjeria</SelectItem>
                      <SelectItem value="TE">Tarjeta de Extranjeria</SelectItem>
                      <SelectItem value="NIT">NIT</SelectItem>
                      <SelectItem value="PAS">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number_identification"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Numero de Identificacion</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Escribe Numero de Identificacion"
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe Observaciones"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end space-x-2">
            <Button
              type="submit"
              size={"lg"}
            >
              {isPending ? "Guardando..." : "Guardar Cliente"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
