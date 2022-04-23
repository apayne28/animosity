import React from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoSideContent from "./AnimeInfoSideContent.js";
import AnimeInfoMainGuts from "./AnimeInfoMainGuts.js";
import { useLocation } from "react-router-dom";

const AnimeInfo = () => {
  const location = useLocation();

  const id = location.state.animeId;
  console.log(location.state.animeId);
  return (
    <div className='anime-info-container'>
      <div className='header-content'>
        <Header />

        <NavigationBar />
      </div>
      <div className='anime-info-main'>
        <AnimeInfoSideContent animeId={id} />
        <AnimeInfoMainGuts animeId={id} />
      </div>
    </div>
  );
};

export default AnimeInfo;
