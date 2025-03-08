import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setSearchTerm, setCurrentPage, setCurrentSort } from '../../store/slices/gamesSlice';
import { SORT_OPTIONS } from '../../services/gamesService';
import GameCard from '../../components/GameCard';
import Pagination from '../../components/Pagination';

const SORT_LABELS = {
    [SORT_OPTIONS.RELEVANCE]: 'Relevancia',
    [SORT_OPTIONS.NAME]: 'Nombre (A-Z)',
    [SORT_OPTIONS.RELEASED]: 'Fecha de lanzamiento',
    [SORT_OPTIONS.ADDED]: 'Fecha de agregado',
    [SORT_OPTIONS.CREATED]: 'Fecha de creación',
    [SORT_OPTIONS.RATING]: 'Valoración',
    [SORT_OPTIONS.METACRITIC]: 'Metacritic'
};

function Games() {
    const dispatch = useDispatch();
    const { 
        games, 
        isLoading, 
        currentPage, 
        totalPages, 
        searchTerm,
        currentSort 
    } = useSelector(state => state.games);

    useEffect(() => {
        dispatch(fetchGames({ 
            query: searchTerm, 
            page: currentPage,
            ordering: currentSort 
        }));
    }, [dispatch, currentPage, searchTerm, currentSort]);

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
        window.scrollTo(0, 0);
    };

    const handleInputChange = (event) => {
        dispatch(setSearchTerm(event.target.value));
    };

    const handleSortChange = (event) => {
        dispatch(setCurrentSort(event.target.value));
    };

    return (
        <section className="card-industrial p-8 rounded-xl">
            <h1 className='font-rubiksh text-gray-200 font-extrabold text-4xl mb-6'>
                Videojuegos Populares
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleInputChange}
                    placeholder="Buscar juegos..." 
                    className="flex-1 p-2 border rounded-lg text-metallic-600"
                />
                
                <select
                    value={currentSort}
                    onChange={handleSortChange}
                    className="p-2 border rounded-lg text-metallic-600 bg-white cursor-pointer hover:bg-gray-50"
                >
                    {Object.entries(SORT_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                            Ordenar por: {label}
                        </option>
                    ))}
                </select>
            </div>
            
            {isLoading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-500"></div>
                </div>
            ) : games.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {games.map((game) => (
                            <GameCard 
                                key={game.id} 
                                id={game.id} 
                                title={game.name} 
                                posterUrl={game.background_image} 
                            />
                        ))}
                    </div>
                    
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <p className="text-red-400 text-center">No se encontraron juegos.</p>
            )}
        </section>
    );
}

export default Games;