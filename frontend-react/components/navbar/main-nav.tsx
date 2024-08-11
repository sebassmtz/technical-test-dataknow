"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNav = ({
  className,
  ...props
}: React.AllHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Inicio",
      active: pathname === "/",
    },
    {
      href: "/client",
      label: "Clientes",
      active: pathname === "/client",
    },
    {
      href: "/invoice",
      label: "Facturas",
      active: pathname === "/invoice",
    },
    {
      href: "/listClient",
      label: "Lista Clientes",
      active: pathname === "/listClient",
    },
    {
      href: "/listInvoice",
      label: "Lista Facturas",
      active: pathname === "/listInvoice",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-lg font-medium transition-colors hover:text-white",
            route.active
              ? "text-[#D0BCFF] "
              : "text-primary-foreground/60"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
