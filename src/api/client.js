import axios from 'axios';

const apiUrl = 'https://beneficial-hermine-khomenkocode-f8c4be07.koyeb.app/'
console.log(apiUrl)
export const client = axios.create({
    baseURL: apiUrl
});
