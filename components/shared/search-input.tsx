'use client';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FC, useState, useRef, useEffect, ChangeEvent } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { Product } from '@prisma/client';
import { Api } from '@/service/api-client';

interface IProps {
    className?: string;
}

export const SearchInput: FC<IProps> = ({ className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [focused, setFocused] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleClickOnItem = () => {
        setFocused(false);
        setSearchQuery('');
    };

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        () => {
            Api.products
                .searchProducts(searchQuery)
                .then((items) => setProducts(items))
                .catch((error) => console.log(error));
        },
        250,
        [searchQuery],
    );

    return (
        <>
            {focused && (
                <div className="fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/50" />
            )}

            <div
                ref={ref}
                className={cn(
                    'relative z-30 flex h-11 flex-1 justify-between rounded-2xl',
                    className,
                )}
            >
                <Search className="absolute left-3 top-1/2 h-5 translate-y-[-50%] text-gray-400" />
                <input
                    className="w-full rounded-2xl bg-gray-100 pl-11 outline-none"
                    type="text"
                    placeholder="Найти пиццу..."
                    onFocus={() => setFocused(true)}
                    onChange={handleChange}
                    value={searchQuery}
                />
                {products.length > 0 && (
                    <div
                        className={cn(
                            'invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
                            focused && 'visible top-12 opacity-100',
                        )}
                    >
                        {products.map((product) => (
                            <Link
                                className="flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10"
                                href={`/product/${product.id}`}
                                key={product.id}
                                onClick={handleClickOnItem}
                            >
                                <Image
                                    className="rounded-sm"
                                    width={32}
                                    height={32}
                                    src={product.imageUrl}
                                    alt={`image ${product.id}`}
                                />
                                <span>{product.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
