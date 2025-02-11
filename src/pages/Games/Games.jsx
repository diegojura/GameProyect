import { useEffect, useState } from "react";
import { getGamesBy } from '../../services/games';
import GameCard from '../../components/GameCard';

function Games() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const results = await getGamesBy("action");

        if (Array.isArray(results) && results.length > 0) {
          setGames(results);
        } else {
          console.error("No se encontraron juegos de acción.");
          setGames([]); // Evita que sea undefined
        }
      } catch (error) {
        console.error("Error al obtener los videojuegos:", error);
        setGames([]); // Evita el crash si la API falla
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <section>
      <h1 className='font-rubiksh text-gray-200 font-extrabold text-4xl mb-3'>
        Videojuegos Populares
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <p className="text-gray-300">Cargando...</p>
        ) : games.length > 0 ? (
          games.map((game) => (
            <GameCard key={game.id} id={game.id} title={game.name} posterUrl={game.background_image || "https://via.placeholder.com/300"} />
          ))
        ) : (
          <p className="text-red-400 text-center">No se encontraron juegos de acción.</p>
        )}
      </div>
    </section>
  );
}

export default Games;
