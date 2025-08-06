'use client';

import { useRef, useState, ChangeEvent } from 'react';
import { useDebounce } from 'react-use';
import { ScaleLoader } from 'react-spinners';
import { useFormContext } from 'react-hook-form';

import { ILocationIQAddress } from '@/@types';
import { Api } from '@/shared/services/api-client';
import { FormInput } from '@/shared/components';
import { useClickOutside } from '@/shared/hooks';

export const AddressInput = () => {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<ILocationIQAddress[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { setValue } = useFormContext();

    const autoCompleteRef = useRef<null | HTMLDivElement>(null);

    useClickOutside(autoCompleteRef, () => {
        setShowSuggestions(false);
        setAddresses([]);
    });

    useDebounce(
        () => {
            if (showSuggestions && searchQuery.trim()) {
                Api.address
                    .getAddress(searchQuery)
                    .then((data) => setAddresses(data))
                    .catch((error) => {
                        setAddresses([]);
                        console.log(error);
                    })
                    .finally(() => setLoading(false));
            }
        },
        500,
        [searchQuery, showSuggestions],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setValue('address', e.target.value);
        setSearchQuery(e.target.value);
        setShowSuggestions(!!e.target.value.trim());

        if (!e.target.value.trim()) {
            setLoading(false);
            setAddresses([]);
        }
    };
    const handleClear = () => {
        setSearchQuery('');
        setShowSuggestions(false);
        setAddresses([]);
    };

    const handleSuggestionClick = (address: string) => {
        setSearchQuery(address);
        setValue('address', address);
        setShowSuggestions(false);
        setAddresses([]);
    };

    return (
        <div ref={autoCompleteRef}>
            <FormInput
                value={searchQuery}
                type="text"
                name="address"
                className="text-base"
                placeholder="Укажите улицу и номер дома"
                onChange={handleChange}
                onClear={handleClear}
            />

            {showSuggestions && (
                <ul className="mt-2 rounded-xl bg-slate-200 p-2.5">
                    {loading && addresses.length === 0 ? (
                        <ScaleLoader className="text-center" color="#ff5e00" loading={true} />
                    ) : addresses.length > 0 ? (
                        addresses.map((address) => (
                            <li
                                className="rounded-xl hover:cursor-pointer hover:bg-slate-300"
                                key={address.place_id}
                                onClick={() => handleSuggestionClick(address.display_name)}
                            >
                                {address.display_name}
                            </li>
                        ))
                    ) : (
                        <li className="h-12 text-center leading-[48px]">Такого адреса не существует</li>
                    )}
                </ul>
            )}
        </div>
    );
};
