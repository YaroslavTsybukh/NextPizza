import { UserRole } from '@prisma/client';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {
                    id: String(profile.id),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole,
                };
            },
        }),
    ],
};
