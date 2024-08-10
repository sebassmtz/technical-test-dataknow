export interface Client {
  id: number;
  name: string;
  type_identification: string;
  number_identification: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddClient {
  name: string;
  type_identification: string;
  number_identification: number;
  observations?: string;
}

export interface EditClient {
  id: number;
  name?: string;
  type_identification?: string;
  number_identification?: string;
  observations?: string;
}
