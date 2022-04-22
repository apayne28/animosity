import { AppBar, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import MainContentSearch from "./MainContentSearch";

const NavigationBar = () => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3

  const [animeList, setAnimeList] = useState([]);

  const [search, setSearch] = useState("");

  const FetchAnime = async (query) => {
    // const temp = await fetch(
    //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
    // ).then((res) => res.json());

    const temp = await jikanjsV3.search("anime", query, 1);
    // const temp = await client.

    setAnimeList(temp.results);
  };

  const HandleSearch = (e) => {
    e.preventDefault();

    FetchAnime(search);
  };

  return (
    <AppBar position='static'>
      <div className='navigation-bar-items'>
        <Typography>Anime</Typography>
        <Link to='/top-anime' state={{ topFilter: " ", type: "anime" }}>
          <Typography>TopAnime</Typography>
        </Link>

        <Typography>Manga</Typography>
        <Typography>Genres</Typography>
      </div>
      <div>
        <MainContentSearch
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={setSearch}
          animeList={animeList}
        />
      </div>
    </AppBar>
  );
};

export default NavigationBar;
