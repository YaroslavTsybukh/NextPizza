import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput, Title, Button } from '@/shared/components';
import { FormLoginValues, formLoginSchema } from '@/shared/constants';

export const LoginForm = () => {
    const form = useForm<FormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="mr-2">
                        <Title className="font-bold" text="Вход в аккаунт" size="md" />
                        <p className="text-gray-400">Введите своб почту , чтобы войти в свой аккаунт</p>
                    </div>
                    <Image src="/assets/images/phone-icon.png" width={60} height={60} alt="Phone icon" />
                </div>

                <FormInput name="email" label="Email" type="email" placeholder="Email" required />
                <FormInput name="password" label="Пароль" type="password" placeholder="Пароль" required />

                <Button className="h-12 text-base" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};
