import { User } from '@prisma/client';
import { baseInstance } from './instances';

export const getMeInfo = async () => {
    const { data } = await baseInstance.get<User>('/auth/me');

    return data;
};
