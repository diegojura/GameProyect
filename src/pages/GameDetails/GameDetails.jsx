import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameDetails } from '../../store/slices/gamesSlice';
import FavoriteButton from '../../components/FavoriteButton';

function GameDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { gameDetails: game, isLoading } = useSelector(state => state.games);

    useEffect(() => {
        dispatch(fetchGameDetails(id));
    }, [dispatch, id]);

    if (isLoading) return <div className="text-metallic-400 text-xl">Cargando...</div>;
    if (!game) return <div className="text-red-500 text-xl">Juego no encontrado</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="card-industrial p-8 rounded-xl">
                <div className="relative">
                    <h1 className="text-4xl font-bold text-gray-200 mb-6 pr-16">{game.name}</h1>
                    <div className="absolute top-0 right-0">
                        <FavoriteButton gameId={parseInt(id)} />
                    </div>
                </div>
                
                <img 
                    src={game.background_image} 
                    alt={game.name}
                    className="w-full h-96 object-cover rounded-lg mb-6" 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-200">Detalles</h2>
                        
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-gray-200">Géneros</h3>
                            <div className="flex flex-wrap gap-2">
                                {game.genres?.map(genre => (
                                    <Link 
                                        key={genre.id}
                                        to={`/genre/${genre.slug}`}
                                        className="px-3 py-1 bg-metallic-100 text-metallic-600 rounded-full hover:bg-metallic-200 transition"
                                    >
                                        {genre.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-gray-200">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {game.tags?.map(tag => (
                                    <Link 
                                        key={tag.id}
                                        to={`/tag/${tag.slug}`}
                                        className="px-3 py-1 bg-metallic-100 text-metallic-600 rounded-full hover:bg-metallic-200 transition"
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-gray-200">Publishers</h3>
                            <div className="flex flex-wrap gap-2">
                                {game.publishers?.map(publisher => (
                                    <Link 
                                        key={publisher.id}
                                        to={`/publisher/${publisher.id}`}
                                        className="px-4 py-2 bg-accent-100 text-white rounded hover:bg-accent-200 transition"
                                    >
                                        {publisher.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-gray-200">Plataformas</h3>
                            <div className="flex flex-wrap gap-2">
                                {game.platforms?.map(platform => (
                                    <span 
                                        key={platform.platform.id}
                                        className="px-3 py-1 bg-industrial-300 text-metallic-600 rounded"
                                    >
                                        {platform.platform.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="prose prose-lg">
                    <h2 className="text-2xl font-semibold text-gray-200 mb-4">Descripción</h2>
                    <p className="text-gray-300">{game.description_raw}</p>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;