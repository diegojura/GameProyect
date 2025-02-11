import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesBy } from '../../services/games';

function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                console.log("Fetching details for game ID:", id);  // 🔍 Depuración
                const gameData = await getGamesBy(id);

                if (gameData && gameData.name) {
                    setGame(gameData);
                } else {
                    console.error("No se encontró información del juego.");
                    setGame(null);
                }
            } catch (error) {
                console.error("Error al obtener los detalles del juego:", error);
                setGame(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGameDetails();
    }, [id]);

    if (isLoading) return <p className="text-center text-xl text-gray-300">Cargando...</p>;
    if (!game) return <p className="text-center text-xl text-red-500">Juego no encontrado.</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-200">{game.name}</h1>
            <img 
                src={game.background_image || "https://via.placeholder.com/600"} 
                alt={game.name} 
                className="w-full h-96 object-cover my-4 rounded-lg" 
            />
            <p className="text-lg text-gray-300">{game.description_raw || "Descripción no disponible."}</p>
            <p className="mt-2 text-gray-300">
                <strong>Géneros:</strong> {game.genres?.length ? game.genres.map(g => g.name).join(", ") : "No disponible"}
            </p>
            <p className="text-gray-300">
                <strong>Plataformas:</strong> {game.platforms?.length ? game.platforms.map(p => p.platform.name).join(", ") : "No disponible"}
            </p>
        </div>
    );
}

export default GameDetails;
