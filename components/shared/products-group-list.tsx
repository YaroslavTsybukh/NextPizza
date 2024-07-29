'use client';

import { FC, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/categories';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';

interface IProps {
    title: string;
    items: any[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: FC<IProps> = ({
    title,
    items,
    className,
    listClassName,
    categoryId,
}) => {
    const setActiveId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) setActiveId(categoryId);
    }, [intersection?.isIntersecting]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="mb-5 font-extrabold" />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map((product, idx) => (
                    <ProductCard
                        key={idx}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                    />
                ))}
            </div>
        </div>
    );
};
