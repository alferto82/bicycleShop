import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";

interface PartAttributes {
  id?: number;
  name: string;
  type: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface PartCreationAttributes
  extends Optional<PartAttributes, "id" | "inStock"> {}

class Part
  extends Model<PartAttributes, PartCreationAttributes>
  implements PartAttributes
{
  public id!: number;
  public name!: string;
  public type!: string;
  public category!: string;
  public price!: number;
  public inStock!: boolean;
}

Part.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Part",
  }
);

export default Part;
