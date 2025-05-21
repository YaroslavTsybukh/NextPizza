import { FC } from 'react';
import { Minus, Plus } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components';

interface IProps {
    size?: 'sm' | 'lg';
    disabled?: boolean;
    type?: 'minus' | 'plus';
    onClick?: () => void;
}

export const CountIconButton: FC<IProps> = ({ size, disabled, type, onClick }) => {
    return (
        <Button
            className={cn(
                'p-0 hover:bg-primary hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400',
                size === 'sm' ? 'h-[30px] w-[30px] rounded-[10px]' : 'h-[38px] w-[38px] rounded-md',
            )}
            variant="outline"
            disabled={disabled}
            onClick={onClick}
            type="button"
        >
            {type === 'plus' ? <Plus className={size === 'sm' ? 'h-4' : 'h-5'} /> : <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />}
        </Button>
    );
};
