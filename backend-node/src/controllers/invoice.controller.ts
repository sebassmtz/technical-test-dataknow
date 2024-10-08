import { Request, Response } from "express"
import { InvoiceService } from "../services/invoice.service"
import { CreateInvoice } from "../interfaces/invoice"
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

  public async getInvoiceById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const invoice = await this.invoiceService.getInvoiceById(id)
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" })
      }
      return res.status(200).json(invoice)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async getInvoiceByClientIdAndBetweenDates(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const from = new Date(req.query.from as string)
      const to = new Date(req.query.to as string)
      const clientId = Number(req.query.clientId)
      const invoices =
        await this.invoiceService.getInvoiceByClientIdAndBetweenDates(
          clientId,
          from,
          to
        )
      return res.status(200).json(invoices)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async createInvoice(req: Request, res: Response): Promise<Response> {
    try {
      const invoice: CreateInvoice = {
        ...req.body,
        price: parseFloat(req.body.price).toFixed(2),
        discount_value: parseFloat(req.body.discount_value).toFixed(2),
        vat_value: parseFloat(req.body.vat_value).toFixed(2),
        total_value: parseFloat(req.body.total_value).toFixed(2),
      }
      const newInvoice = await this.invoiceService.createInvoice(invoice)
      return res.status(201).json(newInvoice)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async updateInvoice(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const invoice: CreateInvoice = req.body
      const updatedInvoice = await this.invoiceService.updateInvoice(
        id,
        invoice
      )
      return res.status(200).json(updatedInvoice)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async deleteInvoice(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const deletedInvoice = await this.invoiceService.deleteInvoice(id)
      return res.status(200).json(deletedInvoice)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
