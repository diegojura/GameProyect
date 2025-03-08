import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../../services/eventsService';

// Cargar suscripciones desde localStorage
const loadSubscriptions = () => {
    try {
        const subscriptions = localStorage.getItem('eventSubscriptions');
        return subscriptions ? JSON.parse(subscriptions) : [];
    } catch (error) {
        console.error('Error loading event subscriptions from localStorage:', error);
        return [];
    }
};

// Guardar suscripciones en localStorage
const saveSubscriptions = (subscriptions) => {
    try {
        localStorage.setItem('eventSubscriptions', JSON.stringify(subscriptions));
    } catch (error) {
        console.error('Error saving event subscriptions to localStorage:', error);
    }
};

// Thunk para obtener eventos
export const getEvents = createAsyncThunk(
    'events/getEvents',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching events...');
            const response = await fetchEvents();
            console.log('Events received:', response);
            return response;
        } catch (error) {
            console.error('Error fetching events:', error);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    events: [],
    isLoading: false,
    error: null,
    subscriptions: loadSubscriptions()
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        toggleEventSubscription: (state, action) => {
            const eventId = action.payload;
            const index = state.subscriptions.indexOf(eventId);
            
            if (index === -1) {
                state.subscriptions.push(eventId);
            } else {
                state.subscriptions.splice(index, 1);
            }
            
            // Guardar en localStorage
            saveSubscriptions(state.subscriptions);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                console.log('Loading events...');
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = action.payload;
                state.error = null;
                console.log('Events loaded successfully:', action.payload);
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Error al cargar los eventos';
                state.events = [];
                console.error('Failed to load events:', action.payload);
            });
    }
});

export const { toggleEventSubscription } = eventsSlice.actions;
export default eventsSlice.reducer; 