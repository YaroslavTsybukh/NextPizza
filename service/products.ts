import { Product } from '@prisma/client';
import { axiosInstance } from './instance';

export const searchProducts = async (search: string): Promise<Product[]> => {
    const { data } = await axiosInstance.get<Product[]>('/products/search', {
        params: {
            query: search,
        },
    });

    return data;
};
