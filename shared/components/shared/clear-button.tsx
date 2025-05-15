import { FC } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

interface IProps {
    onClick: VoidFunction;
    className?: string;
}

export const ClearButton: FC<IProps> = ({ onClick, className }) => {
    return (
        <button onClick={onClick} className={cn('absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100', className)}>
            <X className="h-5 w-5" />
        </button>
    );
};
