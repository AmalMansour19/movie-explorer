
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-800 bg-[#1C202B] px-6 py-10 text-[#A0A6B5] md:px-16">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
                <div className="text-center md:text-left">
                    <Link to="/" className="text-2xl font-bold text-white">
                        Movie<span className="text-yellow-400">Explorer</span>
                    </Link>

                    <p className="mt-2 text-sm">
                        Discover your next favorite movie.
                    </p>
                </div>

                <nav className="flex flex-wrap justify-center gap-6 text-sm">
                    <Link to="/" className="hover:text-yellow-400">Home</Link>
                    <Link to="/movies" className="hover:text-yellow-400">Movies</Link>
                    <Link to="/favorites" className="hover:text-yellow-400">Favorites</Link>
                </nav>
            </div>

            <div className="mx-auto mt-8 max-w-7xl border-t border-gray-700 pt-6 text-center">
                <p className="text-xs leading-6">
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                </p>

                <p className="mt-3 text-xs">
                    © {new Date().getFullYear()} Movie Explorer. Built for educational purposes.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
