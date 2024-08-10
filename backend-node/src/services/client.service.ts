import { CreateClient } from "../interfaces/client"
import { Client } from "../models/client.module"

export class ClientService {
  public async getClients(): Promise<Client[]> {
    try {
      const clients = await Client.findAll()
      return clients
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async getClientById(id: number): Promise<Client | null> {
    try {
      const client = await Client.findByPk(id)
      return client;
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async createClient(client: CreateClient): Promise<Client> {
    try {
      const newClient = await Client.create({
        name: client.name,
        type_identification: client.type_identification,
        number_identification: client.number_identification,
        observations: client.observations,
      })
      return newClient
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async updateClient(
    id: number,
    client: CreateClient
  ): Promise<[number]> {
    try {
      const updatedClient = await Client.update(client, {
        where: { id },
      })
      return updatedClient
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async deleteClient(id: number): Promise<number> {
    try {
      const deletedClient = await Client.destroy({
        where: { id },
      })
      return deletedClient
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
