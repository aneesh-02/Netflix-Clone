import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads, and dont run again
    // if we passed a variable, it runs once when the row loads, and aslo runs again if the variable changes
    // eg [movies] will run again when movies changes

    // now we create an async function and call it once just after defining it
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // : wait for axios to get the fetchUrl
      // here .get basically appends the fetchUrl in front of the baseUrl
      // and is stored in the request const which well use later
      // console.log(request); // on the consol we can se its an object
      // console.log(request.data.results); // we are interested in results key of this object
      // on the consol we se that results is an array of movies

      setMovies(request.data.results);
      // in Use state we change the state and the new value is this results
      return request;
    }
    fetchData();
  }, [fetchUrl]); // here we have to pass any variable  that we use inside the useEffect
  // we tell Use Effect that this is a dependency which came from outside the block and could change
  // because whenever it changes, the effect has to be changed

  console.table(movies);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleClick = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {
          /*.map is gonna go thru all the 20 objects and we tell it to return an image*/
          movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={"${base_url}${movie.poster_path}"}
              alt={movie.name}
            />
          ))
        }
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
