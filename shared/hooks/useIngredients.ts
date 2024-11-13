import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import axios from 'axios';
import { Api } from '@/shared/services/api-client';

interface ReturnValues {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useIngredient = (): ReturnValues => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                setLoading(true);

                const res = await Api.ingredients.getIngredients();
                setIngredients(res);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    console.log(e.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchIngredient();
    }, []);

    return {
        ingredients,
        loading,
    };
};
