import { NavLink, Link } from "react-router-dom"
import webLogo from "../assets/react.svg"

const links = [
  { name: "Home", path: "/" },
  { name: "Games", path: "/games" },
  { name: "Publishers", path: "/publishers" },
]

function AppNavbar() {
  return (
    <nav className="glass-card rounded-xl mb-6 border-b border-primary-300/10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse hover-glow">
          <img src={webLogo || "/placeholder.svg"} className="h-8 animate-spin-slow" alt="Web Logo" />
          <span className="metallic-text self-center text-2xl font-bold whitespace-nowrap">Game Explorer</span>
        </Link>
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
