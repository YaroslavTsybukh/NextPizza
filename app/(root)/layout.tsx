import type { Metadata } from 'next';

import { Header } from '@/shared/components';

export const metadata: Metadata = {
    title: 'Next Pizza | Главная',
};

export default function HomeLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="h-[calc(100vh-121px)]">
                {children}
                {modal}
            </main>
        </>
    );
}
