// models/Combination.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface CombinationAttributes {
  id?: number;
  part1: number;
  part2: number;
  allowed: boolean;
}

class Combination
  extends Model<CombinationAttributes, Optional<CombinationAttributes, "id">>
  implements CombinationAttributes
{
  public id!: number;
  public part1!: number;
  public part2!: number;
  public allowed!: boolean;
}

Combination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    part1: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    part2: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    allowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Combination",
  }
);

export default Combination;
