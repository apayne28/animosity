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
    <div className='homepage-guts'>
      <h3>Spring 2022 Anime</h3>
      <Link to='/top-anime' state={{ animeList: springAnime }}>
        <Typography>View More</Typography>
      </Link>
      <Grid container className='featured-anime-container'>
        <ImageList cols={5}>
          {springAnime.slice(0, 5).map((anime) => (
            // <Grid item className='individual-featured-anime-container'>
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
            // </Grid>
          ))}
        </ImageList>
      </Grid>
      <h3>Upcoming Summer 2022 Anime</h3>
      <Link to='/top-anime' state={{ animeList: summerAnime }}>
        <Typography>View More</Typography>
      </Link>

      {/* <Grid container className='featured-anime-container'> */}
      <ImageList cols={5}>
        {summerAnime.map((anime) => (
          <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
            <ImageListItem key={anime.id} title={anime.title} cols={1} rows={1}>
              <img
                className='featured-anime-image'
                src={anime.images.jpg.image_url}
                alt={anime.title}
              />
              <ImageListItemBar title={anime.title} />
            </ImageListItem>
            {/* <div className='featured-anime-text'>{anime.title}</div> */}
          </Link>
        ))}
      </ImageList>
      {/* </Grid> */}
      <h3>Watch Recent Promos</h3>
      <Grid container className='featured-promo-container'>
        <ImageList cols={5}>
          {recentPromos.map((anime) => (
            <div className='individual-featured-promo-container'>
              <ImageListItem
                key={anime.id}
                title={anime.title}
                cols={1}
                rows={1}
              >
                <a href={anime.trailer.url} target='_blank' rel='noreferrer'>
                  <img
                    className='promo-image'
                    src={anime.trailer.images.large_image_url}
                    alt={`${anime.entry.title}: ${anime.title}`}
                  />
                </a>
                <ImageListItemBar title={anime.title} />
              </ImageListItem>
              {/* <div className='featured-anime-text'>{anime.entry.title}</div> */}
            </div>
          ))}
        </ImageList>
      </Grid>
      <h3>Watch Popular Promos</h3>
      <Grid container className='featured-promo-container'>
        <ImageList cols={5}>
          {popularPromos.map((anime) => (
            <div className='individual-featured-promo-container'>
              <ImageListItem>
                <a href={anime.trailer.url} target='_blank' rel='noreferrer'>
                  <img
                    className='promo-image'
                    src={anime.trailer.images.large_image_url}
                    alt={`${anime.entry.title}: ${anime.title}`}
                  />
                </a>
                <ImageListItemBar title={anime.title} />
              </ImageListItem>
              {/* <div className='featured-anime-text'>{anime.entry.title}</div> */}
            </div>
          ))}
        </ImageList>
      </Grid>
    </div>
  );
};

export default HomepageContent;
