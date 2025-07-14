import { Product } from '@prisma/client';
import { baseInstance } from './instances';

export const searchProducts = async (search: string): Promise<Product[]> => {
    const { data } = await baseInstance.get<Product[]>('/products/search', {
        params: {
            query: search,
        },
    });

    return data;
};
