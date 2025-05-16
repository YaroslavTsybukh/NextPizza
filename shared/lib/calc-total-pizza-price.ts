import { ProductItem, Ingredient } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants';

export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    productItems: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const pizzaPrice = productItems.find((productItem) => productItem.pizzaType === type && productItem.size === size)?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((sum, current) => sum + current.price, 0);

    return pizzaPrice + totalIngredientsPrice;
};
