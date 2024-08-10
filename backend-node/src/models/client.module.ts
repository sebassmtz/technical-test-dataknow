import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize"
import { sequelize } from "../helpers/Database"

import { Invoice } from "./invoice.module"

export class Client extends Model<
  InferAttributes<Client>,
  InferCreationAttributes<Client>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare type_identification: string
  declare number_identification: string
  declare observations: CreationOptional<string>
  declare createdAt: CreationOptional<Date>
  declare Invoices?: Invoice[]
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_identification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_identification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "clients",
  }
)

Client.hasMany(Invoice, { foreignKey: "clientId", sourceKey: "id" })
Invoice.belongsTo(Client, {
  foreignKey: "clientId",
  targetKey: "id",
})
