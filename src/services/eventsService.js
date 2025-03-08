export const events = [
    {
        id: 1,
        title: "Gaming Expo 2025",
        location: "New York",
        date: "2025-03-15",
        description: "La exposición más grande de videojuegos del año. Descubre las últimas novedades y conoce a tus desarrolladores favoritos.",
        image: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Indie Game Developers Meetup",
        location: "San Francisco",
        date: "2025-04-20",
        description: "Únete a la comunidad indie y comparte tus experiencias en el desarrollo de videojuegos independientes.",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Esports Championship",
        location: "Los Angeles",
        date: "2025-05-10",
        description: "El campeonato más importante de esports del año. Compite contra los mejores jugadores del mundo.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Retro Gaming Festival",
        location: "Tokyo",
        date: "2025-06-25",
        description: "Revive los clásicos y disfruta de la nostalgia en este festival dedicado a los videojuegos retro.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    }
];

// Simula una petición API que devuelve los eventos después de un pequeño retraso
export const fetchEvents = () => {
    console.log('Starting fetchEvents...');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (!Array.isArray(events)) {
                    throw new Error('Events data is not in the expected format');
                }
                console.log('Resolving fetchEvents with:', events);
                resolve(events);
            } catch (error) {
                console.error('Error in fetchEvents:', error);
                reject(error);
            }
        }, 500);
    });
}; 