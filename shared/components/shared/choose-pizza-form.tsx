'use client';

import { FC, useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { PizzaSize, PizzaType, pizzaTypes, pizzaSizes, mapPizzaType } from '@/shared/constants/pizza';
import { GroupVariants, Title, PizzaImage, IngredientItem } from '.';
import { Button } from '../ui/button';

interface IProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    // loading?: boolean;
    className?: string;
}

export const ChoosePizzaForm: FC<IProps> = ({
    imageUrl,
    name,
    ingredients,
    items,
    // loading,
    className,
}) => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    //* Логика подсчета суммы пиццы
    const pizzaPrice = items.find((items) => items.pizzaType === type && items.size === size)?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((sum, current) => sum + current.price, 0);

    const totalPizzaPrice = pizzaPrice + totalIngredientsPrice;
    const textDetaills = `${size}см, ${mapPizzaType[type]} пицца`;
    // *

    // * Массив отфильтрованных пицц по типу и массив досустыпных размеров пицц.
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

    const availableSizes = pizzaSizes.map((pizzaSize) => ({
        name: pizzaSize.name,
        value: pizzaSize.value,
        disabled: !filteredPizzasByType.some((filteredPizzasByType) => Number(filteredPizzasByType.size) == Number(pizzaSize.value)),
    }));
    //*

    //* Логика отображения первой не disabled пиццы.
    useEffect(() => {
        const isAvailableSize = availableSizes.find((availableSize) => Number(availableSize.value) === size && !availableSize.disabled);

        const availableSize = availableSizes.find((availableSize) => !availableSize.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);
    //*

    const handleClickAdd = () => {
        console.log('handleClick');
    };

    const calcTotalPrice = () => {
        console.log();
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage src={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="lg" className="mb-1 font-extrabold" />

                <p className="text-gray-400">{textDetaills}</p>

                <div className="mt-5 flex flex-col gap-4">
                    <GroupVariants items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
                    <GroupVariants items={pizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
                </div>

                <Title text="Добавить по вкусу" size="md" className="mb-1 mt-5 font-extrabold" />

                <div className="scrollbar mt-3 h-[200px] overflow-auto rounded-md bg-gray-50 p-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    // loading={loading}
                    onClick={handleClickAdd}
                    className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
                >
                    Добавить в корзину за {totalPizzaPrice} грн.
                </Button>
            </div>
        </div>
    );
};
