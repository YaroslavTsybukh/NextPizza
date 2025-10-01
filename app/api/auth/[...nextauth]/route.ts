import NextAuth from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';

console.log('NEXTAUTH_URL exists:', !!process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET);
console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
