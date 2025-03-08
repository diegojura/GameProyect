import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../store/slices/eventsSlice';
import EventCard from '../../components/EventCard';

function Events() {
    const dispatch = useDispatch();
    const { events, isLoading, error } = useSelector(state => state.events);

    useEffect(() => {
        console.log('Events component mounted');
        try {
            dispatch(getEvents());
        } catch (err) {
            console.error('Error dispatching getEvents:', err);
        }
    }, [dispatch]);

    console.log('Current state:', { events, isLoading, error });

    if (error) {
        console.error('Error in Events component:', error);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="card-industrial p-8 rounded-xl">
                    <div className="text-red-400 text-center p-4 bg-white rounded-lg">
                        Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="card-industrial p-8 rounded-xl">
                <h1 className="font-rubiksh text-gray-200 font-extrabold text-4xl mb-6">
                    Eventos de Videojuegos
                </h1>

                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-500"></div>
                    </div>
                ) : Array.isArray(events) && events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8 bg-white rounded-lg">
                        <p className="text-metallic-500">No hay eventos disponibles.</p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Events; 