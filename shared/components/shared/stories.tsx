'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import StoriesComponent from 'react-insta-stories';

import { IStory } from '@/@types';
import { Api } from '@/shared/services/api-client';
import { Container, Skeleton, Button } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';

interface IProps {
    className?: string;
}

export const Stories: FC<IProps> = ({ className }) => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedStory, setSelectedStory] = useState<IStory>();

    useEffect(() => {
        async function fetchStories() {
            const res = await Api.stories.getAllStories();

            setStories(res);
        }

        fetchStories();
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    const handleClickStory = (story: IStory) => {
        setSelectedStory(story);

        if (story.items.length > 0) setOpen(true);
    };

    return (
        <Container className={cn('my-10 flex items-center justify-between gap-2', className)}>
            {stories.length === 0 && [...Array(6)].map((_, idx) => <Skeleton key={idx} className="h-[250px] w-[200px]" />)}

            {stories.map((story) => (
                <Image
                    key={story.id}
                    className="h-[250px] w-[200px] cursor-pointer rounded-md"
                    onClick={() => handleClickStory(story)}
                    src={story.previewImageUrl}
                    height={250}
                    width={200}
                    alt="Сторис"
                />
            ))}

            {open && (
                <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black/80">
                    <div className="relative w-[400px]">
                        <Button className="absolute -right-10 -top-5 z-30 h-8 w-8" onClick={() => setOpen(false)}>
                            <X size={32} className="absolute right-0 top-0 text-white/50" />
                        </Button>
                        <StoriesComponent
                            stories={
                                selectedStory?.items.map((story) => ({
                                    url: story.sourceUrl,
                                })) || []
                            }
                            defaultInterval={2000}
                            width={400}
                            height={600}
                            onAllStoriesEnd={() => setOpen(false)}
                        />
                    </div>
                </div>
            )}
        </Container>
    );
};
