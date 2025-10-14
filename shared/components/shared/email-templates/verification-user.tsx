import { FC } from 'react';

interface IProps {
    code: string;
}

export const VerificationUserTemplate: FC<IProps> = ({ code }) => {
    return (
        <div>
            <p>
                Код подтверждения: <h2>{code}</h2>
            </p>

            <p>
                <a href={`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
            </p>
        </div>
    );
};
