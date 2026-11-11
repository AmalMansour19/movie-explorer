
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdb from "../api/tmbd";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError("");

            try {
                const [detailsResponse, similarResponse, videosResponse] =
                    await Promise.all([
                        tmdb.get(`/movie/${id}`),
                        tmdb.get(`/movie/${id}/similar`),
                        tmdb.get(`/movie/${id}/videos`),
                    ]);

                setMovie(detailsResponse.data);
                setSimilar(similarResponse.data.results.slice(0, 5));

                const officialTrailer = videosResponse.data.results.find(
                    (video) =>
                        video.site === "YouTube" &&
                        video.type === "Trailer" &&
                        video.official
                );

                setTrailer(
                    officialTrailer ||
                    videosResponse.data.results.find(
                        (video) => video.site === "YouTube" && video.type === "Trailer"
                    ) ||
                    null
                );
            } catch (err) {
                console.error("Movie details error:", err);
                setError("Unable to load movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <p className="p-10 text-center">Loading movie details...</p>;
    }

    if (error || !movie) {
        return (
            <div className="p-10 text-center">
                <p className="text-red-400">{error || "Movie not found."}</p>
                <Link to="/movies" className="mt-4 inline-block text-yellow-400">
                    Back to Movies
                </Link>
            </div>
        );
    }

    const favorite = isFavorite(movie.id);

    return (
        <main>
            {/* Movie Backdrop */}
            <section
                className="relative flex min-h-[500px] items-end bg-cover bg-center px-6 py-12 md:px-16"
                style={{
                    backgroundImage: `linear-gradient(to top, #0F1117 5%, rgba(15,17,23,0.5)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="flex w-full flex-col gap-8 md:flex-row md:items-end">
                    <img
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://placehold.co/500x750?text=No+Poster"
                        }
                        alt={movie.title}
                        className="w-48 rounded-xl shadow-2xl md:w-64"
                    />

                    <div className="max-w-3xl">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="mb-4 italic text-[#A0A6B5]">
                                {movie.tagline}
                            </p>
                        )}

                        <div className="mb-5 flex flex-wrap gap-4 text-sm text-[#A0A6B5]">
                            <span>📅 {movie.release_date || "Unknown"}</span>
                            <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
                            <span>⏱️ {movie.runtime || "N/A"} min</span>
                        </div>

                        <div className="mb-5 flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="rounded-full border border-gray-600 px-3 py-1 text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <h2 className="mb-2 text-xl font-bold">Overview</h2>

                        <p className="mb-6 leading-7 text-[#A0A6B5]">
                            {movie.overview || "No overview available."}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => toggleFavorite(movie)}
                                className="rounded-lg bg-[#F5C518] px-6 py-3 font-bold text-black"
                            >
                                {favorite ? "♥ Remove Favorite" : "♡ Add to Favorites"}
                            </button>

                            <Link
                                to="/movies"
                                className="rounded-lg border border-gray-500 px-6 py-3"
                            >
                                Back to Movies
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trailer */}
            {trailer && (
                <section className="px-6 py-10 md:px-16">
                    <h2 className="mb-5 text-2xl font-bold">Official Trailer</h2>

                    <div className="aspect-video max-w-4xl">
                        <iframe
                            className="h-full w-full rounded-xl"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={`${movie.title} trailer`}
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>
                </section>
            )}

            {/* Similar Movies */}
            {similar.length > 0 && (
                <section className="px-6 py-10 md:px-16">
                    <h2 className="mb-6 text-2xl font-bold">Similar Movies</h2>

                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {similar.map((item) => (
                            <MovieCard key={item.id} movie={item} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default MovieDetails;
