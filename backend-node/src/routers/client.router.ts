import { Router } from "express"
import { ClientController } from "../controllers/client.controller"

export default function ClientRouter(router: Router): void {
  const clientController = new ClientController()
  /**
   * @openapi
   * components:
   *  schemas:
   *    CreateClient:
   *        type: object
   *        required:
   *           - name
   *           - type_identification
   *           - number_identification
   *           - observations
   *        example:
   *           name: Jhoe Doe
   *           type_identification: CC
   *           number_identification: 12345566
   *           observations: none
   *    Client:
   *     type: object
   *     required:
   *         - name
   *         - type_identification
   *         - number_identification
   *         - observations
   *     example:
   *         name: Jhoe Doe
   *         type_identification: CC
   *         number_identification: 12345566
   *         observations: none
   *    GetAllClientsResponse:
   *     type: array
   *     items:
   *       $ref: '#components/schemas/Client'
   */

  /**
   * @openapi
   * /api/client:
   *  get:
   *     tags:
   *     - Client
   *     summary: Get All Clients
   *     security: []
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/GetAllClientsResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.get("/api/client", clientController.getClients.bind(clientController))

  /**
   * @openapi
   * /api/client:
   *  post:
   *     tags:
   *     - Client
   *     summary: Create a client
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateClient'
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *                $ref: '#/components/schemas/CreateClient'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.post(
    "/api/client",
    clientController.createClient.bind(clientController)
  )

  /**
   * @openapi
   * /api/client/{id}:
   *  get:
   *     tags:
   *     - Client
   *     summary: Get client by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Client id
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Client'
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
    "/api/client/:id",
    clientController.getClientById.bind(clientController)
  )

  /**
   * @openapi
   * /api/client/{id}:
   *  patch:
   *     tags:
   *     - Client
   *     summary: Update clientt by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Client id
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateClient'
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Client'
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
    "/api/client/:id",
    clientController.updateClient.bind(clientController)
  )

  /**
   * @openapi
   * /api/client/{id}:
   *  delete:
   *     tags:
   *     - Client
   *     summary: Delete client by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Client id
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
    "/api/client/:id",
    clientController.deleteClient.bind(clientController)
  )
}
