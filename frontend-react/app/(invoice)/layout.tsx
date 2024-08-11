import React from "react";

interface LayoutInvoiceProps {
  children: React.ReactNode;
}

function LayoutInvoice({ children }: LayoutInvoiceProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EEE9FF] to-[#EEE9FF]">
      {children}
    </div>
  );
}

export default LayoutInvoice;
