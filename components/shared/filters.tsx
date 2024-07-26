import { FC } from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

export const Filters: FC = () => {
    return (
        <div className="w-[250px]">
            <Title
                text="Фильтрация"
                className="mb-5 border-b border-b-neutral-100 pb-4 font-bold"
            />

            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="mb-3 font-bold">Цена от и до:</p>
                <div className="mb-5 flex gap-3">
                    <Input type="number" min={0} max={30000} placeholder="0" />
                    <Input
                        type="number"
                        min={100}
                        max={30000}
                        placeholder="30000"
                    />
                </div>
                <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
            </div>
            <CheckboxFiltersGroup
                className="mt-5"
                title="Ингредиенты:"
                limit={6}
                defaultItems={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моцарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Солённые огурчики',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6',
                    },
                ]}
                items={[
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моцарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Солённые огурчики',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6',
                    },
                    {
                        text: 'Сырный соус',
                        value: '1',
                    },
                    {
                        text: 'Моцарелла',
                        value: '2',
                    },
                    {
                        text: 'Чеснок',
                        value: '3',
                    },
                    {
                        text: 'Солённые огурчики',
                        value: '4',
                    },
                    {
                        text: 'Красный лук',
                        value: '5',
                    },
                    {
                        text: 'Томаты',
                        value: '6',
                    },
                ]}
            />
        </div>
    );
};
