import React from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

function MainPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EEE9FF] to-[#EEE9FF]">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-black drop-shadow-md",
            font.className
          )}
        >
          Prueba Tecnica DataKnows
        </h1>
        <p className="text-black text-lg">Sebastian Martinez</p>
        <div></div>
      </div>
    </main>
  );
}
export default MainPage;
