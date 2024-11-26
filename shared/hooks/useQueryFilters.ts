import { useEffect } from 'react';
import qs from 'qs';
import { IFilters } from './useFilters';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filter: IFilters) => {
    const router = useRouter();

    useEffect(() => {
        const obj = {
            ...filter.prices,
            typePizza: Array.from(filter.selectedTypePizza),
            sizePizza: Array.from(filter.selectedSizePizza),
            ingredient: Array.from(filter.selectedIngredient),
        };

        const urlParams = qs.stringify(obj, {
            arrayFormat: 'comma',
        });

        router.push(`?${urlParams}`, {
            scroll: false,
        });
    }, [filter, router]);
};
