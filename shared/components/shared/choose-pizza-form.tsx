'use client';

import { FC, useEffect, useState } from 'react';
import { useSet } from 'react-use';

import { Ingredient, ProductItem } from '@prisma/client';
// import { cn } from '@/shared/lib/utils';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { getPizzaDetails, getAvailablePizzaSizes, cn } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

import { Button } from '../ui/button';
import { GroupVariants, Title, PizzaImage, IngredientItem } from '.';

interface IProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    productItems: ProductItem[];
    // loading?: boolean;
    className?: string;
}

export const ChoosePizzaForm: FC<IProps> = ({
    imageUrl,
    name,
    ingredients,
    productItems,
    // loading,
    className,
}) => {
    const { type, size, availableSizes, selectedIngredients, setSize, setType, addIngredient } = usePizzaOptions(productItems);

    const { totalPizzaPrice, textDetaills } = getPizzaDetails(type, size, productItems, ingredients, selectedIngredients);

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
