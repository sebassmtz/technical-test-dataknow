"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Header } from "@/components/card/header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  mainLabel: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  mainLabel,
}: CardWrapperProps) => {
  return (
    <Card className="w-1/2 shadow-md">
      <CardHeader>
        <Header
          label={headerLabel}
          mainLabel={mainLabel}
        />
      </CardHeader>
      <CardContent
      className="mx-8"
      >{children}</CardContent>
    </Card>
  );
};
