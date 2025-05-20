import { FC, TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import { Textarea } from '../../ui';
import { ClearButton } from '../';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormTextArea: FC<IProps> = ({ name, label, required, className, ...props }) => {
    const { register, watch, setValue } = useFormContext();

    const value = watch(name);

    const onClickClear = () => {
        setValue(name, '');
    };

    return (
        <div className={className}>
            <p className="mb-2 font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </p>

            <div className="relative">
                <Textarea className="text-md h-12" {...props} {...register(name)} />

                {value && <ClearButton onClick={onClickClear} />}
            </div>
        </div>
    );
};
