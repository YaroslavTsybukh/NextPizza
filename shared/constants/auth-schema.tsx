import * as z from 'zod';

export const formLoginSchema = z.object({
    email: z.email({ message: 'Введите корректную почту' }),
    password: z.string().min(4, { message: 'Введите корректный пароль' }),
});

export type FormLoginValues = z.infer<typeof formLoginSchema>;
