import { create } from 'zustand';
import { Api } from '../services/api-client';
import { getCartDetails } from '../lib';
import { ICartStateItem } from '../lib/get-cart-details';

export interface ICartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: ICartStateItem[];

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;

    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    /* Запрос на добавление товара в корзину */
    //TODO: типизировать values
    addCartItem: (values: any) => Promise<void>;

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<ICartState>()((set) => ({
    items: [],
    error: false,
    totalAmount: 0,
    loading: false,

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const totalCartDetails = await Api.cart.fetchCartItems();
            set(getCartDetails(totalCartDetails));
        } catch (e) {
            if (e instanceof Error) {
                console.log(e);
            }
            set({ error: true });
        } finally {
            set({ loading: false, error: false });
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {},
    addCartItem: async (values: any) => {},
    removeCartItem: async (id: number) => {},
}));
