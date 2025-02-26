const BASE_URL = "https://api.rawg.io/api";
const API_KEY = "4c48b705cbda48658820931823e94922";

export const getGamesBy = async (queryOrId = "", page = 1) => {
    try {
        let url;
        if (!queryOrId) {
            url = `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page_size=20&page=${page}&dates=2020-01-01,2024-12-31`;
        } else if (!isNaN(queryOrId)) {
            url = `${BASE_URL}/games/${queryOrId}?key=${API_KEY}`;
        } else {
            url = `${BASE_URL}/games?key=${API_KEY}&search=${queryOrId}&page=${page}&page_size=20`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la petición:", error);
        return { results: [], count: 0 };
    }
};

export const getPublishers = async (page = 1) => {
    try {
        const url = `${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=20`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo publishers:", error);
        return { results: [], count: 0 };
    }
};

export const getPublisherDetails = async (id) => {
    try {
        const url = `${BASE_URL}/publishers/${id}?key=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo detalles del publisher:", error);
        return null;
    }
};
