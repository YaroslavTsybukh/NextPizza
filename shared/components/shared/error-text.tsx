import { FC } from 'react';
import { cn } from '@/shared/lib/utils';

interface IProps {
    text: string;
    className?: string;
}

export const ErrorText: FC<IProps> = ({ text, className }) => {
    return <p className={cn('text-sm text-red-500', className)}>{text}</p>;
};
