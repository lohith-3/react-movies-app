import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const App = () => {
  return (
    <div className="p-4">
      <Movies />
    </div>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("batman");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchMovies = setTimeout(async () => {
      try {
        if (!searchQuery.length) return;

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=d0608cdc&s=${searchQuery}`
        );
        const result = await response.json();
        if (result.Response === "True") {
          setMovies(result.Search);
        }
      } catch (error) {
        console.error(`error: ${error}`);
      }
    }, 1000);

    return () => clearTimeout(fetchMovies);
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between items-center">
        <p className="text-white text-lg tracking-wide">Movies</p>
        <input
          type="text"
          id="small-input"
          placeholder="Type to search..."
          className="flex-2 p-2 outline-none rounded-md tracking-wide"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      <div className="w-3/4 m-auto grid grid-cols-4 gap-4">
        {movies.length > 0 &&
          movies.map((movie) => <Card movie={movie} key={movie.imdbID} />)}
      </div>
    </div>
  );
};

const Card = ({ movie }) => {
  const { Poster: poster, Title: title } = movie;

  const getTitleName = () => {
    if (!title.length) return;

    return title.length > 20 ? `${title.slice(0, 25) + "..."}` : title;
  };

  return (
    <div className="rounded-md cursor-pointer bg-white  shadow-md hover:scale-105">
      <img src={poster} alt={title} className="object-cover h-80 w-full" />
      <div className="p-3 flex flex-row items-center justify-between">
        <p title={title}>{getTitleName()}</p>
        <p>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="red"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  movie: PropTypes.object,
};

export default App;
