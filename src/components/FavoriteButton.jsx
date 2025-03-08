import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/userSlice';

function FavoriteButton({ gameId }) {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.user.user.favorites);
    const isFavorite = favorites.includes(gameId);

    const handleToggleFavorite = (e) => {
        e.preventDefault(); // Evitar que el evento se propague si está dentro de un enlace
        e.stopPropagation();
        dispatch(toggleFavorite(gameId));
    };

    return (
        <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-300 
                ${isFavorite 
                    ? 'bg-primary-200 text-white hover:bg-primary-300' 
                    : 'bg-white/80 text-gray-600 hover:bg-white'}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isFavorite ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    );
}

export default FavoriteButton; 