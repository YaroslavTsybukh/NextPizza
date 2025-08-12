import { ILocationIQAddress } from '@/@types';
import { baseInstance } from './instances';

export const getAddress = async (query: string): Promise<ILocationIQAddress[]> => {
    const { data } = await baseInstance.get<ILocationIQAddress[]>('/locationiq', {
        params: {
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
