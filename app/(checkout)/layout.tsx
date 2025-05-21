import { ReactNode } from 'react';

import { Container, Header } from '@/shared/components';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header hasSearch={false} hasCart={false} className="border-b-gray-200 bg-[#F4F1EE]" />
            <main className="min-h-screen bg-[#F4F1EE]">
                <Container>{children}</Container>
            </main>
        </>
    );
}
