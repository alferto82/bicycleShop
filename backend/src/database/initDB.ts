import { sequelize } from "../database/database";
import Part from "../models/Part";
import PartVariation from "../models/PartVariation";
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

const insertVariations = async () => {
  const fullSuspension = await Part.findOne({
    where: { name: "Full-suspension" },
  });
  const diamond = await Part.findOne({
    where: { name: "Diamond" },
  });
  const matte = await Part.findOne({
    where: { name: "Matte" },
  });

  if (fullSuspension && matte) {
    await PartVariation.create({
      part1: fullSuspension.id,
      part2: matte.id,
      priceAdjustment: 50,
    });
  }

  if (diamond && matte) {
    await PartVariation.create({
      part1: diamond.id,
      part2: matte.id,
      priceAdjustment: 35,
    });
  }
};

const initDB = async () => {
  try {
    await sequelize.sync({ force: true }); // Elimina y recrea las tablas
    console.log("Database synchronized");

    await insertParts();
    console.log("Parts inserted");

    await insertVariations();
    console.log("Variations inserted");

    console.log("Database initialized with sample data");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDB();
