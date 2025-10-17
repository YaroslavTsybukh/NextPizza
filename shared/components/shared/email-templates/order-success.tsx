import { FC } from 'react';
import { ICartItemDTO } from '@/@types';
import { calculateTotalWithFees } from '@/shared/lib';

interface IProps {
    orderId: number;
    totalAmount: number;
    items: ICartItemDTO[];
}

export const OrderSuccessTemplate: FC<IProps> = ({ orderId, totalAmount, items }) => {
    const { totalPriceWithFees, deliveryPrice, vatPrice } = calculateTotalWithFees(totalAmount);

    return (
        <div>
            <h1> Спасибо за покупку! 🎉</h1>

            <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

            <hr />

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.productItem.product.name} | {item.productItem.price} грн x {item.quantity} шт. ={' '}
                        {item.productItem.price * item.quantity} грн
                    </li>
                ))}
            </ul>

            <hr />

            <p>Доставка: {deliveryPrice} грн</p>
            <p>Налоги (15%) : {vatPrice} грн</p>
            <p>
                <strong>Итого: {totalPriceWithFees} грн</strong>
            </p>
        </div>
    );
};
