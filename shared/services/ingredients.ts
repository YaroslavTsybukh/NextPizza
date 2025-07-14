import { Ingredient } from '@prisma/client';
import { baseInstance } from './instances';

export const getIngredients = async (): Promise<Ingredient[]> => {
    const { data } = await baseInstance.get<Ingredient[]>('/ingredients');

    return data;
};
