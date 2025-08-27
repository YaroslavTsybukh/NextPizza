import { Ingredient, Product, ProductItem, CartItem } from '@prisma/client';

export interface IUserCart extends CartItem {
    ingredients: Ingredient[];
    productItem: ProductItem & {
        product: Product;
    };
}
