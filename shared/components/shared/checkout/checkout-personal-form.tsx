import { FC } from 'react';

import { FormInput, WhiteBlock } from '@/shared/components';

interface IProps {
    className?: string;
}

export const CheckoutPersonalForm: FC<IProps> = ({ className }) => {
    return (
        <WhiteBlock title="2. Персональная информация" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput type="text" name="firstName" className="text-base" placeholder="Имя" />
                <FormInput type="text" name="lastName" className="text-base" placeholder="Фамилия" />
                <FormInput type="email" name="email" className="text-base" placeholder="E-mail" />
                <FormInput type="tel" name="phone" className="text-base" placeholder="Телефон" />
            </div>
        </WhiteBlock>
    );
};
