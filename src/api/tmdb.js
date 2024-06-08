// src/api/tmdb.js
import axios from 'axios';

const API_KEY = '5428e1a81aae4cfa7f3247e9e3c68e5e';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

export default tmdb;
