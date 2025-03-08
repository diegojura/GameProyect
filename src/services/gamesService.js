import { API_CONFIG } from './api';
const { BASE_URL, API_KEY } = API_CONFIG;

export const SORT_OPTIONS = {
    RELEVANCE: '',
    NAME: 'name',
    RELEASED: '-released',
    ADDED: '-added',
    CREATED: '-created',
    RATING: '-rating',
    METACRITIC: '-metacritic'
};

export const gamesService = {
    getGames: async (query = "", page = 1, ordering = SORT_OPTIONS.METACRITIC) => {
        try {
            let url;
            if (!query) {
                url = `${BASE_URL}/games?key=${API_KEY}&ordering=${ordering}&page_size=20&page=${page}&dates=2020-01-01,2024-12-31`;
            } else if (!isNaN(query)) {
                url = `${BASE_URL}/games/${query}?key=${API_KEY}`;
            } else {
                url = `${BASE_URL}/games?key=${API_KEY}&search=${query}&ordering=${ordering}&page=${page}&page_size=20`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            throw new Error(`Error en la petición de juegos: ${error.message}`);
        }
    },

    getGameDetails: async (id) => {
        try {
            const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            throw new Error(`Error obteniendo detalles del juego: ${error.message}`);
        }
    },

    getGamesByGenre: async (genre, page = 1, ordering = SORT_OPTIONS.METACRITIC) => {
        try {
            const url = `${BASE_URL}/games?key=${API_KEY}&genres=${genre}&ordering=${ordering}&page=${page}&page_size=20`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            throw new Error(`Error obteniendo juegos por género: ${error.message}`);
        }
    },

    getGamesByTag: async (tag, page = 1, ordering = SORT_OPTIONS.METACRITIC) => {
        try {
            const url = `${BASE_URL}/games?key=${API_KEY}&tags=${tag}&ordering=${ordering}&page=${page}&page_size=20`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            throw new Error(`Error obteniendo juegos por tag: ${error.message}`);
        }
    }
}; 