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
}
