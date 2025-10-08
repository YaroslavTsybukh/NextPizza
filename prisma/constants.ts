export const categories = [
    {
        name: 'Пиццы',
    },
    {
        name: 'Завтрак',
    },
    {
        name: 'Закуски',
    },
    {
        name: 'Коктейли',
    },
    {
        name: 'Напитки',
    },
];

export const _ingredients = [
    {
        name: 'Сырный бортик',
        price: 179,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        name: 'Сливочная моцарелла',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        name: 'Сыры чеддер и пармезан',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
        name: 'Острый перец халапеньо',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        name: 'Нежный цыпленок',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
        name: 'Шампиньоны',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
        name: 'Ветчина',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
        name: 'Пикантная пепперони',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
        name: 'Острая чоризо',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
        name: 'Маринованные огурчики',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
        name: 'Свежие томаты',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
        name: 'Красный лук',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
        name: 'Сочные ананасы',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
        name: 'Итальянские травы',
        price: 39,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        name: 'Сладкий перец',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
        name: 'Кубики брынзы',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
        name: 'Митболы',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
    {
        name: 'Омлет с ветчиной и грибами',
        imageUrl: '/assets/images/products/breakfast/omelet_with_ham_and_mushrooms.png',
        categoryId: 2,
    },
    {
        name: 'Омлет с пепперони',
        imageUrl: '/assets/images/products/breakfast/omelet_with_pepperoni.png',
        categoryId: 2,
    },
    {
        name: 'Кофе Латте',
        imageUrl: '/assets/images/products/drinks/latte.png',
        categoryId: 2,
    },
    {
        name: 'Сэнвич ветчина и сыр',
        imageUrl: '/assets/images/products/appetizers/ham_and_cheese_sandwich.png',
        categoryId: 3,
    },
    {
        name: 'Куриные наггетсы',
        imageUrl: '/assets/images/products/appetizers/chicken_nuggets.png',
        categoryId: 3,
    },
    {
        name: 'Картофель из печи с соусом 🌱',
        imageUrl: '/assets/images/products/appetizers/baked_potatoes_with_sauce.png',
        categoryId: 3,
    },
    {
        name: 'Додстер',
        imageUrl: '/assets/images/products/appetizers/dodster.png',
        categoryId: 3,
    },
    {
        name: 'Острый Додстер 🌶️🌶️',
        imageUrl: '/assets/images/products/appetizers/sharp_dodster.png',
        categoryId: 3,
    },
    {
        name: 'Банановый молочный коктейль',
        imageUrl: '/assets/images/products/сocktails/banana.png',
        categoryId: 4,
    },
    {
        name: 'Карамельное яблоко молочный коктейль',
        imageUrl: '/assets/images/products/сocktails/caramel_apple.png',
        categoryId: 4,
    },
    {
        name: 'Молочный коктейль с печеньем Орео',
        imageUrl: '/assets/images/products/сocktails/oreo_cookies.png',
        categoryId: 4,
    },
    {
        name: 'Классический молочный коктейль 👶',
        imageUrl: '/assets/images/products/сocktails/classic.png',
        categoryId: 4,
    },
    {
        name: 'Ирландский Капучино',
        imageUrl: '/assets/images/products/drinks/irish_cappuccino.png',
        categoryId: 5,
    },
    {
        name: 'Кофе Карамельный капучино',
        imageUrl: '/assets/images/products/drinks/caramel_cappuccino.png',
        categoryId: 5,
    },
    {
        name: 'Кофе Кокосовый латте',
        imageUrl: '/assets/images/products/drinks/coconut_latte.png',
        categoryId: 5,
    },
    {
        name: 'Кофе Американо',
        imageUrl: '/assets/images/products/drinks/american.png',
        categoryId: 5,
    },
    {
        name: 'Кофе Латте',
        imageUrl: '/assets/images/products/drinks/latte.png',
        categoryId: 5,
    },
];
