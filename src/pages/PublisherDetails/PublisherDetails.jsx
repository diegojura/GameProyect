import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublisherDetails } from '../../services/games';
import GameCard from '../../components/GameCard';

function PublisherDetails() {
    const { id } = useParams();
    const [publisher, setPublisher] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPublisherDetails = async () => {
            try {
                const data = await getPublisherDetails(id);
                setPublisher(data);
            } catch (error) {
                console.error("Error:", error);
                setPublisher(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublisherDetails();
    }, [id]);

    if (isLoading) return (
        <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-500"></div>
        </div>
    );

    if (!publisher) return <div className="text-red-500 text-center">Publisher no encontrado</div>;

    return (
        <div className="bg-industrial-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-metallic-600 mb-6">{publisher.name}</h1>
            
            {publisher.image_background && (
                <img 
                    src={publisher.image_background}
                    alt={publisher.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
            )}

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold text-metallic-500 mb-3">Descripción</h2>
                    <p className="text-metallic-400">{publisher.description || "No hay descripción disponible."}</p>
                </div>

                {publisher.games && publisher.games.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-metallic-500 mb-3">Juegos Publicados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {publisher.games.map(game => (
                                <GameCard
                                    key={game.id}
                                    id={game.id}
                                    title={game.name}
                                    posterUrl={game.background_image}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PublisherDetails; 