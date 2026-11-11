
import { useEffect, useState } from "react";
import tmdb from "../api/tmbd.js";
import MovieCard from "../components/MovieCard";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get movie genres
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await tmdb.get("/genre/movie/list");
                setGenres(response.data.genres);
            } catch (err) {
                console.error("Genres error:", err);
            }
        };

        fetchGenres();
    }, []);

    // Get movies
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError("");

            try {
                let response;

                if (appliedSearch.trim()) {
                    response = await tmdb.get("/search/movie", {
                        params: {
                            query: appliedSearch,
                            page,
                        },
                    });
                } else {
                    response = await tmdb.get("/discover/movie", {
                        params: {
                            page,
                            with_genres: selectedGenre || undefined,
                            sort_by: sortBy,
                        },
                    });
                }

                setMovies((prev) =>
                    page === 1
                        ? response.data.results
                        : [...prev, ...response.data.results]
                );

                setTotalPages(response.data.total_pages);
            } catch (err) {
                console.error("Movies error:", err);
                setError("Failed to load movies. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [appliedSearch, selectedGenre, sortBy, page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setAppliedSearch(search.trim());
    };

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
        setPage(1);
        setAppliedSearch("");
        setSearch("");
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setPage(1);
    };

    return (
        <main className="min-h-screen px-6 py-10 md:px-16">
            <h1 className="mb-8 text-4xl font-bold">Explore Movies</h1>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-3">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a movie..."
                    className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-[#1C202B] px-4 py-3 outline-none focus:border-yellow-400"
                />

                <button
                    type="submit"
                    className="rounded-lg bg-[#F5C518] px-5 font-bold text-black"
                >
                    Search
                </button>
            </form>

            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-4">
                <select
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="rounded-lg border border-gray-700 bg-[#1C202B] px-4 py-3"
                >
                    <option value="">All Genres</option>

                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="rounded-lg border border-gray-700 bg-[#1C202B] px-4 py-3"
                >
                    <option value="popularity.desc">Most Popular</option>
                    <option value="vote_average.desc">Highest Rated</option>
                    <option value="primary_release_date.desc">Newest</option>
                </select>
            </div>

            {/* Movies */}
            {error && (
                <p className="py-10 text-center text-red-400">{error}</p>
            )}

            {!error && movies.length === 0 && !loading && (
                <p className="py-10 text-center text-[#A0A6B5]">
                    No movies found.
                </p>
            )}

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {loading && (
                <p className="py-8 text-center">Loading movies...</p>
            )}

            {!loading && page < totalPages && (
                <div className="mt-10 text-center">
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="rounded-lg bg-[#F5C518] px-8 py-3 font-bold text-black hover:bg-[#E5B817]"
                    >
                        Load More
                    </button>
                </div>
            )}
        </main>
    );
}

export default Movies;
