'use client';

import { FC, useState, ChangeEvent } from 'react';

import { Input, Skeleton } from '../ui';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox: (id: string) => void;
    defaultValue?: string[];
    className?: string;
    name?: string;
    selected: Set<string>;
}

export const CheckboxFiltersGroup: FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    loading,
    searchInputPlaceholder = 'Поиск...',
    className,
    onClickCheckbox,
    name,
    defaultValue,
    selected,
}) => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems || items).slice(0, limit);

    if (loading) {
        return (
            <div className={className}>
                <p className="mb-3 font-bold">{title}</p>

                {new Array(limit).fill(0).map((_, idx) => (
                    <Skeleton key={idx} className="mb-4 h-6 rounded-[8px]" />
                ))}

                <Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
            </div>
        );
    }

    return (
        <div className={className}>
            <p className="mb-3 font-bold">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input placeholder={searchInputPlaceholder} className="border-none bg-gray-50" onChange={onChangeSearchInput} />
                </div>
            )}

            <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
                {list.map((item, idx) => (
                    <FilterCheckbox
                        key={idx}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        checked={selected.has(item.value)}
                        onCheckedChange={() => onClickCheckbox(item.value)}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'mt-4 border-t border-t-neutral-100' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="mt-3 text-primary">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
