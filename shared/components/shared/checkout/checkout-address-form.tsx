import { FC } from 'react';

import { Input } from '../../ui';
import { FormTextArea, WhiteBlock } from '../';

interface IProps {
    className?: string;
}

export const CheckoutAddressForm: FC<IProps> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Input name="address" className="text-base" placeholder="Укажите адресс" />

                <FormTextArea name="comment" className="text-base" placeholder="Укажите комментарий к заказу" rows={5} />
            </div>
        </WhiteBlock>
    );
};
