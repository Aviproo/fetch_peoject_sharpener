import React, { useEffect, useState } from "react";

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
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [date, setDate] = useState();

  const titleHandeler = (event) => {
    setTitle(event.target.value);
  };
  const textHandeler = (event) => {
    setText(event.target.value);
  };
  const dateHandeler = (event) => {
    setDate(event.target.value);
  };
  const detailsHandeler = () => {
    let filledData = {
      title: title,
      text: text,
      date: date,
    };
    console.log(filledData);
  };

  const [isloading, setIsLoading] = useState(false);
  const [movies, setmovies] = useState([]);
  const [error, setError] = useState(null);
  async function clickHandeler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
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
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    clickHandeler();
  }, []);
  let content = <p>Fount no movie</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <>{error}</>;
  }
  if (isloading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <span>Title</span>
        <input onChange={titleHandeler} />
        <br />
        <span>Opening Text </span>
        <input onChange={textHandeler} />
        <br />
        <span>Release date</span>
        <input onChange={dateHandeler} />
        <br />
        <button onClick={detailsHandeler}>Add Movies</button>
      </section>
      <section>
        <button onClick={clickHandeler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
