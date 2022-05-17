import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

import HomepageContent from "./HomepageContent";

import NavigationBar from "./navBar/NavigationBar";
// import "./mainpage.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ReactPlayer from "react-player";
import { Carousel } from "react-bootstrap";
import aot from "../../aot.jpeg";
import deathnote from "../../deathnote.webp";
import deathnote3 from "../../deathnote3.png";
import fmab from "../../fmab.webp";
import opm from "../../opm.jpg";
import bnha from "../../bnha.jpeg";
import bnha2 from "../../bnha2.webp";
import berserk from "../../berserk.jpg";
import anime from "../../anime.jpeg";
import { Box } from "@mui/system";

const Mainpage = () => {
  const [springAnime, setSpringAnime] = useState([]);
  const [summerAnime, setSummerAnime] = useState([]);
  const [recentPromos, setRecentPromos] = useState([]);
  const [popularPromos, setPopularPromos] = useState([]);

  const GetSpringAnime = async () => {
    // const temp = await jikanjsV3.loadSeason(2021, "spring");
    const temp = await fetch(
      `https://api.jikan.moe/v4/seasons/2022/spring`,
      //   `https://api.jikan.moe/v3/season/2022/spring`,
    ).then((res) => res.json());

    setSpringAnime(temp.data);
  };

  const GetSummerAnime = async () => {
    // const temp = await jikanjsV3.loadSeason(2021, "spring");
    const temp = await fetch(
      `https://api.jikan.moe/v4/seasons/2022/summer`,
      //   `https://api.jikan.moe/v3/season/2022/spring`,
    ).then((res) => res.json());

    setSummerAnime(temp.data.slice(0, 5));
  };

  const GetRecentPromos = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/watch/promos`).then(
      (res) => res.json(),
    );

    setRecentPromos(temp.data.slice(0, 5));
  };

  const GetPopularPromos = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/watch/promos/popular`,
    ).then((res) => res.json());

    setPopularPromos(temp.data.slice(0, 5));
  };

  // const openNewPage = (url) => {
  //   let newPage = window.open(url, "noopener,noreferrer");
  // }

  useEffect(() => {
    GetSpringAnime();
    GetSummerAnime();
    GetRecentPromos();
    GetPopularPromos();
  }, []);
  return (
    // <div className='app-content'>
    <div className='mainpage-container'>
      {/* <div className='header-content'> */}
      <div>
        {/* <Header /> */}

        <NavigationBar />
      </div>
      <div className='homepage-carousel'>
        <Carousel>
          <Carousel.Item>
            <ImageList cols={1} rowHeight={1100}>
              <ImageListItem>
                <Box
                  component='img'
                  src={anime}
                  alt='Death Note'
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    margin: "auto",
                    display: "flex",
                  }}
                />
                <Carousel.Caption>
                  <Typography variant='h3'>Welcome</Typography>
                </Carousel.Caption>
              </ImageListItem>
            </ImageList>
          </Carousel.Item>
          <Carousel.Item>
            <ImageList cols={1} rowHeight={1100}>
              <ImageListItem>
                <Box
                  component='img'
                  src={aot}
                  alt='Shingeki no Kyojin'
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    margin: "auto",
                    display: "flex",
                  }}
                />
                <Carousel.Caption>
                  <Typography variant='h3'>Shingeki no Kyojin</Typography>
                </Carousel.Caption>
              </ImageListItem>
            </ImageList>
          </Carousel.Item>
          <Carousel.Item>
            <ImageList cols={1} rowHeight={1100}>
              <ImageListItem>
                <Box
                  component='img'
                  src={berserk}
                  alt='Berserk'
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    margin: "auto",
                    display: "flex",
                  }}
                />
                <Carousel.Caption>
                  <Typography variant='h3'>Berserk</Typography>
                </Carousel.Caption>
              </ImageListItem>
            </ImageList>
          </Carousel.Item>

          {/* <Carousel.Item>
            <ImageList cols={1} rowHeight={1100}>
              <ImageListItem>
                <Box
                  component='img'
                  src={fmab}
                  alt='Full Metal Alchemist: Brotherhood'
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    margin: "auto",
                    display: "flex",
                  }}
                />
                <Carousel.Caption>
                  <Typography variant='h3'>
                    Full Metal Alchemist: Brotherhood
                  </Typography>
                </Carousel.Caption>
              </ImageListItem>
            </ImageList>
          </Carousel.Item> */}
        </Carousel>
      </div>
      <div>
        <div>
          <HomepageContent />
        </div>
      </div>
    </div>
    // <body>
    //   <header>
    //     <div className='logo'>
    //       <Link to='/' style={{ textDecoration: "none" }}>
    //         Animosity
    //       </Link>
    //       <div className='nav_bar'>
    //         <ul>
    //           <Link
    //             to='/top-anime'
    //             style={{ display: "inline-block", padding: "15px" }}
    //             state={{ topFilter: " ", type: "anime" }}
    //           >
    //             <Typography>Top Anime</Typography>
    //           </Link>

    //           {/* <Typography>Manga</Typography> */}
    //           <Link
    //             to='/top-manga'
    //             style={{ display: "inline-block", padding: "15px" }}
    //             state={{ topFilter: " ", type: "manga" }}
    //           >
    //             <Typography>Top Manga</Typography>
    //           </Link>
    //         </ul>
    //       </div>
    //     </div>
    //   </header>
    //   {/* <HomepageContent /> */}
    // </body>
    // <div className='app-content'>
    //   <div className='header-content'>
    //     <Header />

    //     <NavigationBar />
    //   </div>
    //   <div className='homepage-content'>
    //     <div>
    //       <HomepageContent />

    //       {/* <Sidebar /> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Mainpage;
