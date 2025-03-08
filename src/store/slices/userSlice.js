import { createSlice } from '@reduxjs/toolkit';

// Cargar favoritos desde localStorage
const loadFavorites = () => {
    try {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        return [];
    }
};

const initialState = {
    user: {
        id: 1,
        name: 'Usuario Nego',
        email: 'usuario@Nego.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nn',
        favorites: loadFavorites(),
        subscribedEvents: []
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const gameId = action.payload;
            const index = state.user.favorites.indexOf(gameId);
            if (index === -1) {
                state.user.favorites.push(gameId);
            } else {
                state.user.favorites.splice(index, 1);
            }
            // Guardar en localStorage
            try {
                localStorage.setItem('favorites', JSON.stringify(state.user.favorites));
            } catch (error) {
                console.error('Error saving favorites to localStorage:', error);
            }
        },
        toggleEventSubscription: (state, action) => {
            const eventId = action.payload;
            const index = state.user.subscribedEvents.indexOf(eventId);
            if (index === -1) {
                state.user.subscribedEvents.push(eventId);
            } else {
                state.user.subscribedEvents.splice(index, 1);
            }
        }
    }
});

export const { toggleFavorite, toggleEventSubscription } = userSlice.actions;
export default userSlice.reducer; 