import { FC, InputHTMLAttributes } from 'react';
import { ClearButton, ErrorText, RequiredSymbol } from '../';
import { Input } from '../../ui';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: FC<IProps> = ({ name, label, required, className, ...props }) => {
    const onClickClear = () => console.log('clear');

    return (
        <div className={className}>
            {label && (
                <p className="mb-2 font-medium">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input className="text-md h-12" {...props} />

                <ClearButton onClick={onClickClear} />
            </div>

            <ErrorText text="Поля обязательны для заполнения" className="mt-2" />
        </div>
    );
};
