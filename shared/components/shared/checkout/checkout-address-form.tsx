import { FC } from 'react';

import { Input, FormTextArea, WhiteBlock } from '@/shared/components';

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
