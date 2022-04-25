import { Grid } from "@mui/material";
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

    setSpringAnime(temp.data.slice(0, 5));
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
      <a href='/'>View More</a>
      <div className='featured-anime-container'>
        {springAnime.map((anime) => (
          <div className='individual-featured-anime-container'>
            <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
              <img
                className='featured-anime-image'
                src={anime.images.jpg.image_url}
                alt={anime.title}
              />
              <div className='featured-anime-text'>{anime.title}</div>
            </Link>
          </div>
        ))}
      </div>
      <h3>Upcoming Summer 2022 Anime</h3>
      <a href='/'>View More</a>

      <div className='featured-anime-container'>
        {summerAnime.map((anime) => (
          <div className='individual-featured-anime-container'>
            <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
              <img
                className='featured-anime-image'
                src={anime.images.jpg.image_url}
                alt={anime.title}
              />
              <div className='featured-anime-text'>{anime.title}</div>
            </Link>
          </div>
        ))}
      </div>
      <h3>Watch Recent Promos</h3>
      <div className='featured-promo-container'>
        {recentPromos.map((anime) => (
          <div className='individual-featured-promo-container'>
            <a href={anime.trailer.url} target='_blank' rel='noreferrer'>
              <img
                className='promo-image'
                src={anime.trailer.images.large_image_url}
                alt={`${anime.entry.title}: ${anime.title}`}
              />
            </a>
            <div className='featured-anime-text'>{anime.entry.title}</div>
          </div>
        ))}
      </div>
      <h3>Watch Popular Promos</h3>
      <div className='featured-promo-container'>
        {popularPromos.map((anime) => (
          <div className='individual-featured-promo-container'>
            <a href={anime.trailer.url} target='_blank' rel='noreferrer'>
              <img
                className='promo-image'
                src={anime.trailer.images.large_image_url}
                alt={`${anime.entry.title}: ${anime.title}`}
              />
            </a>
            <div className='featured-anime-text'>{anime.entry.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomepageContent;
