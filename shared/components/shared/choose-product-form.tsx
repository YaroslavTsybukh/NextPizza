import { FC } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button, ProductImage, Title } from '@/shared/components';

interface IProps {
    imageUrl: string;
    name: string;
    price?: number;
    onSubmit?: VoidFunction;
    loading?: boolean;
    className?: string;
}

export const ChooseProductForm: FC<IProps> = ({ name, imageUrl, price, onSubmit, loading, className }) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className="relative flex w-full flex-1 items-center justify-center">
                <ProductImage src={imageUrl} size={20} alt="Изображение продукта" />
            </div>

            <div className="w-[490px] rounded-lg bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="mb-1 font-extrabold" />

                <Button loading={loading} onClick={() => onSubmit?.()} className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base">
                    Добавить в корзину за {price} грн.
                </Button>
            </div>
        </div>
    );
};
