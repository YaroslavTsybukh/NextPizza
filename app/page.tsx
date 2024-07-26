import Image from 'next/image';
import { Container, Filters, Title, TopBar } from '@/components/shared';

export default function Home() {
    return (
        <>
            <Container className="mt-5">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>

            <TopBar />

            <Container className="mb-14">
                <div className="flex gap-[60px]">
                    <Filters />

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            Список товаров
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
