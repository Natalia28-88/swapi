import Axios from 'axios';

export const axiosInstance = Axios.create({
  baseURL: 'https://swapi.dev/api',
});
