import * as z from 'zod';

const passwordSchema = z.string().min(4, { error: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
    email: z.email({ error: 'Введите корректную почту' }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
    .extend({
        fullName: z.string().min(2, { error: 'Введите имя и фамилию' }),
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type FormLoginValues = z.infer<typeof formLoginSchema>;
export type FormRegisterValues = z.infer<typeof formRegisterSchema>;
