import { IStory } from '@/@types';
import { baseInstance } from './instances';

export const getAllStories = async () => {
    const { data } = await baseInstance.get<IStory[]>('/stories');

    return data;
};
