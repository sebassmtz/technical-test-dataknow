export interface CreateInvoice {
  date: Date
  name_product: string
  price: number
  discount_value: number
  vat_value: number
  total_value: number
  clientId: number
}
