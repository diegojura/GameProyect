import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishers } from '../../services/games';
import Pagination from '../../components/Pagination';

function Publishers() {
    const [publishers, setPublishers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                setIsLoading(true);
                const data = await getPublishers(currentPage);
                if (data && data.results) {
                    setPublishers(data.results);
                    setTotalPages(Math.ceil(data.count / 20));
                }
            } catch (error) {
                console.error("Error:", error);
                setPublishers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublishers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="card-industrial p-8 rounded-xl">
            <h1 className="text-4xl font-bold text-gray-200 mb-8 metallic-text">
                Publishers
            </h1>

            {isLoading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-300"></div>
                </div>
            ) : publishers.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {publishers.map(publisher => (
                            <Link 
                                key={publisher.id}
                                to={`/publisher/${publisher.id}`}
                                className="glass-card rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="relative h-48">
                                    <img 
                                        src={publisher.image_background || "https://via.placeholder.com/400"}
                                        alt={publisher.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-metallic-600/90 to-transparent"></div>
                                    <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-industrial-100 drop-shadow-lg">
                                        {publisher.name}
                                    </h2>
                                </div>
                                <div className="p-6 bg-industrial-100/90">
                                    <p className="text-metallic-500 font-medium">
                                        <span className="text-metallic-400">Juegos publicados:</span> {publisher.games_count}
                                    </p>
                                    {publisher.games && (
                                        <div className="mt-3">
                                            <p className="text-sm text-metallic-400 font-semibold mb-2">Juegos populares:</p>
                                            <ul className="space-y-1">
                                                {publisher.games.slice(0, 3).map(game => (
                                                    <li 
                                                        key={game.id}
                                                        className="text-sm text-metallic-500 hover:text-accent-300 transition-colors"
                                                    >
                                                        {game.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            ) : (
                <p className="text-red-500 text-center font-medium">No se encontraron publishers.</p>
            )}
        </div>
    );
}

export default Publishers; 