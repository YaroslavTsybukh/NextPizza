import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { CountIconButton } from './count-icon-button';

interface IProps {
    className?: string;
    size?: 'sm' | 'lg';
    value?: number;
    onClick: (type: 'plus' | 'minus') => void;
}

export const CountButton: FC<IProps> = ({ className, size, value, onClick }) => {
    return (
        <div className={cn('inline-flex items-center justify-between gap-3', className)}>
            <CountIconButton size={size} type="minus" onClick={() => onClick('minus')} />
            <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
            <CountIconButton size={size} type="plus" onClick={() => onClick('plus')} />
        </div>
    );
};
