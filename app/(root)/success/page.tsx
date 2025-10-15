import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
    return (
        <section className="flex h-[calc(100vh-121px)] items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
                <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
                <h1 className="text-2xl font-bold text-gray-900">Оплата прошла успешно 🎉</h1>
                <p className="mt-2 text-gray-600">Спасибо за вашу покупку! Мы уже начали обработку вашего заказа.</p>

                <div className="mt-6">
                    <Link href="/" className="inline-block rounded-lg bg-primary px-4 py-2 font-medium text-white shadow-md transition">
                        Вернуться на гланую страницу.
                    </Link>
                </div>
            </div>
        </section>
    );
}
