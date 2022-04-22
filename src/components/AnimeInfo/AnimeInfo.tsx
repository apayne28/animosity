import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoSideContent from "./AnimeInfoSideContent.tsx";
import AnimeInfoMainGuts from "./AnimeInfoMainGuts.tsx";
import { useLocation } from "react-router-dom";

const AnimeInfo = () => {
  const location = useLocation();
  // const {from} = location.state
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
