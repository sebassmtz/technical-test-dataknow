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
   *           - clientId
   *        example:
   *           date: 2021-10-10
   *           name_product: Product 1
   *           price: 1000
   *           discount_value: 10
   *           vat_value: 19
   *           total_value: 1000
   *           clientId: 2
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

  /**
   * @openapi
   * /api/invoice:
   *  post:
   *     tags:
   *     - Invoice
   *     summary: Create a invoice
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateInvoice'
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *                $ref: '#/components/schemas/CreateInvoice'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.post(
    "/api/invoice",
    invoiceController.createInvoice.bind(invoiceController)
  )

  /**
   * @openapi
   * /api/invoice/date:
   *  get:
   *     tags:
   *     - Invoice
   *     summary: Get invoice by client id and between dates
   *     parameters:
   *      - in: query
   *        name: clientId
   *        schema:
   *          type: integer
   *        description: client id
   *      - in: query
   *        name: from
   *        schema:
   *          type: date
   *        description: start date
   *      - in: query
   *        name: to
   *        schema:
   *          type: date
   *        description: end date
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Invoice'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   *       404:
   *        description: Not found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/NotFound'
   */
  router.get(
    "/api/invoice/date",
    invoiceController.getInvoiceByClientIdAndBetweenDates.bind(
      invoiceController
    )
  )

  /**
   * @openapi
   * /api/invoice/{id}:
   *  get:
   *     tags:
   *     - Invoice
   *     summary: Get invoice by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: invoice id
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Invoice'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   *       404:
   *        description: Not found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/NotFound'
   */
  router.get(
    "/api/invoice/:id",
    invoiceController.getInvoiceById.bind(invoiceController)
  )

  /**
   * @openapi
   * /api/invoice/{id}:
   *  patch:
   *     tags:
   *     - Invoice
   *     summary: Update invoice by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: invoice id
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateInvoice'
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Invoice'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   *       404:
   *        description: Not found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/NotFound'
   */
  router.patch(
    "/api/invoice/:id",
    invoiceController.updateInvoice.bind(invoiceController)
  )
  /**
   * @openapi
   * /api/invoice/{id}:
   *  delete:
   *     tags:
   *     - Invoice
   *     summary: Delete invoice by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Invoice id
   *     responses:
   *       204:
   *        description: success
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   *       404:
   *        description: Not found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/NotFound'
   */
  router.delete(
    "/api/invoice/:id",
    invoiceController.deleteInvoice.bind(invoiceController)
  )
}
