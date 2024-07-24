import { cn } from '@/lib/utils';
import { FC } from 'react';

const categories = [
    'Все',
    'Мясные',
    'Острые',
    'Сладкие',
    'Вегетарианские',
    'С курицей',
    'Еще',
];
const activeIndex = 0;

export const Categories: FC<{ className?: string }> = ({ className }) => {
    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-2xl bg-gray-50 p-1',
                className,
            )}
        >
            {categories.map((item, idx) => (
                <a
                    className={cn(
                        'flex h-11 items-center rounded-2xl px-5 font-bold',
                        activeIndex === idx &&
                            'bg-white text-primary shadow-md shadow-gray-200',
                    )}
                    key={idx}
                >
                    {item}
                </a>
            ))}
        </div>
    );
};
