import { ICartDTO } from '@/@types/dto/cart-dto';
import { axiosInstance } from './instance';

export const getCartItems = async (): Promise<ICartDTO> => {
    const { data } = await axiosInstance.get<ICartDTO>('/cart');

    return data;
};

export const updateItemQuantity = async (cartId: number, quantity: number): Promise<ICartDTO> => {
    const { data } = await axiosInstance.patch<ICartDTO>('/cart/' + cartId, { quantity });

    return data;
};
