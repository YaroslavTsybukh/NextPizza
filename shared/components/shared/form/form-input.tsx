import { FC, InputHTMLAttributes, ChangeEvent, MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { ClearButton, ErrorText, RequiredSymbol, Input } from '@/shared/components';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
    value?: string;
    type: string;
    placeholder: string;
    required?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
}

export const FormInput: FC<IProps> = ({ name, label, className, onChange, onClear, ...props }) => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const value = watch(name);

    const errorText = errors[name]?.message as string;

    const { onChange: rhfOnChange, ...restRegister } = register(name);

    const onClickClear = (e: MouseEvent<HTMLButtonElement>) => {
        setValue(name, '', { shouldValidate: true });

        onClear?.();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);

        rhfOnChange(e);
    };

    return (
        <div className={className}>
            {label && (
                <p className="mb-2 font-medium">
                    {label} {props.required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input value={value} className="text-md h-12" onChange={handleChange} {...props} {...restRegister} />

                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    );
};
