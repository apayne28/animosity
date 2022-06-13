import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import Carousel from "react-elastic-carousel";
import { Box } from "@mui/system";

const HomepageContent = () => {
  // const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3

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

    setSummerAnime(temp.data);
  };

  const GetRecentPromos = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/watch/promos`).then(
      (res) => res.json(),
    );

    setRecentPromos(temp.data);
  };

  const GetPopularPromos = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/watch/promos/popular`,
    ).then((res) => res.json());

    setPopularPromos(temp.data);
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

  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];
  const promoBreakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    // { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1100, itemsToShow: 2, itemsToScroll: 2 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];
  console.log(window.innerWidth);

  return (
    <div className='homepage-content'>
      <div className='homepage-header-content'>
        <Typography variant='h3' sx={{ marginBottom: "2%" }}>
          Spring 2022 Anime
        </Typography>
        <Link to='/top-anime' state={{ animeList: springAnime }}>
          <Typography
            sx={{
              fontSize: 29,
            }}
          >
            View More
          </Typography>
        </Link>
      </div>
      <Box sx={{ paddingBottom: "3%" }}>
        <Carousel breakPoints={breakPoints}>
          {springAnime.map((anime, aniKey) => {
            return (
              // <Grid item className='individual-featured-anime-container'>
              <div key={aniKey} style={{ width: "95%" }}>
                <ImageList cols={1} rowHeight={500}>
                  <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
                    <ImageListItem key={anime.id}>
                      <Box
                        component='img'
                        className='featured-anime-image'
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        sx={{ width: "100%", height: "100%" }}
                      />
                      <ImageListItemBar title={anime.title} />
                    </ImageListItem>
                    {/* <div className='featured-anime-text'>{anime.title}</div> */}
                  </Link>
                </ImageList>
              </div>
              // </Grid>
            );
          })}
        </Carousel>
      </Box>

      <div className='homepage-header-content'>
        {/* <h3>Upcoming Summer 2022 Anime</h3> */}
        <Typography variant='h3' sx={{ marginBottom: "2%" }}>
          Upcoming Summer 2022 Anime
        </Typography>
        <Link to='/top-anime' state={{ animeList: summerAnime }}>
          <Typography
            sx={{
              fontSize: 29,
            }}
          >
            View More
          </Typography>
        </Link>
      </div>
      <Box sx={{ paddingBottom: "3%" }}>
        <Carousel breakPoints={breakPoints}>
          {summerAnime.map((anime, aniKey) => {
            return (
              // <Grid item className='individual-featured-anime-container'>
              <div key={aniKey} style={{ width: "95%" }}>
                <ImageList cols={1} rowHeight={500}>
                  <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
                    <ImageListItem key={anime.id} cols={1} rows={1}>
                      <img
                        className='featured-anime-image'
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        sx={{ width: "100%", height: "100%" }}
                      />
                      <ImageListItemBar title={anime.title} />
                    </ImageListItem>
                    {/* <div className='featured-anime-text'>{anime.title}</div> */}
                  </Link>
                </ImageList>
              </div>
              // </Grid>
            );
          })}
        </Carousel>
      </Box>

      <Typography variant='h3' sx={{ marginBottom: "2%" }}>
        Watch Recent Promos
      </Typography>
      <Box sx={{ paddingBottom: "3%" }}>
        <Carousel breakPoints={promoBreakPoints}>
          {recentPromos.map((anime, aniKey) => {
            return (
              <div key={aniKey} s>
                <ImageList cols={1} rowHeight={400}>
                  <ImageListItem>
                    <ReactPlayer url={anime.trailer.url} />
                    <ImageListItemBar
                      title={anime.entry.title}
                      subtitle={anime.title}
                    />
                  </ImageListItem>
                </ImageList>
              </div>
            );
          })}
        </Carousel>
      </Box>

      <Typography variant='h3' sx={{ marginBottom: "2%" }}>
        Watch Popular Promos
      </Typography>
      <Box sx={{ paddingBottom: "3%" }}>
        <Carousel breakPoints={promoBreakPoints}>
          {popularPromos.map((anime, aniKey) => {
            return (
              <div key={aniKey}>
                <ImageList cols={1} rowHeight={420}>
                  <ImageListItem>
                    <ReactPlayer url={anime.trailer.url} />
                    <ImageListItemBar
                      title={anime.entry.title}
                      subtitle={anime.title}
                    />
                  </ImageListItem>
                </ImageList>
              </div>
            );
          })}
        </Carousel>
      </Box>
    </div>
  );
};

export default HomepageContent;
