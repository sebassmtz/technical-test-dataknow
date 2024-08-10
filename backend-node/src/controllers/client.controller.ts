import { Request, Response } from "express"
import { ClientService } from "../services/client.service"
import { CreateClient } from "../interfaces/client"

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

  public async getClientById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const client = await this.clientService.getClientById(id)
      if (!client) {
        return res.status(404).json({ message: "Client not found" })
      }
      return res.status(200).json(client)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async createClient(req: Request, res: Response): Promise<Response> {
    try {
      const client: CreateClient = req.body
      const newClient = await this.clientService.createClient(client)
      return res.status(201).json(newClient)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async updateClient(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const client: CreateClient = req.body
      const updatedClient = await this.clientService.updateClient(id, client)
      return res.status(200).json(updatedClient)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async deleteClient(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const deletedClient = await this.clientService.deleteClient(id)
      return res.status(204).json(deletedClient)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
