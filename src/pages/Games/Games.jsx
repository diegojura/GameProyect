import { useEffect, useState } from "react";
import { getGamesBy } from '../../services/games';
import GameCard from '../../components/GameCard';
import Pagination from '../../components/Pagination';

function Games() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const data = await getGamesBy("action", currentPage);
        
        if (data && data.results) {
          setGames(data.results);
          setTotalPages(Math.ceil(data.count / 20));
        } else {
          console.error("No se encontraron juegos");
          setGames([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setGames([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <section className="bg-industrial-100 p-6 rounded-lg shadow-lg">
      <h1 className='font-rubiksh text-metallic-600 font-extrabold text-4xl mb-6'>
        Videojuegos Populares
      </h1>
      
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
