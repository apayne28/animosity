import {
  Divider,
  Typography,
  Grid,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import TopAnimeBar from "./TopAnimeBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const TopAnime = () => {
  const location = useLocation();
  let navigate = useNavigate();
  let buttonValue = location.state.page ? location.state.page : 1;

  const [topScoredAnime, setTopScoredAnime] = useState();
  const buttonCounter = buttonValue;

  console.log(location);
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
  }, [buttonCounter, category]);

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
        <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
          <Pagination
            count={401}
            page={buttonCounter}
            onChange={(event, value) => {
              console.log(event, parseInt(event.target.innerText), value);
              // setButtonCounter(parseInt(e.target.innerText));
              navigate(`/top-anime`, {
                state: {
                  topFilter: category,
                  page: parseInt(value),
                },
              });
              // e.preventDefault();

              window.location.reload();
              window.scrollTo(0, 0);
            }}
          />
        </Stack>
        <div className='top-anime-top-category-container'>
          <Grid>
            {topScoredAnime.map((entry) => {
              //   console.log(entry);
              return (
                <article className='top-anime-top-category-items'>
                  <div className='top-anime-top-category-title-container'>
                    <figure>
                      <Typography className='top-anime-top-category-item-rank'>
                        {entry.rank}
                      </Typography>
                    </figure>
                    <figure>
                      <Link to='/anime-info' state={{ animeId: entry.mal_id }}>
                        {/* <img src={entry.images.jpg.image_url} alt={entry.title} /> */}
                        <img src={entry.image_url} alt={entry.title} />
                      </Link>
                    </figure>
                    <figure>
                      <Typography>{entry.title}</Typography>
                    </figure>
                    <figure>
                      <Typography>{`${entry.type} (${entry.episodes} eps)`}</Typography>
                      {/* <Typography>{entry.aired.string}</Typography> */}
                      <Typography>{`${entry.start_date} - ${entry.end_date}`}</Typography>
                    </figure>
                    <figure>
                      {/* <Typography>{entry.aired.members}</Typography> */}
                      <Typography>{entry.members}</Typography>
                    </figure>
                    <figure>
                      <div className='top-anime-top-category-item-status'>
                        <Typography>{entry.status}</Typography>
                        <div className='top-anime-top-category-item-score'>
                          <Typography>{entry.score}</Typography>
                        </div>
                        {/* <div className='top-anime-top-category-item-status'>
                        <Typography>{entry.status}</Typography>
                      </div> */}
                      </div>
                    </figure>
                  </div>
                </article>
              );
            })}
          </Grid>
          <div className='buttons'>
            {/* <Button
              onClick={() => {
                console.log(buttonCounter);
                return buttonCounter > 1
                  ? setButtonCounter((prevState) => prevState - 1)
                  : setButtonCounter(1);
              }}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                console.log(buttonCounter);
                return buttonCounter < 401
                  ? setButtonCounter((prevState) => prevState + 1)
                  : setButtonCounter(25);
              }}
            >
              Next
            </Button> */}
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <Pagination
                count={401}
                page={buttonCounter}
                onChange={(event, value) => {
                  console.log(event, parseInt(event.target.innerText), value);
                  // setButtonCounter(parseInt(e.target.innerText));
                  navigate(`/top-anime`, {
                    state: {
                      topFilter: category,
                      page: parseInt(value),
                    },
                  });
                  // e.preventDefault();

                  window.location.reload();
                  window.scrollTo(0, 0);
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default TopAnime;
