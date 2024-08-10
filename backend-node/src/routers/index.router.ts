import { Router } from "express"
import healthRouter from "./health.router"
import clientRouter from "./client.router"
import invoiceRouter from "./invoice.router"

const router = Router()

export default function (app: Router): Router {
  /**
   *@openapi
   * components:
   *  schemas:
   *   BadRequest:
   *    type: object
   *    required:
   *     - message
   *    example:
   *      message: error message
   *   Deleted:
   *    type: object
   *    required:
   *     - message
   *    example:
   *      message: deleted
   *   NotFound:
   *    type: object
   *    required:
   *      - message
   *    example:
   *      message: Not found
   */

  healthRouter(app)
  clientRouter(app)
  invoiceRouter(app)

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" })
  })

  return router
}
