
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdb from "../api/tmbd.js";
import MovieCard from "../components/MovieCard";

function Home() {
    const [popular, setPopular] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHomeMovies = async () => {
            try {
                const [popularResponse, trendingResponse] = await Promise.all([
                    tmdb.get("/movie/popular"),
                    tmdb.get("/trending/movie/week"),
                ]);

                setPopular(popularResponse.data.results);
                setTrending(trendingResponse.data.results);
            } catch (err) {
                console.error(err);
                setError("Unable to load movies. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchHomeMovies();
    }, []);

    if (loading) {
        return <p className="p-10 text-center">Loading movies...</p>;
    }

    if (error) {
        return <p className="p-10 text-center text-red-400">{error}</p>;
    }

    const hero = trending[0];

    return (
        <main>
            {hero && (
                <section
                    className="flex min-h-[500px] items-end bg-cover bg-center px-6 py-12 md:px-16"
                    style={{
                        backgroundImage: `linear-gradient(to top, #0F1117, transparent), url(https://image.tmdb.org/t/p/original${hero.backdrop_path})`,
                    }}
                >
                    <div className="max-w-2xl">
                        <p className="mb-3 font-semibold text-yellow-400">
                            TRENDING THIS WEEK
                        </p>

                        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                            {hero.title}
                        </h1>

                        <p className="mb-6 line-clamp-3 text-[#A0A6B5]">
                            {hero.overview}
                        </p>

                        <Link
                            to={`/movies/${hero.id}`}
                            className="inline-block rounded-lg bg-[#F5C518] px-6 py-3 font-bold text-black"
                        >
                            View Details
                        </Link>
                    </div>
                </section>
            )}

            <section className="px-6 py-10 md:px-16">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Popular Movies</h2>
                    <Link to="/movies" className="text-yellow-400">
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {popular.slice(0, 10).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            <section className="px-6 py-10 md:px-16">
                <h2 className="mb-6 text-2xl font-bold">Trending This Week</h2>

                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {trending.slice(0, 10).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
