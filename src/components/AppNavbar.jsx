import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import webLogo from "../assets/react.svg"

const links = [
  { name: "Home", path: "/" },
  { name: "Games", path: "/games" },
  { name: "Events", path: "/events" },
  { name: "Publishers", path: "/publishers" },
]

function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(state => state.user.user);

  return (
    <nav className="glass-card rounded-xl mb-6 border-b border-primary-300/10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse hover-glow">
          <img src={webLogo || "/placeholder.svg"} className="h-8 animate-spin-slow" alt="Web Logo" />
          <span className="metallic-text self-center text-2xl font-bold whitespace-nowrap">Game Explorer</span>
        </Link>

        <div className="flex items-center md:order-2 relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={user.avatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-primary-300/30"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-metallic-600 border-b">
                  {user.name}
                </div>
                <Link
                  to="/favorites"
                  className="block px-4 py-2 text-sm text-metallic-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mis Favoritos
                </Link>
                <Link
                  to="/my-events"
                  className="block px-4 py-2 text-sm text-metallic-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mis Eventos
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-quicksand transition-all duration-300 hover:text-primary-300 ${
                      isActive ? "text-primary-200 font-bold" : "text-gray-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar