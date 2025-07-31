'use client';

import { useRef, useState, ChangeEvent, useEffect } from 'react';
import { useDebounce } from 'react-use';

import { ILocationIQAddress } from '@/@types';
import { Api } from '@/shared/services/api-client';
import { FormInput } from '@/shared/components';

/**
 * TODO: продолжить работу над созданием компонента.
 */

export const AddressInput = () => {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<ILocationIQAddress[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

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
    }, []);

    useDebounce(
        () => {
            if (showSuggestions && searchQuery.trim()) {
                Api.address
                    .getAddress(searchQuery)
                    .then((data) => setAddresses(data))
                    .catch((error) => {
                        setAddresses([]);
                        console.log(error);
                    });
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

    const handleClear = () => {
        setSearchQuery('');
        setShowSuggestions(false);
        setAddresses([]);
    };

    const handleSuggestionClick = (address: string) => {
        setSearchQuery(address);
        setShowSuggestions(false);
        setAddresses([]);
    };

    return (
        <div ref={autoCompleteRef}>
            <div>
                <FormInput
                    value={searchQuery}
                    type="text"
                    name="address"
                    className="text-base"
                    placeholder="Укажите улицу и номер дома"
                    onChange={handleChange}
                    onClear={handleClear}
                />
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
