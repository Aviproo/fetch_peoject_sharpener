import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];
  const [islaoding, setIsLosding] = useState(false);
  const [movies, setmovies] = useState([]);
  async function clckHandeler() {
    setIsLosding(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transformData = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setmovies(transformData);
    setIsLosding(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={clckHandeler}>Fetch Movies</button>
      </section>
      <section>
        {!islaoding && <MoviesList movies={movies} />}
        {islaoding && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
