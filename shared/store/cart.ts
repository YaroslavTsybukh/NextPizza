import { create } from 'zustand';

import { ICreateCartItemValues } from '@/@types/dto/cart-dto';
import { getCartDetails, ICartStateItem } from '@/shared/lib';
import { Api } from '@/shared/services/api-client';

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
    addCartItem: (values: ICreateCartItemValues) => Promise<void>;

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<ICartState>()((set) => ({
    items: [],
    error: false,
    totalAmount: 0,
    loading: true,

    getCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const totalCartDetails = await Api.cart.getCartItems();
            set(getCartDetails(totalCartDetails));
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
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
                console.error(e);
            }
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    addCartItem: async (values: ICreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const res = await Api.cart.addCartItem(values);
            set(getCartDetails(res));
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
            }
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set((state) => ({
                loading: true,
                error: false,
                items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
            }));
            const res = await Api.cart.removeCartItem(id);
            set(getCartDetails(res));
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
            }
            set({ error: true });
        } finally {
            set((state) => ({
                loading: false,
                items: state.items.map((item) => ({ ...item, disabled: false })),
            }));
        }
    },
}));
