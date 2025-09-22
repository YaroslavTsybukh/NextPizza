import { FC } from 'react';

import { FormTextArea, WhiteBlock, AddressInput } from '@/shared/components';

interface IProps {
    className?: string;
}

export const CheckoutAddressForm: FC<IProps> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <AddressInput />
                <FormTextArea name="comment" className="text-base" placeholder="Укажите комментарий к заказу" rows={5} />
            </div>
        </WhiteBlock>
    );
};
