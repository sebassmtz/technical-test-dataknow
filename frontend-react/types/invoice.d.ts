export interface Invoice {
  id: number;
  date: string;
  name_product: string;
  price: number;
  discount_value: number;
  vat_value: number;
  total_value: number;
  clientId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddInvoice {
  date: string;
  name_product: string;
  price: number;
  discount_value: number;
  vat_value: number;
  total_value: number;
  clientId: number;
}
