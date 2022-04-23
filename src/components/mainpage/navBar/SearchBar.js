import React from "react";
import AnimeCard from "./AnimeCard";
import { Button, MenuItem, Select } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchBar = (props) => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  let defaultItems;

  const [animeList, setAnimeList] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("anime");
  let navigate = useNavigate();

  const FetchAnime = async (query) => {
    // const temp = await fetch(
    //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
    // ).then((res) => res.json());

    const temp = await jikanjsV3.search("anime", query, 1);
    // const temp = await client.

    setAnimeList(temp.results);
  };

  // const HandleSearch = (e) => {
  //   e.preventDefault();

  //   FetchAnime(search);
  //   console.log(search);
  // };
  // console.log(props.search);

  return (
    <div className='search-bar-container'>
      <Select
        labelid='search-bar-type-filter'
        value={type}
        label='Type'
        onChange={(e, data) => {
          setType(data.props.value);
          console.log(type);
        }}
      >
        <MenuItem value='anime'>Anime</MenuItem>
        <MenuItem value='manga'>Manga</MenuItem>
      </Select>
      <form
        className='search-box'
        onSubmit={async (e) => {
          e.preventDefault();

          FetchAnime(search);
          console.log(search, e.charCode);
          navigate(`/search-page`, {
            state: { searchQuery: search, searchType: type },
          });
          window.location.reload();
        }}
      >
        <input
          type='search'
          placeholder='Search for an anime...'
          required
          value={props.search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <Link to='/search-page' state={{ list: animeList, searchQuery: search }}>
        <Button>plssssssssss</Button>
      </Link>
    </div>
  );
};

export default SearchBar;
