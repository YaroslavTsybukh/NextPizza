import { z } from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, { error: 'Имя должно содержать не менее 2-х символов.' }),
    lastName: z.string().min(2, { error: 'Фамилия должно содержать не менее 2-х символов.' }),
    email: z.email({ error: 'Введите корректную почту' }),
    phone: z.string().min(10, { error: 'Введите корректный номер телефона' }),
    address: z.string().min(1, { error: 'Введите корректный адресс' }),
    comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
