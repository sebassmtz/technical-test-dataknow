import { Request, Response } from "express"
import { ClientService } from "../services/client.service"

export class ClientController {
  private clientService: ClientService

  constructor() {
    this.clientService = new ClientService()
  }

  public async getClients(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await this.clientService.getClients()
      return res.status(200).json(clients)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
