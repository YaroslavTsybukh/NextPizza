'use client';

import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
    </>
);
