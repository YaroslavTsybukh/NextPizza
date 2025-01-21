import { Cart, CartItem, Product, ProductItem, Ingredient } from '@prisma/client';

export type ICartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product;
    };
    ingredients: Ingredient[];
};

export interface ICartDTO extends Cart {
    items: ICartItemDTO[];
}
