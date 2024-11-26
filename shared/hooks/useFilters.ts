import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSet } from 'react-use';

interface IPricesProps {
    priceFrom?: number;
    priceTo?: number;
}

interface IFilter {
    selectedIngredient: Set<string>;
    selectedTypePizza: Set<string>;
    selectedSizePizza: Set<string>;
    prices: IPricesProps;
}

export interface IFilters extends IFilter {
    toggleIngredient: (id: string) => void;
    toggleTypePizza: (id: string) => void;
    toggleSizePizza: (id: string) => void;
    updatePrice: (priceName: keyof IPricesProps, value: number) => void;
}

export const useFilters = (): IFilters => {
    const searchParams = useSearchParams();

    const [selectedIngredient, { toggle: toggleIngredient }] = useSet(new Set<string>(searchParams.get('ingredient')?.split(',')));
    const [selectedTypePizza, { toggle: toggleTypePizza }] = useSet(
        new Set<string>(searchParams.has('typePizza') ? searchParams.get('typePizza')?.split(',') : []),
    );
    const [selectedSizePizza, { toggle: toggleSizePizza }] = useSet(
        new Set<string>(searchParams.has('sizePizza') ? searchParams.get('sizePizza')?.split(',') : []),
    );
    const [prices, setPrice] = useState<IPricesProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof IPricesProps, value: number) => {
        setPrice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        selectedIngredient,
        selectedTypePizza,
        selectedSizePizza,
        prices,
        toggleIngredient,
        toggleTypePizza,
        toggleSizePizza,
        updatePrice,
    };
};
