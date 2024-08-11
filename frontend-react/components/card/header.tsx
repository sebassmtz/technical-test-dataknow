import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  mainLabel: string;
  label: string;
}

export const Header = ({ label,mainLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-1 items-start justify-start">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        {mainLabel}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
