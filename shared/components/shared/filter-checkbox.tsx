import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { Checkbox } from '../ui/checkbox';

export interface FilterCheckboxProps {
    text: string;
    value: string;
    endAdornment?: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export const FilterCheckbox: FC<FilterCheckboxProps> = ({
    text,
    value,
    endAdornment,
    onCheckedChange,
    checked,
    name,
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="h-6 w-6 rounded-[8px]"
                id={`checkbox-${name}-${value}`}
            />
            <label
                htmlFor={`checkbox-${name}-${value}`}
                className="flex-1 cursor-pointer leading-none"
            >
                {text}
            </label>
            {endAdornment}
        </div>
    );
};
