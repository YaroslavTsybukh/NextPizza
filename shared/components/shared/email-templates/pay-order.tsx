import { FC } from 'react';

interface IProps {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: FC<IProps> = ({ orderId, totalAmount, paymentUrl }) => {
    return (
        <div>
            <h1>Заказ #{orderId}</h1>

            <p>
                Оплатите заказ на сумму <b>{totalAmount} грн</b>.<br /> Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
            </p>
        </div>
    );
};
