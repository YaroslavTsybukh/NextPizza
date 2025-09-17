import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

import { FormInput, Title, Button } from '@/shared/components';
import { FormLoginValues, formLoginSchema } from '@/shared/constants';
import { FC } from 'react';

interface IProps {
    onClose: () => void;
}

export const LoginForm: FC<IProps> = ({ onClose }) => {
    const form = useForm<FormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormLoginValues) => {
        try {
            const res = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!res?.ok) {
                throw Error();
            }

            toast.success('Вы успешно вошли в аккаунт', {
                icon: '✅',
            });

            onClose();
        } catch (e) {
            console.error('Error [LOGIN]', e);
            toast.error('Не удалось войти в акккаунт', {
                icon: '❌',
            });
        } finally {
            form.reset();
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
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
