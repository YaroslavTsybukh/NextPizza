import { ICartDTO, ICreateCartItemValues } from '@/@types/dto/cart-dto';
import { axiosInstance } from './instance';

export const getCartItems = async (): Promise<ICartDTO> => {
    const { data } = await axiosInstance.get<ICartDTO>('/cart');

    return data;
};

export const updateItemQuantity = async (cartId: number, quantity: number): Promise<ICartDTO> => {
    const { data } = await axiosInstance.patch<ICartDTO>('/cart/' + cartId, { quantity });

    return data;
};

export const removeCartItem = async (id: number): Promise<ICartDTO> => {
    const { data } = await axiosInstance.delete<ICartDTO>(`/cart/${id}`);

    return data;
};

export const addCartItem = async (values: ICreateCartItemValues): Promise<ICartDTO> => {
    const { data } = await axiosInstance.post<ICartDTO>('/cart', values);

    return data;
};
