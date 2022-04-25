import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import AnimeInfo from "./components/AnimeInfo/AnimeInfo.js";
import MangaInfo from "./components/MangaInfo/MangaInfo.js";
import Mainpage from "./components/mainpage/Mainpage";
import TopAnime from "./components/TopAnimePage/TopAnime.js";
import SearchPage from "./components/Search/SearchPage.js";
import TopManga from "./components/TopMangaPage/TopManga.js";
import AnimeCharacterPage from "./components/CharacterPage/AnimeCharacterPage.js";
import AnimeCharacterListPage from "./components/CharacterListPage/AnimeCharacterListPage.js";
import MangaCharacterList from "./components/CharacterListPage/MangaCharacterList.js";
import AnimeRecPage from "./components/RecommendePages/AnimeRecPage.js";
import MangaRecPage from "./components/RecommendePages/MangaRecPage.js";

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
        <Route path='/top-manga' element={<TopManga />}></Route>
        <Route path='/search-page' element={<SearchPage />}></Route>
        <Route
          path='/character-profile'
          element={<AnimeCharacterPage />}
        ></Route>
        <Route
          path='/anime-character-list-page'
          element={<AnimeCharacterListPage />}
        ></Route>
        <Route
          path='/manga-character-list-page'
          element={<MangaCharacterList />}
        ></Route>
        <Route path='anime-recs-page' element={<AnimeRecPage />}></Route>
        <Route path='manga-recs-page' element={<MangaRecPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
