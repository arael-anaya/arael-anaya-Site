const TMDB_API_KEY = "e2311bda6f01c9b4b57c4fc3f6f5ff42";

export async function fetchMovie(query) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl);
    if (!response.ok) {
        throw new Error("TMDB search failed");
    }

    const data = await response.json();
    const movie = data.results?.[0];
    if (!movie) return null;

    return {
        id: movie.id,
        title: movie.title,
        subtitle: movie.release_date?.slice(0, 4) ?? "",
        image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
        external_url: `https://www.themoviedb.org/movie/${movie.id}`,
        source: "TMDB",
        meta: movie.vote_average ? `★ ${movie.vote_average.toFixed(1)}` : ""
    };
}
