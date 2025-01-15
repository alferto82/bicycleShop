// services/customizationService.ts
import Combination from "../models/Combination";
import Part from "../models/Part";

interface PartInput {
  name: string;
}

const validateCombination = async (parts: PartInput[]): Promise<number> => {
  let totalPrice = 0;

  for (const part of parts) {
    const partDetails = await Part.findOne({ where: { name: part.name } });
    if (!partDetails || !partDetails.inStock) {
      throw new Error(`${part.name} is out of stock`);
    }
    totalPrice += partDetails.price;
  }

  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) {
      const combination = await Combination.findOne({
        where: { part1: parts[i].name, part2: parts[j].name },
      });
      if (combination && !combination.allowed) {
        throw new Error(
          `Invalid combination: ${parts[i].name} and ${parts[j].name}`
        );
      }
    }
  }

  return totalPrice;
};

export { validateCombination };
