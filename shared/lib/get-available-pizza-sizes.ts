import { ProductItem } from '@prisma/client';
import { PizzaType, pizzaSizes } from '../constants';
import { Variant } from '../components/shared/group-variants';

export const getAvailablePizzaSizes = (type: PizzaType, productItems: ProductItem[]): Variant[] => {
    const filteredPizzasByType = productItems.filter((item) => item.pizzaType === type);

    return pizzaSizes.map((pizzaSize) => ({
        name: pizzaSize.name,
        value: pizzaSize.value,
        disabled: !filteredPizzasByType.some((filteredPizzasByType) => Number(filteredPizzasByType.size) == Number(pizzaSize.value)),
    }));
};
