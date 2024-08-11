"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InvoiceSchema } from "@/schemas";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { getAllClients } from "@/actions/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { addInvoice } from "@/actions/invoice";

export function InvoiceForm() {
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      date: "",
      name_product: "",
      price: "",
      discount_value: "",
      total_value: "",
      clientId: 0,
    },
  });

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: addInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Factura creada correctamente");
      form.reset();
    },
  });

  // Observa los cambios en los campos "price" y "discount_value"
  const price = form.watch("price");
  const discount = form.watch("discount_value");

  const calculatePriceTotal = (): number => {
    const price = Number(form.getValues().price);
    const vat = 0.19;
    const priceWithVat = price + price * vat;
    const discount = Number(form.getValues().discount_value);
    const priceWithDiscount = priceWithVat - priceWithVat * discount;
    return priceWithDiscount;
  };

  const { isLoading, data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
  });

  const onSubmit = (values: z.infer<typeof InvoiceSchema>) => {
    console.log(values);
    const formattedValues = {
      ...values,
      price: parseFloat(values.price),
      discount_value: Number(values.discount_value),
      vat_value: 0.19,
      total_value: calculatePriceTotal(),
    };
    mutate(formattedValues);
  };

  return (
    <div className="mx-2">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <BeatLoader
            className="flex justify-center items-center"
            color="#000"
            size={40}
          />
        </div>
      ) : (
        <div>
          <div className="bg-[#EEE9FF] py-2">
            <h1 className="text-lg mx-4">Rellena la siguiente información</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 mt-4"
            >
              <div className="flex flex-row space-x-4">
                <div className="mt-2 w-1/2">
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Cliente</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? clients?.find(
                                      (client) => client.id === field.value
                                    )?.name
                                  : "Seleccione cliente..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput
                                placeholder="Buscar cliente..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No se encuentra</CommandEmpty>
                                <CommandGroup>
                                  {clients?.map((client) => (
                                    <CommandItem
                                      value={client.name}
                                      key={client.id}
                                      onSelect={() => {
                                        form.setValue("clientId", client.id);
                                      }}
                                    >
                                      {client.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          client.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1 w-1/2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            placeholder="Fecha"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="name_product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre del producto</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Escribe Nombre del producto"
                            type="text"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Escribe precio"
                            type="number"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="discount_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descuento</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un Descuento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="0.10">10%</SelectItem>
                            <SelectItem value="0.20">20%</SelectItem>
                            <SelectItem value="0.30">30%</SelectItem>
                            <SelectItem value="0.50">50%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    name="vat_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IVA </FormLabel>
                        <Input
                          value="19%"
                          disabled={true}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between space-x-2">
                <div className="mt-2">
                  <h3 className="text-sm font-bold">
                    Valor Total de la Factura:{" "}
                    {calculatePriceTotal().toFixed(2)}
                  </h3>
                </div>
                <Button
                  type="submit"
                  size={"lg"}
                >
                  {isPending ? "Guardando..." : "Guardar Factura"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
