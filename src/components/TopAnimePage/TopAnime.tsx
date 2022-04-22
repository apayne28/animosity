import { Divider, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import TopAnimeBar from "./TopAnimeBar";
import { Link, useLocation } from "react-router-dom";

const TopAnime = () => {
  const [topScoredAnime, setTopScoredAnime] = useState();
  const [buttonCounter, setButtonCounter] = useState(1);
  const location = useLocation();
  console.log(location.state.topFilter);
  let category = location.state.topFilter;
  //   let type = location.state.animeType

  //   const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3

  //  const GetMostPopularAnime = async () => {
  //    const temp = await jikanjsV3.loadTop("anime", 1, "bypopularity");
  //    // const temp = await fetch(
  //    //   `https://api.jikan.moe/v4/top/anime`,
  //    //   // `https://api.jikan.moe/v3/top/anime/1/bypopularity`,
  //    // ).then((res) => res.json());

  //    // console.log(temp.data);

  //    setMostPopularAnime(temp.top.slice(0, 5));
  //  };

  const getTopScoredAnime = useCallback(async () => {
    try {
      //   const temp = await fetch(`https://api.jikan.moe/v4/top/anime`).then(
      //     (res) => res.json(),
      //   );
      // category = filter;
      const temp = await fetch(
        `${
          category !== " "
            ? `https://api.jikan.moe/v3/top/anime/${buttonCounter}/${category}`
            : `https://api.jikan.moe/v3/top/anime/${buttonCounter}`
        }`,
      ).then((res) => res.json());

      let results = temp.top;
      console.log(temp.top);
      setTopScoredAnime(results);
      return results;
    } catch (error) {
      console.log("Anime not found");
    }
  }, [buttonCounter]);

  useEffect(() => {
    if (!topScoredAnime) {
      getTopScoredAnime();
    }
  }, [getTopScoredAnime, topScoredAnime]);

  if (topScoredAnime) {
    return (
      <div className='top-anime-page-container'>
        <div className='header-content'>
          <Header />
          <NavigationBar />
        </div>
        <div className='top-anime-top-category-title'>
          <Typography>Top Anime</Typography>
          <TopAnimeBar />
        </div>
        <Divider />
        <div className='top-anime-top-category-container'>
          <Grid>
            {topScoredAnime.map((entry) => {
              //   console.log(entry);
              return (
                <div className='top-anime-top-category-items'>
                  <div className='top-anime-top-category-title-container'>
                    <Typography className='top-anime-top-category-item-rank'>
                      {entry.rank}
                    </Typography>
                    <Link to='/anime-info' state={{ animeId: entry.mal_id }}>
                      {/* <img src={entry.images.jpg.image_url} alt={entry.title} /> */}
                      <img src={entry.image_url} alt={entry.title} />
                    </Link>
                    <Typography>{entry.title}</Typography>
                    <Typography>{`${entry.type} (${entry.episodes} eps)`}</Typography>
                    {/* <Typography>{entry.aired.string}</Typography> */}
                    <Typography>{`${entry.start_date} - ${entry.end_date}`}</Typography>

                    {/* <Typography>{entry.aired.members}</Typography> */}
                    <Typography>{entry.members}</Typography>

                    <div className='top-anime-top-category-item-score'>
                      <Typography>{entry.score}</Typography>
                    </div>
                    <div className='top-anime-top-category-item-status'>
                      <Typography>{entry.status}</Typography>
                      <div className='top-anime-top-category-item-score'>
                        <Typography>{entry.score}</Typography>
                      </div>
                      {/* <div className='top-anime-top-category-item-status'>
                        <Typography>{entry.status}</Typography>
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </Grid>
          <div className='buttons'>
            <Button
              onClick={() => {
                console.log(buttonCounter);
                return buttonCounter > 1
                  ? setButtonCounter((buttonCounter) => buttonCounter - 1)
                  : setButtonCounter(1);
              }}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                console.log(buttonCounter);
                return buttonCounter < 401
                  ? setButtonCounter((buttonCounter) => buttonCounter + 1)
                  : setButtonCounter(25);
              }}
            >
              Next
            </Button>
          </div>
        </div>

        <Typography>Hi</Typography>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default TopAnime;
