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

class Part
  extends Model<PartAttributes, Optional<PartAttributes, "id">>
  implements PartAttributes
{
  public declare id: number;
  public declare name: string;
  public declare type: string;
  public declare category: string;
  public declare price: number;
  public declare inStock: boolean;
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
