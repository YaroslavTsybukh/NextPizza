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
        imageUrl: '/assets/images/ingredients/cheese_border.png',
    },
    {
        name: 'Сливочная моцарелла',
        price: 79,
        imageUrl: '/assets/images/ingredients/mozzarella.png',
    },
    {
        name: 'Сыры чеддер и пармезан',
        price: 79,
        imageUrl: '/assets/images/ingredients/cheddar_and_parmesan_cheeses.png',
    },
    {
        name: 'Острый перец халапеньо',
        price: 59,
        imageUrl: '/assets/images/ingredients/hot_pepper.png',
    },
    {
        name: 'Нежный цыпленок',
        price: 79,
        imageUrl: '/assets/images/ingredients/chicken.png',
    },
    {
        name: 'Шампиньоны',
        price: 59,
        imageUrl: '/assets/images/ingredients/champignons.png',
    },
    {
        name: 'Ветчина',
        price: 79,
        imageUrl: '/assets/images/ingredients/ham.png',
    },
    {
        name: 'Пикантная пепперони',
        price: 79,
        imageUrl: '/assets/images/ingredients/pepperoni.png',
    },
    {
        name: 'Острая чоризо',
        price: 79,
        imageUrl: '/assets/images/ingredients/chorizo.png',
    },
    {
        name: 'Маринованные огурчики',
        price: 59,
        imageUrl: '/assets/images/ingredients/pickled_cucumbers.png',
    },
    {
        name: 'Свежие томаты',
        price: 59,
        imageUrl: '/assets/images/ingredients/tomatoes.png',
    },
    {
        name: 'Красный лук',
        price: 59,
        imageUrl: '/assets/images/ingredients/red_onion.png',
    },
    {
        name: 'Сочные ананасы',
        price: 59,
        imageUrl: '/assets/images/ingredients/pineapple.png',
    },
    {
        name: 'Итальянские травы',
        price: 39,
        imageUrl: '/assets/images/ingredients/italian_herbs.png',
    },
    {
        name: 'Сладкий перец',
        price: 59,
        imageUrl: '/assets/images/ingredients/sweet_pepper.png',
    },
    {
        name: 'Кубики брынзы',
        price: 79,
        imageUrl: '/assets/images/ingredients/brynza_cheese.png',
    },
    {
        name: 'Митболы',
        price: 79,
        imageUrl: '/assets/images/ingredients/meatball.png',
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
        imageUrl: '/assets/images/products/cocktails/banana.png',
        categoryId: 4,
    },
    {
        name: 'Карамельное яблоко молочный коктейль',
        imageUrl: '/assets/images/products/cocktails/caramel_apple.png',
        categoryId: 4,
    },
    {
        name: 'Молочный коктейль с печеньем Орео',
        imageUrl: '/assets/images/products/cocktails/oreo_cookies.png',
        categoryId: 4,
    },
    {
        name: 'Классический молочный коктейль 👶',
        imageUrl: '/assets/images/products/cocktails/classic.png',
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
