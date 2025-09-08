import { FC } from 'react';
import { ICartItemDTO } from '@/@types';

interface IProps {
    orderId: number;
    items: ICartItemDTO[];
}

export const OrderSuccessTemplate: FC<IProps> = ({ orderId, items }) => (
    <div>
        <h1> Спасибо за покупку! 🎉</h1>

        <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

        <hr />

        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.productItem.product.name} | {item.productItem.price} грн x {item.quantity} шт. = {item.productItem.price * item.quantity}{' '}
                    грн
                </li>
            ))}
        </ul>
    </div>
);
