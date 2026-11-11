
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    return (
        <article className="overflow-hidden rounded-xl bg-[#1C202B]">
            <Link to={`/movies/${movie.id}`}>
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://placehold.co/500x750?text=No+Poster"
                    }
                    alt={movie.title}
                    className="aspect-[2/3] w-full object-cover transition hover:scale-105"
                />
            </Link>

            <div className="p-3">
                <h3 className="truncate font-semibold">{movie.title}</h3>

                <p className="mt-1 text-sm text-[#A0A6B5]">
                    ⭐ {movie.vote_average?.toFixed(1)}
                </p>

                <button
                    onClick={() => toggleFavorite(movie)}
                    className="mt-3 w-full rounded-lg bg-[#F5C518] px-3 py-2 text-sm font-bold text-black hover:bg-[#E5B817]"
                >
                    {favorite ? "♥ Remove Favorite" : "♡ Add Favorite"}
                </button>
            </div>
        </article>
    );
}

export default MovieCard;
