import { sequelize } from "../database/database";
import Part from "../models/Part";
import Combination from "../models/Combination";

const initDB = async () => {
  await sequelize.sync({ force: true }); // Esto eliminará y recreará las tablas

  // Insertar datos iniciales en la tabla Part
  await Part.bulkCreate([
    {
      name: "Full-suspension",
      type: "Frame",
      category: "Bicycle",
      price: 130,
      inStock: true,
    },
    {
      name: "Diamond",
      type: "Frame",
      category: "Bicycle",
      price: 100,
      inStock: true,
    },
    {
      name: "Step-through",
      type: "Frame",
      category: "Bicycle",
      price: 90,
      inStock: true,
    },
    {
      name: "Matte",
      type: "Finish",
      category: "Bicycle",
      price: 30,
      inStock: true,
    },
    {
      name: "Shiny",
      type: "Finish",
      category: "Bicycle",
      price: 50,
      inStock: true,
    },
    {
      name: "Road wheels",
      type: "Wheels",
      category: "Bicycle",
      price: 80,
      inStock: true,
    },
    {
      name: "Mountain wheels",
      type: "Wheels",
      category: "Bicycle",
      price: 100,
      inStock: true,
    },
    {
      name: "Fat bike wheels",
      type: "Wheels",
      category: "Bicycle",
      price: 120,
      inStock: true,
    },
    {
      name: "Red",
      type: "Rim color",
      category: "Bicycle",
      price: 20,
      inStock: true,
    },
    {
      name: "Black",
      type: "Rim color",
      category: "Bicycle",
      price: 20,
      inStock: true,
    },
    {
      name: "Blue",
      type: "Rim color",
      category: "Bicycle",
      price: 20,
      inStock: true,
    },
    {
      name: "Single-speed chain",
      type: "Chain",
      category: "Bicycle",
      price: 43,
      inStock: true,
    },
    {
      name: "8-speed chain",
      type: "Chain",
      category: "Bicycle",
      price: 60,
      inStock: true,
    },
  ]);

  // Insertar datos iniciales en la tabla Combination
  await Combination.bulkCreate([
    { part1: "Mountain wheels", part2: "Full-suspension", allowed: true },
    { part1: "Fat bike wheels", part2: "Red", allowed: false },
  ]);

  console.log("Database initialized with sample data");
};

initDB().catch((error) => {
  console.error("Error initializing database:", error);
});
