'use client';

import { FC, useState, ChangeEvent } from 'react';

import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui/input';

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    className,
    onChange,
    defaultValue,
}) => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const list = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase()),
          )
        : defaultItems.slice(0, limit);

    return (
        <div className={className}>
            <p className="mb-3 font-bold">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        className="border-none bg-gray-50"
                        onChange={onChangeSearchInput}
                    />
                </div>
            )}

            <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
                {list.map((item, idx) => (
                    <FilterCheckbox
                        key={idx}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        checked={false}
                        onCheckedChange={(ids) => console.log(ids)}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? 'mt-4 border-t border-t-neutral-100' : ''
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-3 text-primary"
                    >
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
