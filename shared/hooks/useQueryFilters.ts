import { useEffect } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';

import { IFilters } from '@/shared/hooks';

export const useQueryFilters = (filter: IFilters) => {
    const router = useRouter();

    useEffect(() => {
        const obj = {
            ...filter.prices,
            typePizza: Array.from(filter.selectedTypePizza),
            sizePizza: Array.from(filter.selectedSizePizza),
            ingredients: Array.from(filter.selectedIngredient),
        };

        const urlParams = qs.stringify(obj, {
            arrayFormat: 'comma',
        });

        router.push(`?${urlParams}`, {
            scroll: false,
        });
    }, [filter]);
};
