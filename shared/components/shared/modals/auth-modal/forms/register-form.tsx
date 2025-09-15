import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formRegisterSchema, FormRegisterValues } from '@/shared/constants';
import { Button, FormInput } from '@/shared/components';

export const RegisterForm = () => {
    const form = useForm<FormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5">
                <FormInput name="email" label="Email" type="email" placeholder="Email" required />
                <FormInput name="fullName" label="Полное имя" type="text" placeholder="Имя" required />
                <FormInput name="password" label="Пароль" type="password" placeholder="Пароль" required />
                <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" placeholder="Подтвердите пароль" required />

                <Button className="h-12 text-base" type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};
