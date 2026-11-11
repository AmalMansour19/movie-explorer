
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
    const { favorites } = useFavorites();

    return (
        <main className="min-h-screen px-6 py-12 md:px-16">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    My Favorites <span className="text-yellow-400">♥</span>
                </h1>

                <p className="mt-3 text-[#A0A6B5]">
                    You have saved {favorites.length}{" "}
                    {favorites.length === 1 ? "movie" : "movies"}.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <span className="mb-5 text-6xl">🎬</span>

                    <h2 className="mb-3 text-2xl font-bold">
                        No Favorites Yet
                    </h2>

                    <p className="mb-7 max-w-md text-[#A0A6B5]">
                        You haven't added any movies to your favorites.
                        Explore movies and save the ones you love!
                    </p>

                    <Link
                        to="/movies"
                        className="rounded-lg bg-[#F5C518] px-6 py-3 font-bold text-black hover:bg-[#E5B817]"
                    >
                        Explore Movies
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </main>
    );
}

export default Favorites;
