import { ICartDTO, ICreateCartItemValues } from '@/@types/dto/cart-dto';
import { baseInstance } from './instances';

export const getCartItems = async (): Promise<ICartDTO> => {
    const { data } = await baseInstance.get<ICartDTO>('/cart');

    return data;
};

export const updateItemQuantity = async (cartId: number, quantity: number): Promise<ICartDTO> => {
    const { data } = await baseInstance.patch<ICartDTO>('/cart/' + cartId, { quantity });

    return data;
};

export const removeCartItem = async (id: number): Promise<ICartDTO> => {
    const { data } = await baseInstance.delete<ICartDTO>(`/cart/${id}`);

    return data;
};

export const addCartItem = async (values: ICreateCartItemValues): Promise<ICartDTO> => {
    const { data } = await baseInstance.post<ICartDTO>('/cart', values);

    return data;
};
