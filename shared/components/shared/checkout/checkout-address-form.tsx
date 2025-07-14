import { FC } from 'react';

import { Input, FormTextArea, WhiteBlock, AddressInput, ClearButton } from '@/shared/components';

interface IProps {
    className?: string;
}

export const CheckoutAddressForm: FC<IProps> = ({ className }) => {
    const onClickClear = () => console.log(1);
    const handleOnOptionSelected = (field, option) => {
        console.log(field, { option: option });
    };
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <AddressInput />
                <FormTextArea name="comment" className="text-base" placeholder="Укажите комментарий к заказу" rows={5} />
            </div>
        </WhiteBlock>
    );
};
