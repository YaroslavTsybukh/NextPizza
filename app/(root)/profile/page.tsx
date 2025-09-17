import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';

import { ProfileForm } from '@/shared/components';
import { getUserSession } from '@/shared/lib/getUserSession';

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });

    if (!user) {
        redirect('/not-auth');
    }

    return <ProfileForm userData={user} />;
}
