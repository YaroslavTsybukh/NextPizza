import { prisma } from '@/prisma/prisma-client';

import { ProfileForm } from '@/shared/components';
import { getUserSession } from '@/shared/lib/getUserSession';

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        throw new Error('Сессии нет');
    }

    const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });

    if (!user) {
        throw new Error('Юзера нет');
    }

    return <ProfileForm userData={user} />;
}
