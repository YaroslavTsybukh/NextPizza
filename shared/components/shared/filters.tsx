'use client';

import { FC } from 'react';

import { useFilters, useIngredient, useQueryFilters } from '@/shared/hooks';
import { Input, Title, RangeSlider, CheckboxFiltersGroup } from '@/shared/components';

export const Filters: FC = () => {
    const { loading, ingredients } = useIngredient();
    const filter = useFilters();

    useQueryFilters(filter);

    const items = ingredients.map((ingredient) => ({
        value: String(ingredient.id),
        text: ingredient.name,
    }));

    const updatePrice = (values: number[]) => {
        filter.updatePrice('priceFrom', values[0]);
        filter.updatePrice('priceTo', values[1]);
    };

    return (
        <div className="w-[250px]">
            <Title text="Фильтрация" className="mb-5 border-b border-b-neutral-100 pb-4 font-bold" />

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={filter.toggleTypePizza}
                selected={filter.selectedTypePizza}
                items={[
                    { text: 'Традиционное', value: '1' },
                    { text: 'Тонкое', value: '2' },
                ]}
            />
            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={filter.toggleSizePizza}
                selected={filter.selectedSizePizza}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
            />
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="mb-3 font-bold">Цена от и до:</p>
                <div className="mb-5 flex gap-3">
                    <Input
                        type="number"
                        min={0}
                        max={1000}
                        value={filter.prices.priceFrom}
                        placeholder="0"
                        onChange={(e) => filter.updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={0}
                        max={1000}
                        value={filter.prices.priceTo}
                        placeholder="1000"
                        onChange={(e) => {
                            filter.updatePrice('priceTo', Number(e.target.value));
                        }}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[filter.prices.priceFrom || 0, filter.prices.priceTo || 1000]}
                    onValueChange={updatePrice}
                />
            </div>
            <CheckboxFiltersGroup
                name="ingredients"
                className="mt-5"
                title="Ингредиенты:"
                limit={6}
                loading={loading}
                defaultItems={items}
                items={items}
                onClickCheckbox={filter.toggleIngredient}
                selected={filter.selectedIngredient}
            />
        </div>
    );
};
