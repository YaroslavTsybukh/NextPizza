import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { PizzaImage, Title } from '.';
import { Button } from '../ui/button';

interface IProps {
    imageUrl: string;
    name: string;
    price?: number;
    onSubmit?: VoidFunction;
    className?: string;
}

export const ChooseProductForm: FC<IProps> = ({ name, imageUrl, price, onSubmit, className }) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className="relative flex w-full flex-1 items-center justify-center">
                <img src={imageUrl} alt={name} className="relative left-2 top-2 z-10 h-[350px] w-[350px] transition-all duration-300" />
                {/* <PizzaImage src={imageUrl} size={size} /> */}
            </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="mb-1 font-extrabold" />

                <Button onClick={onSubmit} className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base">
                    Добавить в корзину за {price} грн.
                </Button>
            </div>
        </div>
    );
};
