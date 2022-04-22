import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import AnimeInfo from "./components/AnimeInfo/AnimeInfo.tsx";
import MangaInfo from "./components/MangaInfo/MangaInfo.tsx";
import Mainpage from "./components/mainpage/Mainpage";
import TopAnime from "./components/TopAnimePage/TopAnime.tsx";

// import { Routes } from "react-router";

const App = () => {
  // const [animeList, setAnimeList] = useState([]);
  // const [topAnime, setTopAnime] = useState([]);
  // const [topManga, setTopManga] = useState([]);
  // const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  // const jikanjsV4 = require("@mateoaranda/jikanjs");

  // const GetTopAnime = async () => {
  // const temp = await fetch(
  //   // `https://api.jikan.moe/v4/top/anime//bypopularity/1`,
  //   `https://api.jikan.moe/v3/top/anime/1/bypopularity`,
  // ).then((res) => res.json());

  //   setTopAnime(temp.top.slice(0, 5));
  // };

  // const getGenres = async () => {
  //   const temp = await jikanjs.loadGenres("anime");
  //   console.log(temp);
  // };
  // console.log(getGenres());
  // const GetTopAnime = async () => {
  //   const temp = await jikanjsV3.loadTop("anime", 1, "bypopularity");

  //   setTopAnime(temp.top.slice(0, 5));
  // };

  // const GetTopManga = async () => {
  //   const temp = await jikanjsV3.loadTop("manga", 1, "bypopularity");

  //   setTopManga(temp.top.slice(0, 5));
  // };
  // const GetDefault = async () => {
  //   const temp = await jikanjsV3.loadTop("anime", 1, "bypopularity");

  //   let defaultItems = temp.results;
  //   return defaultItems;
  // };

  // const HandleSearch = (e) => {
  //   e.preventDefault();

  //   FetchAnime(search);
  // };

  // const FetchAnime = async (query) => {
  //   // const temp = await fetch(
  //   //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
  //   // ).then((res) => res.json());

  //   const temp = await jikanjsV3.search("anime", query, 1);
  //   // const temp = await client.

  //   setAnimeList(temp.results);
  // };

  // useEffect(() => {
  //   GetTopAnime();
  //   GetTopManga();
  // }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Mainpage />}></Route>
        <Route path='/anime-info' element={<AnimeInfo />}></Route>
        <Route path='/manga-info' element={<MangaInfo />}></Route>
        <Route path='/top-anime' element={<TopAnime />}></Route>
      </Routes>
    </div>
  );
};

export default App;
