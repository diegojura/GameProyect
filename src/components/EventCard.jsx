import { useDispatch, useSelector } from 'react-redux';
import { toggleEventSubscription } from '../store/slices/eventsSlice';

function EventCard({ event }) {
    const dispatch = useDispatch();
    const subscriptions = useSelector(state => state.events.subscriptions);
    const isSubscribed = subscriptions.includes(event.id);

    const handleToggleSubscription = () => {
        dispatch(toggleEventSubscription(event.id));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
                <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
                <button
                    onClick={handleToggleSubscription}
                    className={`absolute top-2 right-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 
                        ${isSubscribed 
                            ? 'bg-primary-200 text-white hover:bg-primary-300' 
                            : 'bg-white text-primary-200 hover:bg-gray-100'}`}
                >
                    {isSubscribed ? 'Cancelar' : 'Apuntarse'}
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-metallic-600 mb-2">
                    {event.title}
                </h3>
                <p className="text-metallic-500 mb-4">{event.description}</p>
                <div className="flex justify-between items-center text-sm text-metallic-400">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{event.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard; 