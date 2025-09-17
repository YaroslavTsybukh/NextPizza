'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';

import { Button, Container, FormInput, Title } from '@/shared/components';
import { FormRegisterValues, formRegisterSchema } from '@/shared/constants';

interface IProps {
    userData: User;
}

export const ProfileForm: FC<IProps> = ({ userData }) => {
    const form = useForm<FormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: userData.email,
            fullName: userData.fullName,
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <Container className="my-10">
            <Title text="Личные данные" size="md" className="font-bold" />

            <FormProvider {...form}>
                <form className="mt-10 flex w-96 flex-col gap-5">
                    <FormInput name="email" label="Email" type="email" placeholder="Email" />
                    <FormInput name="fullName" label="Полное имя" type="text" placeholder="Полное имя" />

                    <FormInput name="password" label="Пароль" type="password" placeholder="Пароль" />
                    <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" placeholder="Подтвердите пароль" />

                    <Button disabled={form.formState.isSubmitting} type="submit" className="mt-10 text-base">
                        Сохранить
                    </Button>

                    <Button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button"
                    >
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
};
