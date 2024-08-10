"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

interface Props {
  children: React.ReactNode;
}

function SessionAuthProvider({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
}
export default SessionAuthProvider;
