import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://nodejs-animerecomendation.up.railway.app/'; // Бэкенд URL
export const client = axios.create({
    baseURL: apiUrl
});
