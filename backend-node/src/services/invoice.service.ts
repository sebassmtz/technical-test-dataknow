import { Op } from "sequelize"
import { CreateInvoice } from "../interfaces/invoice"
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

  public async getInvoiceById(id: number): Promise<Invoice | null> {
    try {
      const invoice = await Invoice.findByPk(id)
      return invoice
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async getInvoiceByClientIdAndBetweenDates(
    clientId: number,
    from: Date,
    to: Date
  ) {
    try {
      const invoices = await Invoice.findAll({
        where: {
          clientId: clientId,
          date: {
            [Op.between]: [from, to],
          },
        },
      })
      return invoices
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async createInvoice(invoice: CreateInvoice): Promise<Invoice> {
    try {
      const newInvoice = await Invoice.create({
        date: invoice.date,
        name_product: invoice.name_product,
        price: invoice.price,
        discount_value: invoice.discount_value,
        vat_value: invoice.vat_value,
        total_value: invoice.total_value,
        clientId: invoice.clientId,
      })
      return newInvoice
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async updateInvoice(
    id: number,
    invoice: CreateInvoice
  ): Promise<[number]> {
    try {
      const updatedInvoice = await Invoice.update(invoice, {
        where: { id },
      })
      return updatedInvoice
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async deleteInvoice(id: number): Promise<number> {
    try {
      const deletedInvoice = await Invoice.destroy({
        where: { id },
      })
      return deletedInvoice
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
