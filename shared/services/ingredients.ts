import { Ingredient } from '@prisma/client';
import { axiosInstance } from './instance';

export const getIngredients = async (): Promise<Ingredient[]> => {
    const { data } = await axiosInstance.get<Ingredient[]>('/ingredients');

    return data;
};
