import { Invoice } from "./../models/invoice.module"

export class InvoiceService {
  public async getInvoices(): Promise<Invoice[]> {
    try {
      const invoices = await Invoice.findAll()
      return invoices
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
