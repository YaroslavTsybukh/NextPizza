import axios from 'axios';

export const locationIQInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_LOCATION_IQ_AUTOCOMPLETE,
});
