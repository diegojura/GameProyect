import { Link } from "react-router-dom"

function GameCard({ id, title, posterUrl }) {
  return (
    <Link to={`/gameDetails/${id}`}>
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="relative group">
          <img
            alt={title}
            title={title}
            src={posterUrl || "/placeholder.svg"}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darksurf-100/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h2 className="metallic-text text-xl font-bold truncate hover:text-primary-300 transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default GameCard


