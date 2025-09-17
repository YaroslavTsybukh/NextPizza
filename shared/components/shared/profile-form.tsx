'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';

import { Button, Container, FormInput, Title } from '@/shared/components';
import { FormRegisterValues, formRegisterSchema } from '@/shared/constants';
import { FC } from 'react';

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

                    <Button type="submit" className="mt-10 text-base">
                        Сохранить
                    </Button>

                    <Button type="button" variant="secondary" className="text-base">
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
};
