import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import ReactPlayer from "react-player";
import Carousel from "react-elastic-carousel";
import { Box } from "@mui/system";

const HomepageContent = () => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const jikanjsV4 = require("@mateoaranda/jikanjs");

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
    { width: 550, itemsToShow: 3, itemsToScroll: 3 },
    // { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },

    { width: 1200, itemsToShow: 10, itemsToScroll: 8 },
  ];
  const promoBreakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    // { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1100, itemsToShow: 2, itemsToScroll: 2 },

    { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
  ];

  return (
    <div className='homepage-content'>
      <div className='homepage-header-content'>
        <h3>Spring 2022 Anime</h3>
        <Link to='/top-anime' state={{ animeList: springAnime }}>
          <Typography
            sx={{
              // padding: "0.5%",
              fontSize: 29,
              // display: "flex",
              // justifyContent: "flex-end",
              // marginTop: "17%",
              // marginRight: "1%",
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
              <div key={aniKey}>
                <ImageList cols={1}>
                  <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
                    <ImageListItem key={anime.id}>
                      <Box
                        component='img'
                        className='featured-anime-image'
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
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
        <h3>Upcoming Summer 2022 Anime</h3>
        <Link to='/top-anime' state={{ animeList: summerAnime }}>
          <Typography
            sx={{
              // padding: "0.5%",
              fontSize: 29,
              // display: "flex",
              // justifyContent: "flex-end",
              // marginTop: "17%",
              // marginRight: "1%",
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
              <div key={aniKey}>
                <ImageList cols={1}>
                  <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
                    <ImageListItem key={anime.id} cols={1} rows={1}>
                      <img
                        className='featured-anime-image'
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
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

      <h3>Watch Recent Promos</h3>
      <Box sx={{ paddingBottom: "3%" }}>
        <Carousel breakPoints={promoBreakPoints}>
          {recentPromos.map((anime, aniKey) => {
            return (
              <div key={aniKey}>
                {/* <ImageList cols={1}>
                  <Link to={anime.trailer.url} target='_blank' rel='noreferrer'>
                    <img
                      className='promo-image'
                      src={anime.trailer.images.large_image_url}
                      alt={`${anime.entry.title}: ${anime.title}`}
                    />
                    <ImageListItem
                      key={anime.id}
                      title={anime.title}
                      cols={1}
                      rows={1}
                    >
                      <ImageListItemBar
                        title={anime.entry.title}
                        subtitle={anime.title}
                      />
                    </ImageListItem>
                  </Link>
                </ImageList> */}
                <ImageList cols={1} rowHeight={420}>
                  <ImageListItem>
                    <ReactPlayer
                      url={anime.trailer.url}
                      style={
                        {
                          // display: "flex",
                          // margin: "auto",
                          // marginTop: "1%",
                          // marginLeft: "10%",
                          // marginRight: "10%",
                        }
                      }
                    />
                    <ImageListItemBar
                      title={anime.entry.title}
                      subtitle={anime.title}
                    />
                  </ImageListItem>
                </ImageList>

                {/* <div className='featured-anime-text'>{anime.entry.title}</div> */}
              </div>
            );
          })}
        </Carousel>
      </Box>

      <h3>Watch Popular Promos</h3>
      <Box sx={{ paddingBottom: "3%" }}>
        <Carousel breakPoints={promoBreakPoints}>
          {popularPromos.map((anime, aniKey) => {
            return (
              <div key={aniKey}>
                {/* <ImageList cols={1}>
                  <Link to={anime.trailer.url} target='_blank' rel='noreferrer'>
                    <img
                      className='promo-image'
                      src={anime.trailer.images.large_image_url}
                      alt={`${anime.entry.title}: ${anime.title}`}
                    />
                    <ImageListItem
                      key={anime.id}
                      title={anime.title}
                      cols={1}
                      rows={1}
                    >
                      <ImageListItemBar
                        title={anime.entry.title}
                        subtitle={anime.title}
                      />
                    </ImageListItem>
                  </Link>
                </ImageList> */}
                <ImageList cols={1} rowHeight={420}>
                  <ImageListItem>
                    <ReactPlayer
                      url={anime.trailer.url}
                      style={
                        {
                          // display: "flex",
                          // margin: "auto",
                          // marginTop: "1%",
                          // marginLeft: "10%",
                          // marginRight: "10%",
                        }
                      }
                    />
                    <ImageListItemBar
                      title={anime.entry.title}
                      subtitle={anime.title}
                    />
                  </ImageListItem>
                </ImageList>
                {/* <div className='featured-anime-text'>{anime.entry.title}</div> */}
              </div>
            );
          })}
        </Carousel>
      </Box>
    </div>
  );
};

export default HomepageContent;
