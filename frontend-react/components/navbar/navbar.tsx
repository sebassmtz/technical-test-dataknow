"use client";
import React, { useState } from "react";
import { MainNav } from "@/components/navbar/main-nav";
import Link from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const toggleeMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className="border-b "
      style={{ background: "#000" }}
    >
      <div className="flex items-center h-16 px-4 ml-8 mr-4">
        <div className="flex items-center space-x-8">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/dk.jpg" />
            <AvatarFallback>GE</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-white">FACTURATE</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <MainNav className="mx-6 ml-6" />
        </div>
      </div>
    </div>
  );
};
