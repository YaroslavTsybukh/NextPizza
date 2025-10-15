import { InfoBlock } from '@/shared/components';

export default function NotAuthPage() {
    return (
        <section className="flex h-[calc(100vh-121px)] flex-col items-center justify-center">
            <InfoBlock title="Доступ запрещён" imageUrl="/assets/images/lock.png" altText="Доступ запрещен" />
        </section>
    );
}
