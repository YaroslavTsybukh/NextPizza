import { Suspense } from 'react';

import { Container, Filters, ProductsGroupList, QueryToaster, Stories, Title, TopBar } from '@/shared/components';
import { IGetSearchParams, findPizzas } from '@/shared/lib';

export default async function HomePage({ searchParams }: { searchParams: IGetSearchParams }) {
    const categories = await findPizzas(searchParams);

    return (
        <>
            <Suspense fallback={null}>
                <QueryToaster />
            </Suspense>

            <section className="mt-5">
                <Container>
                    <Title text="Все пиццы" size="lg" className="font-extrabold" />
                </Container>
            </section>

            <section className="mt-5">
                <TopBar categories={categories.filter((category) => category.products.length > 0)} />
            </section>

            <section className="mt-10">
                <Stories />
            </section>

            <section className="my-14">
                <Container>
                    <div className="flex gap-[60px]">
                        <Suspense fallback={null}>
                            <Filters />
                        </Suspense>

                        <div className="flex-1">
                            <div className="flex flex-col gap-16">
                                {categories.map((category) => (
                                    <ProductsGroupList
                                        key={category.id}
                                        title={category.name}
                                        href={category.href}
                                        items={category.products}
                                        categoryId={category.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
