
import { NavLink } from 'react-router-dom'

function Navbar() {
    const links = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'Favorites', path: '/favorites' },
    ]

    return (
        <nav className="bg-[#0F1117] border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                {/* Logo */}
                <NavLink to="/" className="text-2xl font-bold text-yellow-400">
                    Movie<span className="text-white">Explorer</span>
                </NavLink>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            className={({ isActive }) =>
                                `transition-colors duration-300 ${isActive
                                    ? 'text-yellow-400'
                                    : 'text-gray-400 hover:text-white'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

            </div>
        </nav>
    )
}

export default Navbar
