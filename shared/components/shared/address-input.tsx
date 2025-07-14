'use client';

import { useRef, useState, ChangeEvent, useEffect } from 'react';
import { useDebounce } from 'react-use';

import { Api } from '@/shared/services/api-client';
import { Input } from '@/shared/components';
//Todo: продолжить работу над созданием компонента. Попробовать сделать крестик удаления , если вписуешь значения в инпут.

export const AddressInput = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [addresses, setAddresses] = useState([]);

    const autoCompleteRef = useRef<null | HTMLDivElement>(null);

    //Todo: сделать оптимизацию и вынести эффект в отдельный хук.

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (autoCompleteRef.current && e.target instanceof Node && !autoCompleteRef.current.contains(e.target)) {
                setShowSuggestions(false);
                setAddresses([]);
            }
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    });

    useDebounce(
        () => {
            if (showSuggestions && searchQuery.trim()) {
                Api.address
                    .getAddress(searchQuery)
                    .then((data) => setAddresses(data))
                    .catch((error) => setAddresses([]));
            }
        },
        500,
        [searchQuery, showSuggestions],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(!!e.target.value.trim());

        if (!e.target.value.trim()) setAddresses([]);
    };

    const handleSuggestionClick = (address: string) => {
        setSearchQuery(address);
        setShowSuggestions(false);
        setAddresses([]);
    };

    return (
        <div ref={autoCompleteRef}>
            <div>
                <Input value={searchQuery} type="text" placeholder="Укажите улицу и номер дома" onChange={handleChange} className="text-base" />
            </div>
            {showSuggestions && (
                <ul className="mt-2 rounded-xl bg-slate-200">
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <li
                                className="rounded-xl p-2.5 hover:cursor-pointer hover:bg-slate-300"
                                key={address.place_id}
                                onClick={() => handleSuggestionClick(address.display_name)}
                            >
                                {address.display_name}
                            </li>
                        ))
                    ) : (
                        <li className="h-12 text-center leading-[48px]">Такого адресса не существует</li>
                    )}
                </ul>
            )}
        </div>
    );
};
