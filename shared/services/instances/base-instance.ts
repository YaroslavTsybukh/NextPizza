import axios from 'axios';

export const baseInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
