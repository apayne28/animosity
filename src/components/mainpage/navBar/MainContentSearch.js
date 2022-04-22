import React from "react";
import AnimeCard from "./AnimeCard";

const MainContentSearch = (props) => {
  const jikanjs = require("jikanjs"); // Uses per default the API version 3
  let defaultItems;

  return (
    <main>
      <div className='main-head'>
        <form className='search-box' onSubmit={props.HandleSearch}>
          <input
            type='search'
            placeholder='Search for an anime...'
            required
            value={props.search}
            onChange={(e) => props.SetSearch(e.target.value)}
          />
        </form>
      </div>
      <div className='anime-list'>
        {props.animeList.map((anime) => (
          <AnimeCard anime={anime} key={anime.mal_id} />
        ))}
      </div>
    </main>
  );
};

export default MainContentSearch;
