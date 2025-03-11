import { prisma } from '@/prisma/prisma-client';

export interface IGetSearchParams {
    query?: string;
    sortBy?: string;
    sizePizza?: string;
    typePizza?: string;
    priceFrom?: string;
    priceTo?: string;
    ingredients?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: IGetSearchParams) => {
    const sizes = params.sizePizza?.split(',').map(Number);
    const pizzaTypes = params.typePizza?.split(',').map(Number);
    const ingredientsIdArr = params.ingredients?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc',
                },
                where: {
                    ingredients: ingredientsIdArr
                        ? {
                              some: {
                                  id: {
                                      in: ingredientsIdArr,
                                  },
                              },
                          }
                        : undefined,
                    items: {
                        some: {
                            size: {
                                in: sizes,
                            },
                            pizzaType: {
                                in: pizzaTypes,
                            },
                            price: {
                                gte: minPrice, // >=
                                lte: maxPrice, // <=
                            },
                        },
                    },
                },
                include: {
                    ingredients: true,
                    items: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                            price: 'asc',
                        },
                    },
                },
            },
        },
    });

    return categories;
};
