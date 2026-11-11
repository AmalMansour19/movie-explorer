
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'Favorites', path: '/favorites' },
    ]

    const linkStyle = ({ isActive }) =>
        `transition-colors duration-300 ${isActive
            ? 'text-yellow-400'
            : 'text-gray-400 hover:text-white'
        }`

    return (
        <nav className="relative z-50 border-b border-white/10 bg-[#0F1117]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                <NavLink
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-bold text-yellow-400"
                >
                    Movie<span className="text-white">Explorer</span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            className={linkStyle}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2xl text-white md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="flex flex-col gap-5 border-t border-white/10 px-6 py-5 md:hidden">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            onClick={() => setMenuOpen(false)}
                            className={linkStyle}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default Navbar
