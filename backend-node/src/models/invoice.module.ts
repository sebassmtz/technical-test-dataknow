import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize"
import { sequelize } from "../helpers/Database"

import { Client } from "./client.module"

export class Invoice extends Model<
  InferAttributes<Invoice>,
  InferCreationAttributes<Invoice>
> {
  declare id: CreationOptional<number>
  declare date: Date
  declare name_product: string
  declare price: number
  declare discount_value: number
  declare vat_value: number
  declare total_value: number
  declare createdAt: CreationOptional<Date>

  declare clientId: number
}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name_product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    vat_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    // Clave foránea
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "invoices",
  }
)
