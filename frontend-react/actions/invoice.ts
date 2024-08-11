import axios from "@/actions/conf";
import { AddInvoice, Invoice } from "@/types/invoice";

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
