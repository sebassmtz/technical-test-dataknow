import axios from "@/actions/conf";
import { AddClient, Client, EditClient } from "@/types/client";

export const getAllClients = async () => {
  const response = await axios.get<Client[]>("/client", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addClient = async (data: AddClient) => {
  const response = await axios.post<Client>("/client", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteClient = async (id: number) => {
  const response = await axios.delete<Client>(`/client/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
