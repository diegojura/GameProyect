import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../store/slices/eventsSlice';
import EventCard from '../../components/EventCard';
import { Link } from 'react-router-dom';

function MyEvents() {
    const dispatch = useDispatch();
    const { subscriptions } = useSelector(state => state.events);
    const { events, isLoading } = useSelector(state => state.events);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    // Filtrar solo los eventos suscritos
    const subscribedEvents = events.filter(event => subscriptions.includes(event.id));

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="card-industrial p-8 rounded-xl">
                <h1 className='font-rubiksh text-gray-200 font-extrabold text-4xl mb-6'>
                    Mis Eventos
                </h1>

                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-500"></div>
                    </div>
                ) : subscribedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {subscribedEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8 bg-white rounded-lg">
                        <p className="text-red-400">No estás suscrito a ningún evento.</p>
                        <p className="text-metallic-500 mt-2">
                            Visita la sección de {' '}
                            <Link to="/events" className="text-primary-200 hover:text-primary-300">
                                eventos
                            </Link>
                            {' '} para encontrar eventos interesantes.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default MyEvents; 