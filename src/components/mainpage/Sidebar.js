import { Grid } from "@mui/material";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

const Sidebar = () => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  // const jikanjsV4 = require("@mateoaranda/jikanjs");

  const [topAiringAnime, setTopAiringAnime] = useState([]);
  const [topUpcomingAnime, setTopUpcomingAnime] = useState([]);

  const [mostPopularAnime, setMostPopularAnime] = useState([]);
  // const [topManga, setTopManga] = useState([]);

  const GetMostPopularAnime = useCallback(async () => {
    const temp = await jikanjsV3.loadTop("anime", 1, "bypopularity");
    // const temp = await fetch(
    //   `https://api.jikan.moe/v4/top/anime`,
    //   // `https://api.jikan.moe/v3/top/anime/1/bypopularity`,
    // ).then((res) => res.json());

    // console.log(temp.data);

    setMostPopularAnime(temp.top.slice(0, 5));
  }, [jikanjsV3]);

  //  const GetMostPopularAnime = async () => {
  //    const temp = await jikanjsV3.loadTop("anime", 1, "bypopularity");
  //    // const temp = await fetch(
  //    //   `https://api.jikan.moe/v4/top/anime`,
  //    //   // `https://api.jikan.moe/v3/top/anime/1/bypopularity`,
  //    // ).then((res) => res.json());

  //    // console.log(temp.data);

  //    setMostPopularAnime(temp.top.slice(0, 5));
  //  }

  // const GetTopManga = async () => {
  //   const temp = await jikanjsV3.loadTop("manga", 1, "bypopularity");

  //   setTopManga(temp.top.slice(0, 5));
  // };

  const GetTopAiringAnime = useCallback(async () => {
    const temp = await jikanjsV3.loadTop("anime", 1, "airing");

    setTopAiringAnime(temp.top.slice(0, 5));
  }, [jikanjsV3]);

  // const GetTopAiringAnime = async () => {
  //   const temp = await jikanjsV3.loadTop("anime", 1, "airing");

  //   setTopAiringAnime(temp.top.slice(0, 5));
  // }

  const GetTopUpcomingAnime = useCallback(async () => {
    const temp = await jikanjsV3.loadTop("anime", 1, "upcoming");

    setTopUpcomingAnime(temp.top.slice(0, 5));
  }, [jikanjsV3]);

  //  const GetTopUpcomingAnime = async () => {
  //    const temp = await jikanjsV3.loadTop("anime", 1, "upcoming");

  //    setTopUpcomingAnime(temp.top.slice(0, 5));
  //  };

  useEffect(() => {
    GetMostPopularAnime();
    GetTopAiringAnime();
    GetTopUpcomingAnime();
    // GetTopManga();
  }, [GetMostPopularAnime, GetTopAiringAnime, GetTopUpcomingAnime]);
  return (
    <aside className='homepage-sidebar-content'>
      <nav>
        <h3 className='sidebar-top-headers'>Most Popular Anime</h3>

        {mostPopularAnime.map((anime) => (
          <div item className='sidebar-top-anime-content'>
            {anime.rank}
            <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
              <img
                className='sidebar-top-image'
                src={anime.image_url}
                alt={anime.title}
              />
            </Link>

            <div className='name-and-info'>
              <a
                href={anime.url}
                target='_blank'
                key={anime.mal_id}
                rel='noreferrer'
              >
                <div className='sidebar-top-anime-title'>{anime.title}</div>
              </a>
              <Grid>
                {`${anime.type}, ${anime.episodes} eps, scored ${anime.score}`}
              </Grid>
              {`${anime.members} members`}
            </div>
          </div>
        ))}
      </nav>
      <nav>
        <h3 className='sidebar-top-headers'>Top Airing Anime</h3>
        {topAiringAnime.map((anime) => (
          <div className='sidebar-top-anime-content'>
            {anime.rank}
            <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
              <img
                className='sidebar-top-image'
                src={anime.image_url}
                alt={anime.title}
              />
            </Link>

            <div className='name-and-info'>
              <a
                href={anime.url}
                target='_blank'
                key={anime.mal_id}
                rel='noreferrer'
              >
                <div className='sidebar-top-anime-title'>{anime.title}</div>
              </a>
              <div>
                {`${anime.type}, ${
                  anime.episodes !== null ? anime.episodes : "N/A"
                } eps, scored ${anime.score}`}
              </div>
              {`${anime.members} members`}
            </div>
          </div>
        ))}
      </nav>
      <nav>
        <h3 className='sidebar-top-headers'>Top Upcoming Anime</h3>
        {topUpcomingAnime.map((anime) => (
          <div className='sidebar-top-anime-content'>
            {anime.rank}
            <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
              <img
                className='sidebar-top-image'
                src={anime.image_url}
                alt={anime.title}
              />
            </Link>

            <div className='name-and-info'>
              <a
                href={anime.url}
                target='_blank'
                key={anime.mal_id}
                rel='noreferrer'
              >
                <div className='sidebar-top-anime-title'>{anime.title}</div>
              </a>
              <div>
                {`${anime.type}, ${anime.episodes} eps, scored ${anime.score}`}
              </div>
              {`${anime.members} members`}
            </div>
          </div>
        ))}
      </nav>
      {/* <nav>
        <h3 className='sidebar-top-headers'>Top Manga</h3>
        {topUpcomingAnime.map((anime) => (
          <Grid className='sidebar-top-anime-content'>
            {anime.rank}

            <img
              className='sidebar-top-image'
              src={anime.image_url}
              alt='Anime Cover Art'
            />
            <div className='name-and-info'>
              <a
                href={anime.url}
                target='_blank'
                key={anime.mal_id}
                rel='noreferrer'
              >
                <div className='sidebar-top-anime-title'>{anime.title}</div>
              </a>
              <Grid>
                {`${anime.type}, ${anime.episodes} eps, scored ${anime.score}`}
              </Grid>
              {`${anime.members} members`}
            </div>
          </Grid>
        ))}
      </nav> */}
    </aside>
  );
};

export default Sidebar;
