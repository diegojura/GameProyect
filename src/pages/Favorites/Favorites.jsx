import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/slices/gamesSlice';
import GameCard from '../../components/GameCard';

function Favorites() {
    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.user.user);
    const { games, isLoading } = useSelector(state => state.games);

    useEffect(() => {
        // Cargar todos los juegos
        dispatch(fetchGames({}));
    }, [dispatch]);

    // Filtrar solo los juegos favoritos
    const favoriteGames = games.filter(game => favorites.includes(game.id));

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="card-industrial p-8 rounded-xl">
                <h1 className='font-rubiksh text-gray-200 font-extrabold text-4xl mb-6'>
                    Mis Juegos Favoritos
                </h1>

                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-500"></div>
                    </div>
                ) : favoriteGames.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {favoriteGames.map((game) => (
                            <GameCard 
                                key={game.id} 
                                id={game.id} 
                                title={game.name} 
                                posterUrl={game.background_image} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8 bg-white rounded-lg">
                        <p className="text-red-400">No tienes juegos favoritos aún.</p>
                        <p className="text-metallic-500 mt-2">
                            Marca algunos juegos como favoritos para verlos aquí.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Favorites; 