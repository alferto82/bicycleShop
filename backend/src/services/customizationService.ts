import { Op } from "sequelize";
import Part from "../models/Part";
import PartVariation from "../models/PartVariation";
import Combination from "../models/Combination";

const validateCombination = async (
  partIds: number[]
): Promise<{ totalPrice: number; errorMessage?: string }> => {
  let totalPrice = 0;

  // Obtener detalles de las partes seleccionadas
  const parts = await Part.findAll({
    where: { id: { [Op.in]: partIds } },
  });

  // Validar si todas las partes existen y están en stock
  if (parts.length !== partIds.length) {
    return {
      totalPrice: 0,
      errorMessage: "Some parts do not exist or are unavailable.",
    };
  }

  // Calcular el precio base y validar el stock
  for (const part of parts) {
    if (!part.inStock) {
      return { totalPrice: 0, errorMessage: `${part.name} is out of stock` };
    }
    totalPrice += part.price;
  }

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
    const invalidPairs = invalidCombinations.map((combination) => [
      combination.part1,
      combination.part2,
    ]);
    const invalidPairsNames = invalidPairs.map(([part1Id, part2Id]) => {
      const part1Name = parts.find((part) => part.id === part1Id)?.name;
      const part2Name = parts.find((part) => part.id === part2Id)?.name;
      return `${part1Name} and ${part2Name}`;
    });

    return {
      totalPrice: 0,
      errorMessage: `The following combinations are not allowed: ${invalidPairsNames.join(
        " and "
      )}`,
    };
  }

  // Buscar todas las variaciones relacionadas con los IDs de partes
  const partVariations = await PartVariation.findAll();

  // Filtrar variaciones que incluyan al menos uno de los IDs
  const relevantVariations = partVariations.filter(
    (variation) =>
      partIds.includes(variation.part1) && partIds.includes(variation.part2)
  );

  // Aplicar ajustes de precio según las variaciones
  relevantVariations.forEach((variation) => {
    totalPrice += variation.priceAdjustment;
  });

  return { totalPrice };
};

const validateVariations = async (
  partIds: number[]
): Promise<{ priceAdjustment: number }> => {
  let priceAdjustment = 0;

  // Buscar todas las variaciones relacionadas con los IDs de partes
  const partVariations = await PartVariation.findAll();

  // Filtrar variaciones que incluyan al menos uno de los IDs
  const relevantVariations = partVariations.filter(
    (variation) =>
      partIds.includes(variation.part1) && partIds.includes(variation.part2)
  );

  // Aplicar ajustes de precio según las variaciones
  relevantVariations.forEach((variation) => {
    priceAdjustment += variation.priceAdjustment;
  });

  return { priceAdjustment };
};

export { validateCombination, validateVariations };
