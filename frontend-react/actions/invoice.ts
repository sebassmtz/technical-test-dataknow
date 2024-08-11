import axios from "@/actions/conf";
import { AddInvoice, Invoice, QueryInvoice } from "@/types/invoice";

export const getAllInvoices = async () => {
  const response = await axios.get<Invoice[]>("/invoice", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addInvoice = async (data: AddInvoice) => {
  const response = await axios.post<Invoice>("/invoice", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteInvoice = async (id: number) => {
  const response = await axios.delete<Invoice>(`/invoice/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const queryMainInvoice = async (data: QueryInvoice) => {
  const response = await axios.get<Invoice[]>(
    `/invoice/date?clientId=${data.clientId}&from=${data.from}&to=${data.to}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
