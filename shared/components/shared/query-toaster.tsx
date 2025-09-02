'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const QueryToaster = () => {
    const searchParams = useSearchParams();
    const canceled = searchParams.get('canceled');
    const router = useRouter();

    useEffect(() => {
        if (canceled === 'true') {
            toast.error('Вы отменили оплату. Вы можете вернуться и выбрать товары снова.', { icon: '❌' });
            router.replace('/');
        }
    }, [canceled, router]);

    return null;
};
