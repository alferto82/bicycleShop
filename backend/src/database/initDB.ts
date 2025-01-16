import { sequelize } from "../database/database";
import Part from "../models/Part";
import Combination from "../models/Combination";

const insertParts = async () => {
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
};

const insertCombinations = async () => {
  const mountainWheels = await Part.findOne({
    where: { name: "Mountain wheels" },
  });
  const fullSuspension = await Part.findOne({
    where: { name: "Full-suspension" },
  });
  const fatBikeWheels = await Part.findOne({
    where: { name: "Fat bike wheels" },
  });
  const red = await Part.findOne({ where: { name: "Red" } });

  if (mountainWheels && fullSuspension) {
    await Combination.create({
      part1: mountainWheels.id,
      part2: fullSuspension.id,
      allowed: true,
    });
  }

  if (fatBikeWheels && red) {
    await Combination.create({
      part1: fatBikeWheels.id,
      part2: red.id,
      allowed: false,
    });
  }
};

const initDB = async () => {
  try {
    await sequelize.sync({ force: true }); // Elimina y recrea las tablas
    console.log("Database synchronized");

    await insertParts();
    console.log("Parts inserted");

    await insertCombinations();
    console.log("Combinations inserted");

    console.log("Database initialized with sample data");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDB();
