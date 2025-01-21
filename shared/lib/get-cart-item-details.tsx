import { ICartStateItem } from './get-cart-details';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getCartItemDetails = (pizzaType: PizzaType, pizzaSize: PizzaSize, ingredients: ICartStateItem['ingredients']): string => {
    const details = [];

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize}см`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
};
