import { ICartItemDTO } from '@/@types/dto/cart-dto';

export const calcCartItemTotalPrice = (cartItem: ICartItemDTO): number => {
    const totalPriceIngredients = cartItem.ingredients.reduce((sum, currect) => sum + currect.price, 0);

    return (totalPriceIngredients + cartItem.productItem.price) * cartItem.quantity;
};
