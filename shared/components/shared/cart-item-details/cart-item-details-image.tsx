import { FC } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

interface IProps {
    src: string;
    className?: string;
}

export const CartItemDetailsImage: FC<IProps> = ({ src, className }) => {
    return <Image className={cn('h-[60px]', className)} src={src} width={60} height={60} alt="cartItemDetailsImage" />;
};
