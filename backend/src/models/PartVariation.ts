// models/PartVariation.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface PartVariationAttributes {
  id?: number;
  part1: number; // ID de la primera pieza
  part2: number; // ID de la segunda pieza
  priceAdjustment: number; // Ajuste de precio basado en la condición
}

class PartVariation
  extends Model<
    PartVariationAttributes,
    Optional<PartVariationAttributes, "id">
  >
  implements PartVariationAttributes
{
  public declare id: number;
  public declare part1: number; // ID de la primera pieza
  public declare part2: number; // ID de la segunda pieza
  public declare priceAdjustment: number;
}

PartVariation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    part1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    part2: {
      type: DataTypes.INTEGER,
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
