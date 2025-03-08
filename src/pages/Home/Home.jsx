import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/slices/gamesSlice';
import { Carousel } from 'flowbite-react';
import { Link } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const { games, isLoading } = useSelector(state => state.games);

    useEffect(() => {
        dispatch(fetchGames({}));
    }, [dispatch]);

    return (
        <>
            <section className="w-full mb-6 py-12 md:py-24 lg:py-32 xl:py-48"
                style={{
                    backgroundImage: "url('https://img.freepik.com/vector-gratis/fondo-controlador-videojuego-futurista-espacio-texto_1017-54730.jpg?t=st=1739269275~exp=1739272875~hmac=6531e5c38ee7aca98c29a1e0cc0df0a78d50910cbf7a3b9e44ba47eb0660f915&w=2000')",
                    backgroundSize: "cover",
                }}>
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Bienvenido a <span className='text-primary-200'>VideoGames</span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-white md:text-xl dark:text-gray-400">
                                Descubre los mejores videojuegos
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Link className="inline-flex h-9 items-center justify-center rounded-md bg-primary-200 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary-200/90"
                                to="/games">
                                Ver catálogo de juegos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h1 className='font-rubiksh text-3xl text-gray-200 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
                    Juegos Destacados
                </h1>
                <div className="h-[32rem] mb-16 mt-12 sm:h-[24rem] xl:h-[28rem] 2xl:h-[32rem]">
                {isLoading ? (
                  <p className="text-gray-400 text-center">Cargando juegos...</p>
                ) : games.length > 0 ? (
                  <Carousel slideInterval={2000} className="mb-3 mt-3 h-full">
                    {games.map((game) => (
                      <div key={game.id} className="flex flex-col items-center justify-center h-full px-4 pb-8">
                        <Link to={`/gamedetails/${game.id}`} className="w-full h-4/5">
                          <img
                            src={game.background_image ? game.background_image : "https://via.placeholder.com/600"}
                            alt={game.name || "Juego sin nombre"}
                            className="object-cover w-full h-full rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                          />
                        </Link>
                        <p className="text-xl font-bold text-center text-gray-200 mt-2 truncate w-full">{game.name}</p>
                      </div>
                    ))}
                  </Carousel>
                ) : (
                    <p className="text-red-400 text-center">
                        No se encontraron juegos. Intenta de nuevo más tarde.
                    </p>
                )}
                </div>
            </section>
        </>
    );
}

export default Home;