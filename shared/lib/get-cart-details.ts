import { ICartDTO } from '@/@types/dto/cart-dto';
import { calcCartItemTotalPrice } from '.';

export interface ICartStateItem {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    disabled?: boolean;
    ingredients: Array<{ name: string; price: number }>;
}

interface IReturnProps {
    items: ICartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (totalCartDetails: ICartDTO): IReturnProps => {
    const items = totalCartDetails.items.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity,
        name: cartItem.productItem.product.name,
        imageUrl: cartItem.productItem.product.imageUrl,
        price: calcCartItemTotalPrice(cartItem),
        pizzaSize: cartItem.productItem.size,
        pizzaType: cartItem.productItem.pizzaType,
        disabled: false,
        ingredients: cartItem.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    })) as ICartStateItem[];

    return {
        items,
        totalAmount: totalCartDetails.totalAmount,
    };
};
