import { ICartDTO } from '@/@types/dto/cart-dto';
import { axiosInstance } from './instance';

export const fetchCartItems = async (): Promise<ICartDTO> => {
    const { data } = await axiosInstance.get<ICartDTO>('/cart');

    return data;
};
