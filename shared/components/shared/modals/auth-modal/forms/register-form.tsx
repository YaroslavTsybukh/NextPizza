'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/app/actions';

import { formRegisterSchema, FormRegisterValues } from '@/shared/constants';
import { Button, FormInput } from '@/shared/components';
import toast from 'react-hot-toast';
import { FC } from 'react';

interface IProps {
    onClose: () => void;
}

export const RegisterForm: FC<IProps> = ({ onClose }) => {
    const form = useForm<FormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: FormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.success('Регистрация успешна 📝. Подтвердите свою почту', {
                icon: '✅',
            });

            onClose();
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message, {
                    icon: '❌',
                });
            }
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
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
