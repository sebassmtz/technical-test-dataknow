import { Request, Response } from "express"
import { InvoiceService } from "../services/invoice.service"
export class InvoiceController {
  private invoiceService: InvoiceService

  constructor() {
    this.invoiceService = new InvoiceService()
  }
  public async getInvoices(req: Request, res: Response): Promise<Response> {
    try {
      const invoice = await this.invoiceService.getInvoices()
      return res.status(200).json(invoice)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
