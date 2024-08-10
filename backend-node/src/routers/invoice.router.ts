import { Router } from "express"
import { InvoiceController } from "../controllers/invoice.controller"

export default function InvoiceRouter(router: Router): void {
  const invoiceController = new InvoiceController()
  /**
   * @openapi
   * components:
   *  schemas:
   *    CreateInvoice:
   *        type: object
   *        required:
   *           - date
   *           - name_product
   *           - price
   *           - discount_value
   *           - vat_value
   *           - total_value
   *        example:
   *           date: 2021-10-10
   *           name_product: Product 1
   *           price: 1000
   *           discount_value: 10
   *           vat_value: 19
   *           total_value: 1000
   *    Invoice:
   *     type: object
   *     required:
   *         - date
   *         - name_product
   *         - price
   *         - discount_value
   *         - vat_value
   *         - total_value
   *     example:
   *         date: 2021-10-10
   *         name_product: Product 1
   *         price: 1000
   *         discount_value: 10
   *         vat_value: 19
   *         total_value: 1000
   *    GetInvoicesResponse:
   *     type: array
   *     items:
   *       $ref: '#components/schemas/Invoice'
   */

  /**
   * @openapi
   * /api/invoice:
   *  get:
   *     tags:
   *     - Invoice
   *     summary: Get All Invoice
   *     security: []
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/GetInvoicesResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.get(
    "/api/invoice",
    invoiceController.getInvoices.bind(invoiceController)
  )
}
