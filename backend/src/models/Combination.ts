// models/Combination.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface CombinationAttributes {
  id?: number;
  part1: string;
  part2: string;
  allowed: boolean;
}

interface CombinationCreationAttributes
  extends Optional<CombinationAttributes, "id"> {}

class Combination
  extends Model<CombinationAttributes, CombinationCreationAttributes>
  implements CombinationAttributes
{
  public id!: number;
  public part1!: string;
  public part2!: string;
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    part2: {
      type: DataTypes.STRING,
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
