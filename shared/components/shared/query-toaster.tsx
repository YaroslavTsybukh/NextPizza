'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const QueryToaster = () => {
    const searchParams = useSearchParams();
    const canceled = searchParams.has('canceled');
    const verified = searchParams.has('verified');
    const router = useRouter();

    useEffect(() => {
        if (canceled) toast.error('Вы отменили оплату. Вы можете вернуться и выбрать товары снова.', { icon: '❌', duration: 3000 });
        if (verified) toast.success('Почта успешно подтверждена!', { icon: '✅', duration: 3000 });

        if (canceled || verified) {
            setTimeout(() => {
                router.replace('/');
            }, 1000);
        }
    }, [canceled, router, verified]);

    return null;
};
