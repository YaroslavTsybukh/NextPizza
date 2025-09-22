import { Story, StoryItem } from '@prisma/client';

export interface IStory extends Story {
    items: StoryItem[];
}
