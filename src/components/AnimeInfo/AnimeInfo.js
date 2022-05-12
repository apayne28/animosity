import React from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoSideContent from "./AnimeInfoSideContent.js";
import AnimeInfoMainGuts from "./AnimeInfoMainGuts.js";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";

const AnimeInfo = (props) => {
  const location = useLocation();

  const id =
    props.animeId !== undefined ? props.animeId : location.state.animeId;
  console.log(props.animeId, location, id);

  return (
    <Box className='anime-info-container'>
      <div className='header-content'>
        <Header />

        <NavigationBar />
      </div>
      {/* <div className='anime-info-main'> */}
      <div>
        <AnimeInfoSideContent animeId={id} />
        {/* <AnimeInfoMainGuts animeId={id} /> */}
      </div>
    </Box>
  );
};

export default AnimeInfo;
