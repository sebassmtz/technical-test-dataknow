"use client";
import { CardWrapper } from "@/components/card/card-wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import dynamic from "next/dynamic";
import { getAllInvoices, queryMainInvoice } from "@/actions/invoice";
import { TableInvoices } from "@/components/invoice/table-invoice";
import { getAllClients } from "@/actions/client";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { QueryMain } from "@/schemas";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Invoice } from "@/types/invoice";

const BeatLoader = dynamic(
  () => import("react-spinners").then((mod) => mod.BeatLoader),
  { ssr: false }
);

function ListInvoicePage() {
  const { isLoading: isLoadingInvoices, data: invoices } = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });

  const { isLoading: isLoadingClients, data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
  });

  const form = useForm<z.infer<typeof QueryMain>>({
    resolver: zodResolver(QueryMain),
    defaultValues: {
      from: "",
      to: "",
      clientId: 0,
    },
  });
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: queryMainInvoice,
    onSuccess: (data: Invoice[]) => {
      queryClient.setQueryData(["invoices"], data);
      toast.success("Busqueda realizada correctamente");
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof QueryMain>) => {
    mutate(values);
  };

  return (
    <CardWrapper
      mainLabel="Facturas"
      headerLabel=""
    >
      {isLoadingClients && isLoadingInvoices ? (
        <div className="flex justify-center items-center w-full h-full">
          <BeatLoader
            className="flex justify-center items-center"
            color="#000"
            size={40}
          />
        </div>
      ) : (
        <div>
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <div className="w-1/2">
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
                <div className="flex flex-row space-x-4 w-full">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha Inicio</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            placeholder="Fecha Inicio"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha Fin</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            placeholder="Fecha Fin"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row justify-center space-x-2">
                  <Button
                    type="submit"
                    size={"lg"}
                  >
                    {isPending ? "Guardando..." : "Ejecutar"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <TableInvoices data={invoices ?? []} />
        </div>
      )}
    </CardWrapper>
  );
}

export default ListInvoicePage;
