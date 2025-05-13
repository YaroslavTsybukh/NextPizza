import { FC } from 'react';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

interface IProps {
    name: string;
    price: number;
    imageUrl: string;
    onClick: () => void;
    active?: boolean;
    className?: string;
}

export const IngredientItem: FC<IProps> = ({ name, price, imageUrl, onClick, active, className }) => {
    return (
        <div
            className={cn(
                'relative flex w-32 cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md',
                { 'border border-primary': active },
                className,
            )}
            onClick={onClick}
        >
            {active && <CircleCheck className="absolute right-2 top-2 text-primary" />}
            <Image src={imageUrl} width={110} height={110} alt={name} />
            <span className="mb-1 text-xs">{name}</span>
            <span className="font-bold">{price}</span>
        </div>
    );
};
