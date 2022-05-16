import {
  Divider,
  Typography,
  Grid,
  Button,
  Stack,
  Pagination,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import TopAnimeBar from "./TopAnimeBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { Box } from "@mui/system";

const TopAnime = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  let buttonValue = location.state.page ? location.state.page : 1;

  const [topScoredAnime, setTopScoredAnime] = useState();
  const buttonCounter = buttonValue;

  console.log(location, props);
  let category = location.state.topFilter;
  let homepageAnime = location.state.animeList;
  let testCon = topScoredAnime ? topScoredAnime : homepageAnime;

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
    if (!topScoredAnime && !homepageAnime) {
      getTopScoredAnime();
    }
  }, [getTopScoredAnime, homepageAnime, topScoredAnime]);
  // console.log(testCon);
  if (testCon) {
    return (
      <div>
        <div className='header-content'>
          <Header />
          <NavigationBar />
        </div>

        <Divider />
        <Stack
          spacing={2}
          sx={{ display: "flex", alignItems: "center", marginTop: "2%" }}
        >
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
        {/* <div className='top-anime-top-category-container'> */}
        <div className='search-page-contents'>
          <div className='top-anime-top-category-title'>
            {/* <Typography>Top Anime</Typography> */}
            <TopAnimeBar />
          </div>
          <Grid container>
            <ImageList cols={6} rowHeight={800}>
              {testCon.map((entry) => {
                return (
                  //   console.log(entry);

                  <Box
                    // sx={{
                    //   display: "flex",
                    //   flexDirection: "row",
                    //   // width: "70%",
                    //   margin: "auto",
                    //   backgroundColor: "white",
                    // }}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <ImageListItem>
                      <Card
                        className='search-page-card'
                        sx={{
                          // maxWidth: "90%",
                          paddingBottom: 41,
                          marginBottom: "5%",
                          margin: "4%",
                          // maxHeight: "100%",
                        }}
                      >
                        <CardHeader
                          title={`${entry.title} `}
                          subheader={
                            <Typography>{`${entry.type} (${entry.episodes} eps)`}</Typography>
                          }
                        />
                        <Link
                          to='/anime-info'
                          state={{ animeId: entry.mal_id }}
                        >
                          {/* <img src={entry.images.jpg.image_url} alt={entry.title} /> */}

                          <Box
                            className='search-page-list-entry-image'
                            component='img'
                            src={
                              topScoredAnime
                                ? entry.image_url
                                : entry.images.jpg.image_url
                            }
                            alt={entry.title}
                            sx={{ width: "100%", height: "100%" }}
                          />
                        </Link>
                        <CardContent>
                          <Typography
                            sx={{ paddingBottom: "5%", fontSize: 30 }}
                          >{`Rank: ${entry.rank}`}</Typography>
                          {/* <Typography>{`Aired: ${entry.aired.string}`}</Typography> */}
                          <Typography
                            sx={{ fontSize: 20 }}
                          >{`${entry.members} fans`}</Typography>
                          <Typography>{`Score: ${entry.score}`}</Typography>
                        </CardContent>
                      </Card>
                    </ImageListItem>
                  </Box>
                );
              })}
            </ImageList>
          </Grid>

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
    );
  } else {
    return <LoadingScreen />;
  }
};

export default TopAnime;
