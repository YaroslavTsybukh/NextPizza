import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

import { ProductItem } from '@prisma/client';

import { Variant } from '../components/shared/group-variants';
import { PizzaSize, PizzaType } from '../constants';
import { getAvailablePizzaSizes } from '../lib';

interface IReturnValues {
    type: PizzaType;
    size: PizzaSize;
    availableSizes: Variant[];
    selectedIngredients: Set<number>;
    currentProductItemId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (productItems: ProductItem[]): IReturnValues => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    const availableSizes = getAvailablePizzaSizes(type, productItems);

    const currentProductItemId = productItems.find((productItem) => productItem.pizzaType == type && productItem.size == size)?.id;

    useEffect(() => {
        const isAvailableSize = availableSizes.find((availableSize) => Number(availableSize.value) === size && !availableSize.disabled);

        const availableSize = availableSizes.find((availableSize) => !availableSize.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        type,
        size,
        availableSizes,
        selectedIngredients,
        currentProductItemId,
        setSize,
        setType,
        addIngredient,
    };
};
