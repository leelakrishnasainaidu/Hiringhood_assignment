import React, { useState, useEffect } from 'react';
import { Film, Menu, X, Play } from 'lucide-react';
import './Data.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjUzOTUwMDlhNjM3NmFhYWNhODBiYTUzMGMwYmNhYyIsIm5iZiI6MTczODY0NDI2NC41MjMsInN1YiI6IjY3YTE5YjI4YTQ1Mjg3YjdmZGUyY2EyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TNrUYNttsX2WkPiHSad5PzLpk8VGWDZdNhmOUGC9Wyw';

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <a href="/" className="nav-brand">
            <Film size={24} />
            <span>MovieDB Explorer</span>
          </a>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="/" className="nav-link">Now Playing</a>
            <a href="/" className="nav-link">Top Rated</a>
            <a href="/" className="nav-link">Upcoming</a>
          </div>
        </div>
      </nav>

      <header className="header">
        <div className="container">
          <h1>Now Playing Movies</h1>
          <p>Discover the latest movies in theaters</p>
        </div>
      </header>

      <main className="container">
        <div className="movies-grid">
          {movies.map((movie) => (
            <article key={movie.id} className="movie-card">
              <div className="movie-poster-container">
                <img
                  src={`${IMG_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                  loading="lazy"
                />
                <div className="movie-rating">{movie.vote_average.toFixed(1)}</div>
              </div>
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-release-date">{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;