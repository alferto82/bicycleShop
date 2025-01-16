// services/customizationService.ts
import { Op } from "sequelize";
import Part from "../models/Part";
import PartVariation from "../models/PartVariation";
import Combination from "../models/Combination";

const validateCombination = async (partIds: number[]): Promise<number> => {
  let totalPrice = 0;

  // Obtener detalles de las partes seleccionadas
  const parts = await Part.findAll({
    where: { id: { [Op.in]: partIds } },
  });

  // Validar si todas las partes existen y están en stock
  if (parts.length !== partIds.length) {
    throw new Error("Some parts do not exist or are unavailable.");
  }

  // Calcular el precio base y validar el stock
  parts.forEach((part) => {
    if (!part.inStock) {
      throw new Error(`${part.id} is out of stock`);
    }
    totalPrice += part.price;
  });

  // Validar si las combinaciones de partes son permitidas
  const invalidCombinations = await Combination.findAll({
    where: {
      [Op.or]: [
        {
          part1: { [Op.in]: partIds },
          part2: { [Op.in]: partIds },
          allowed: false,
        },
      ],
    },
  });

  if (invalidCombinations.length > 0) {
    const invalidPairs = invalidCombinations.map(
      (combination) => `${combination.part1} and ${combination.part2}`
    );

    throw new Error(
      `The following combinations are not allowed: ${invalidPairs.join(", ")}`
    );
  }

  // Buscar todas las variaciones relacionadas con los IDs de partes
  const partVariations = await PartVariation.findAll({
    where: {
      partIds: {
        [Op.overlap]: partIds, // Buscar variaciones que incluyan al menos uno de los IDs
      },
    },
  });

  // Aplicar ajustes de precio según las variaciones
  (partVariations || []).forEach((variation) => {
    // Si la variación aplica a todas las partes seleccionadas
    if (partIds.every((id) => variation.partIds.includes(id))) {
      totalPrice += variation.priceAdjustment;
    }
  });

  return totalPrice;
};

export { validateCombination };
