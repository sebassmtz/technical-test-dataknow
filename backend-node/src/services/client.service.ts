import { Client } from "../models/client.module"

export class ClientService {
  public async getClients(): Promise<Client[]> {
    try {
      const clients = await Client.findAll({
        attributes: [
          "id",
          "name",
          "type_identification",
          "number_identification",
          "observations",
        ],
      })
      return clients
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
