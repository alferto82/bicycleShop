// models/PartVariation.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface PartVariationAttributes {
  id?: number;
  partIds: number[]; // Array de IDs de las piezas involucradas en la condición
  priceAdjustment: number; // Ajuste de precio basado en la condición
}

class PartVariation
  extends Model<
    PartVariationAttributes,
    Optional<PartVariationAttributes, "id">
  >
  implements PartVariationAttributes
{
  public id!: number;
  public partIds!: number[]; // Lista de IDs de las piezas involucradas en la condición
  public priceAdjustment!: number;
}

PartVariation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    partIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Un array de IDs de piezas
      allowNull: false,
    },
    priceAdjustment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PartVariation",
  }
);

export default PartVariation;
