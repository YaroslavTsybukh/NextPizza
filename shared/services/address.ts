import { ILocationIQAddress } from '@/@types';
import { locationIQInstance } from './instances';

export const getAddress = async (query: string): Promise<ILocationIQAddress[]> => {
    const { data } = await locationIQInstance.get<ILocationIQAddress[]>('/autocomplete', {
        params: {
            key: process.env.NEXT_PUBLIC_ACCESS_TOKEN_LOCATION_IQ,
            q: query,
            countrycodes: 'ua',
            'accept-language': 'ru',
            viewbox: '36.1055,49.8784,36.4554,50.3841',
            bounded: 1,
            dedupe: 1,
        },
    });

    return data;
};
