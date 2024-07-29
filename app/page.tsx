import Image from 'next/image';
import {
    Container,
    Filters,
    ProductsGroupList,
    Title,
    TopBar,
} from '@/components/shared';

export default function Home() {
    return (
        <>
            <Container className="mt-5">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>

            <TopBar />

            <Container className="my-14">
                <div className="flex gap-[60px]">
                    <Filters />

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                items={[
                                    {
                                        id: 1,
                                        name: 'Мясная с аджикой',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                                        price: 549,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 2,
                                        name: 'Мясная с аджикой',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                                        price: 549,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 3,
                                        name: 'Мясная с аджикой',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                                        price: 549,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 4,
                                        name: 'Мясная с аджикой',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                                        price: 549,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 5,
                                        name: 'Мясная с аджикой',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                                        price: 549,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 6,
                                        name: 'Мясная с аджикой',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                                        price: 549,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 7,
                                        name: 'Мясная с аджикой',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
                                        price: 549,
                                        items: [{ price: 550 }],
                                    },
                                ]}
                                categoryId={1}
                            />
                            <ProductsGroupList
                                title="Закуски"
                                items={[
                                    {
                                        id: 1,
                                        name: 'Дэнвич ветчина и сыр',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
                                        price: 279,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 2,
                                        name: 'Дэнвич ветчина и сыр',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
                                        price: 279,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 3,
                                        name: 'Дэнвич ветчина и сыр',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
                                        price: 279,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 4,
                                        name: 'Дэнвич ветчина и сыр',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
                                        price: 279,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 5,
                                        name: 'Дэнвич ветчина и сыр',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
                                        price: 279,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 6,
                                        name: 'Дэнвич ветчина и сыр',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
                                        price: 279,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 7,
                                        name: 'Дэнвич ветчина и сыр',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
                                        price: 279,
                                        items: [{ price: 550 }],
                                    },
                                ]}
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
