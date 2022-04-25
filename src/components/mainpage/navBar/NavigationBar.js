import { AppBar, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";

const NavigationBar = () => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3

  // const [animeList, setAnimeList] = useState([]);

  // const [search, setSearch] = useState("");

  // const FetchAnime = async (query) => {
  //   // const temp = await fetch(
  //   //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
  //   // ).then((res) => res.json());

  //   const temp = await jikanjsV3.search("anime", query, 1);
  //   // const temp = await client.

  //   setAnimeList(temp.results);
  // };

  // const HandleSearch = (e) => {
  //   e.preventDefault();

  //   FetchAnime(search);

  // navigate(`/search-page`, {
  //   state: { searchQuery: search, searchType: type },
  // });
  //   console.log(search);
  // };

  return (
    <AppBar position='static'>
      <div>
        <div className='navigation-bar-items'>
          <Typography>Anime</Typography>
          <Link to='/top-anime' state={{ topFilter: " ", type: "anime" }}>
            <Typography>Top Anime</Typography>
          </Link>

          <Typography>Manga</Typography>
          <Link to='/top-manga' state={{ topFilter: " ", type: "manga" }}>
            <Typography>Top Manga</Typography>
          </Link>
          <Typography>Genres</Typography>
        </div>
        <div className='navigation-bar-search-bar'>
          <SearchBar
          // HandleSearch={HandleSearch}
          // search={search}
          // SetSearch={setSearch}
          // animeList={animeList}
          />
        </div>
      </div>
    </AppBar>
  );
};

export default NavigationBar;
