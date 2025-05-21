import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaType } from '@/shared/constants';
import { calcTotalPizzaPrice } from '@/shared/lib';

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    productItems: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPizzaPrice = calcTotalPizzaPrice(type, size, productItems, ingredients, selectedIngredients);
    const textDetaills = `${size}см, ${mapPizzaType[type]} пицца`;

    return {
        totalPizzaPrice,
        textDetaills,
    };
};
