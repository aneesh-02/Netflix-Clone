import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "./requests";
import "./Banner.css"

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      console.log(
        request.data.results[Math.random() * request.data.results.length - 1]
      );
      // [.. , .. , ..] is an array and this eqn gives us a random element out of it.
      setMovie(
        request.data.results[Math.random() * request.data.results.length - 1]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        //   inline styling for banner 
        backgroundSize: "cover",
        backgroundImage: `url(
      "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
      )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
          {/*  if movie title doesnt exist take name if name doesnt exist take original_name */}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
