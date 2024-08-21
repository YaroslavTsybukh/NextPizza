import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';

enum Size {
    Small = 20,
    Middle = 30,
    Large = 40,
}

interface IProps {
    className?: string;
    src: string;
    size: Size.Small | Size.Middle | Size.Large;
}

export const ProductImage: FC<IProps> = ({ className, src, size }) => {
    return (
        <div
            className={cn(
                'relative flex w-full flex-1 items-center justify-center',
                className,
            )}
        >
            <Image
                width={
                    size === Size.Small ? 300 : size === Size.Middle ? 400 : 500
                }
                height={
                    size === Size.Small ? 300 : size === Size.Middle ? 400 : 500
                }
                src={src}
                alt="Logo"
                className="relative left-2 top-2 z-10 transition-all duration-300"
            />

            <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-200" />
            <div className="absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-gray-100" />
        </div>
    );
};
