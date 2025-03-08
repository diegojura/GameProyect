import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gamesService, SORT_OPTIONS } from '../../services/gamesService';

// Thunks
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async ({ query = "", page = 1, ordering = SORT_OPTIONS.METACRITIC }) => {
        return await gamesService.getGames(query, page, ordering);
    }
);

export const fetchGameDetails = createAsyncThunk(
    'games/fetchGameDetails',
    async (id) => {
        return await gamesService.getGameDetails(id);
    }
);

export const fetchGamesByGenre = createAsyncThunk(
    'games/fetchGamesByGenre',
    async ({ genre, page = 1, ordering = SORT_OPTIONS.METACRITIC }) => {
        return await gamesService.getGamesByGenre(genre, page, ordering);
    }
);

export const fetchGamesByTag = createAsyncThunk(
    'games/fetchGamesByTag',
    async ({ tag, page = 1, ordering = SORT_OPTIONS.METACRITIC }) => {
        return await gamesService.getGamesByTag(tag, page, ordering);
    }
);

const initialState = {
    games: [],
    gameDetails: null,
    isLoading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    searchTerm: "",
    currentSort: SORT_OPTIONS.METACRITIC
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.currentPage = 1; // Reset page when searching
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setCurrentSort: (state, action) => {
            state.currentSort = action.payload;
            state.currentPage = 1; // Reset page when changing sort
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Games
            .addCase(fetchGames.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.isLoading = false;
                state.games = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 20);
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.games = [];
            })
            // Fetch Game Details
            .addCase(fetchGameDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGameDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gameDetails = action.payload;
            })
            .addCase(fetchGameDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.gameDetails = null;
            })
            // Fetch Games by Genre
            .addCase(fetchGamesByGenre.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGamesByGenre.fulfilled, (state, action) => {
                state.isLoading = false;
                state.games = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 20);
            })
            .addCase(fetchGamesByGenre.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.games = [];
            })
            // Fetch Games by Tag
            .addCase(fetchGamesByTag.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGamesByTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.games = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 20);
            })
            .addCase(fetchGamesByTag.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.games = [];
            });
    }
});

export const { setSearchTerm, setCurrentPage, setCurrentSort } = gamesSlice.actions;
export default gamesSlice.reducer; 