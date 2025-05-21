import { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import { ClearButton, ErrorText, RequiredSymbol, Input } from '@/shared/components';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: FC<IProps> = ({ name, label, required, className, ...props }) => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '', { shouldValidate: true });
    };

    return (
        <div className={className}>
            {label && (
                <p className="mb-2 font-medium">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input className="text-md h-12" {...props} {...register(name)} />

                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    );
};
