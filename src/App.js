import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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
import GenreListPage from "./components/Genres/GenreListPage.js";
import { createTheme, ThemeProvider } from "@mui/material";
import CharacterVoiceActorPage from "./components/CharacterVoiceActorPage/CharacterVoiceActorPage.js";
import VoiceActorRoleListPage from "./components/CharacterVoiceActorPage/VoiceActorRoleListPage.js";
import CharacterVoiceActorAnimePage from "./components/CharacterVoiceActorPage/CharacterVoiceActorAnimePage.js";
import AnimeCharacterVoiceActorPage from "./components/CharacterPage/AnimeCharacterVoiceActorPage.js";
import AnimeCharacterAnimePage from "./components/CharacterPage/AnimeCharacterAnimePage.js";
import AnimeCharacterMangaPage from "./components/CharacterPage/AnimeCharacterMangaPage.js";
import MangaAuthorPage from "./components/MangaAuthor/MangaAuthorPage.js";
import MangaAuthorMangaPage from "./components/MangaAuthor/MangaAuthorMangaPage.js";

// import { Routes } from "react-router";

const App = () => {
  const THEME = createTheme({
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      color: "#3B2C35",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    // pagination: { fontSize: 45 },
  });

  return (
    <ThemeProvider theme={THEME}>
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
            path='character-page-voice-actor-list'
            element={<AnimeCharacterVoiceActorPage />}
          ></Route>
          <Route
            path='character-page-anime-list'
            element={<AnimeCharacterAnimePage />}
          ></Route>
          <Route
            path='character-page-manga-list'
            element={<AnimeCharacterMangaPage />}
          ></Route>
          <Route
            path='/anime-character-list-page'
            element={<AnimeCharacterListPage />}
          ></Route>
          <Route
            path='character-voice-actor-page'
            element={<CharacterVoiceActorPage />}
          ></Route>
          <Route
            path='voice-actor-role-list-page'
            element={<VoiceActorRoleListPage />}
          ></Route>
          <Route
            path='voice-actor-anime-list-page'
            element={<CharacterVoiceActorAnimePage />}
          ></Route>
          <Route path='manga-author-page' element={<MangaAuthorPage />}></Route>
          <Route
            path='manga-author-manga-list'
            element={<MangaAuthorMangaPage />}
          ></Route>
          <Route
            path='/manga-character-list-page'
            element={<MangaCharacterList />}
          ></Route>
          <Route path='anime-recs-page' element={<AnimeRecPage />}></Route>
          <Route path='manga-recs-page' element={<MangaRecPage />}></Route>
          <Route path='genre-list-page' element={<GenreListPage />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
