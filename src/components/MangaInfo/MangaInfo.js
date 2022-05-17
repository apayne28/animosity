import React from "react";
import { Box } from "@mui/material";

import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";

import MangaInfoSideContent from "./MangaInfoSideContent";
import MangaInfoMainGuts from "./MangaInfoMainGuts";
import { useLocation } from "react-router-dom";

const MangaInfo = (props) => {
  const location = useLocation();

  // const id = location.state.mangaId;
  const id = props.mangaId ? props.mangaId : location.state.mangaId;

  console.log(location.state.mangaId);

  return (
    <Box className='anime-info-container'>
      <div className='header-content'>
        {/* <Header /> */}

        <NavigationBar />
      </div>
      <div className='anime-info-main'>
        <MangaInfoSideContent mangaId={id} />
        {/* <MangaInfoMainGuts mangaId={id} /> */}
      </div>
    </Box>
  );
};

export default MangaInfo;
