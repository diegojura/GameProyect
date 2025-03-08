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

    const formatDescription = (description) => {
        if (!description) return null;

        // Convertir el HTML en un documento para poder manipularlo
        const parser = new DOMParser();
        const doc = parser.parseFromString(description, 'text/html');
        const sections = [];
        let currentSection = { title: null, content: [] };

        // Procesar cada nodo
        doc.body.childNodes.forEach(node => {
            if (node.nodeName === 'H3') {
                // Si encontramos un nuevo título, guardamos la sección anterior y empezamos una nueva
                if (currentSection.content.length > 0) {
                    sections.push({ ...currentSection });
                }
                currentSection = {
                    title: node.textContent,
                    content: []
                };
            } else if (node.nodeName === 'P') {
                currentSection.content.push(node.textContent);
            }
        });

        // Añadir la última sección
        if (currentSection.content.length > 0) {
            sections.push(currentSection);
        }

        return sections;
    };

    if (isLoading) return (
        <div className="container mx-auto px-4 py-8">
            <div className="card-industrial p-8 rounded-xl flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metallic-500"></div>
            </div>
        </div>
    );

    if (!publisher) return (
        <div className="container mx-auto px-4 py-8">
            <div className="card-industrial p-8 rounded-xl">
                <div className="text-red-400 text-center">Publisher no encontrado</div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="card-industrial p-8 rounded-xl">
                <h1 className="text-4xl font-bold text-gray-200 mb-6">{publisher.name}</h1>
                
                {publisher.image_background && (
                    <img 
                        src={publisher.image_background}
                        alt={publisher.name}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                )}

                <div className="space-y-8">
                    <div className="prose prose-lg max-w-none">
                        {formatDescription(publisher.description)?.map((section, index) => (
                            <div key={index} className="mb-6">
                                {section.title && (
                                    <h2 className="text-2xl font-semibold text-gray-200 mb-3">
                                        {section.title}
                                    </h2>
                                )}
                                {section.content.map((paragraph, pIndex) => (
                                    <p key={pIndex} className="text-gray-300 mb-2 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>

                    {publisher.games && publisher.games.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-200 mb-6">
                                Juegos Publicados
                            </h2>
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
        </div>
    );
}

export default PublisherDetails; 