import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesBy } from '../../services/games';
import GameCard from '../../components/GameCard';
import Pagination from '../../components/Pagination';

function GenreGames() {
    const { genre } = useParams();
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setIsLoading(true);
                const data = await getGamesBy(`genres=${genre}`, currentPage);
                if (data && data.results) {
                    setGames(data.results);
                    setTotalPages(Math.ceil(data.count / 20));
                }
            } catch (error) {
                console.error("Error:", error);
                setGames([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();
    }, [genre, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="card-industrial p-8 rounded-xl">
                <h1 className="text-4xl font-bold text-gray-200 mb-6">
                    Juegos del género: {genre}
                </h1>

                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-500"></div>
                    </div>
                ) : games.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {games.map(game => (
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
                    <p className="text-red-400 text-center">No se encontraron juegos de este género.</p>
                )}
            </div>
        </div>
    );
}

export default GenreGames; 