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
    getCartItems: () => Promise<void>;

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

    getCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const totalCartDetails = await Api.cart.getCartItems();
            set(getCartDetails(totalCartDetails));
        } catch (e) {
            if (e instanceof Error) {
                console.log(e);
            }
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const res = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(res));
        } catch (e) {
            if (e instanceof Error) {
                console.log(e);
            }
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    addCartItem: async (values: any) => {},
    removeCartItem: async (id: number) => {},
}));
