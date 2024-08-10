"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Textarea } from "@/components/ui/textarea";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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

    const formattedValues = {
      ...values,
      number_identification: parseInt(values.number_identification),
    };
    mutate(formattedValues);
  };

  const types = [
    { label: "Cedula Ciudadania", value: "CC" },
    { label: "Cedula Extranjeria", value: "CE" },
    { label: "Pasaporte", value: "PAS" },
    { label: "Tarjeta de Extranjeria", value: "TE" },
    { label: "NIT", value: "NIT" },
  ] as const;

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
            <div className="mt-2">
              <FormField
                control={form.control}
                name="type_identification"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tipo de Identificacion</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? types.find((type) => type.value === field.value)
                                  ?.label
                              : "Seleccione..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar tipo..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No se encuentra</CommandEmpty>
                            <CommandGroup>
                              {types.map((type) => (
                                <CommandItem
                                  value={type.label}
                                  key={type.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "type_identification",
                                      type.value
                                    );
                                  }}
                                >
                                  {type.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      type.value === field.value
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
