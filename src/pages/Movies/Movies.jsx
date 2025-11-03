import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axiosConfig";
import "./Movies.css";
import Loader from "../../components/Loader/Loader";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies");
        const data = res.data.movies || res.data;
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data?.message) {
          setError(err.response.data.message);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Something went wrong while fetching movies.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // 🔍 Handle search filter
  useEffect(() => {
    const q = search.toLowerCase();
    setFilteredMovies(
      movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(q) ||
          movie.genre?.toLowerCase().includes(q)
      )
    );
  }, [search, movies]);

  const getInitials = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length === 1) return words[0][0];
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="movies-page error-page">
        <div className="error-box">
          <h2>⚠️ Failed to Load Movies</h2>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="movies-page">
      <input
        type="text"
        placeholder="🔍 Search by title or genre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <h2 className="page-title" style={{paddingTop: 0}}>Now Showing 🍿</h2>

      {filteredMovies.length === 0 ? (
        <p className="no-movies">No movies match your search.</p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <div className="movie-poster">
                <span>{getInitials(movie.title)}</span>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="description">{movie.description}</p>
                <p className="genre">
                  🎭 <b>Genre:</b> {movie.genre}
                </p>
                <div className="showtimes">
                  {movie.showtimes.map((st) => (
                    <Link key={st._id} to={`/booking/${movie._id}/${st._id}`}>
                      <button className="showtime-btn">
                        {new Date(st.time).toLocaleString()}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
