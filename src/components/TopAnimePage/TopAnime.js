import {
  Divider,
  Typography,
  Grid,
  Stack,
  Pagination,
  ImageList,
  ImageListItem,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import TopAnimeBar from "./TopAnimeBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const TopAnime = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  let buttonValue = location.state.page ? location.state.page : 1;

  const [topScoredAnime, setTopScoredAnime] = useState();
  const [lastPage, setLastPage] = useState();

  let windowSize = window.innerWidth;

  window.addEventListener("resize", () => {
    console.log(windowSize);
    if (windowSize > 3000) {
      setColumnSize(5);
      setRowHeight(880);
    } else if (windowSize > 2048 && windowSize <= 3000) {
      setColumnSize(4);
      setRowHeight(880);
    } else if (windowSize > 1100 && windowSize <= 2048) {
      setColumnSize(4);
      setRowHeight(780);
    } else if (windowSize > 855 && windowSize <= 1100) {
      setColumnSize(3);
      setRowHeight(680);
    } else if (windowSize > 550 && windowSize <= 855) {
      setColumnSize(2);
      setRowHeight(680);
    } else if (windowSize <= 550) {
      setColumnSize(1);
      setRowHeight(880);
    }
    console.log(columnSize, rowHeight);
  });

  const [columnSize, setColumnSize] = useState();
  const [rowHeight, setRowHeight] = useState();

  console.log(location, props);
  let category = location.state.topFilter;
  let homepageAnime = location.state.animeList;
  let testCon = topScoredAnime ? topScoredAnime : homepageAnime;

  const getTopScoredAnime = useCallback(async () => {
    try {
      console.log(location, category);
      const temp = await fetch(
        `https://api.jikan.moe/v4/top/anime?${category !== ' ' ? `?type=${category }` :''}&page=${buttonValue}`,
      ).then((res) => res.json());

      console.log(
        `https://api.jikan.moe/v4/top/anime?type=${location.state.topFilter}&page=${buttonValue}`,
      );

      console.log(
        `https://api.jikan.moe/v4/top/anime?${location.state.topFilter !== ' ' ? `?type=${location.state.topFilter }` :''}&page=${buttonValue}`,
      );
      // console.log(temp, temp.pagination.last_visible_page);
      setLastPage(temp.pagination.last_visible_page);
      setTopScoredAnime(temp.data);
    } catch (error) {
      console.log("Anime not found");
    }
  }, [buttonValue, category, location]);

  useEffect(() => {
    if (!topScoredAnime && !homepageAnime) {
      getTopScoredAnime();
    }

    if (!columnSize && !rowHeight) {
      console.log(windowSize);

      if (windowSize > 3000) {
        setColumnSize(5);
        setRowHeight(880);
      } else if (windowSize > 2048 && windowSize <= 3000) {
        setColumnSize(4);
        setRowHeight(880);
      } else if (windowSize > 1100 && windowSize <= 2048) {
        setColumnSize(4);
        setRowHeight(780);
      } else if (windowSize > 855 && windowSize <= 1100) {
        setColumnSize(3);
        setRowHeight(680);
      } else if (windowSize > 550 && windowSize <= 855) {
        setColumnSize(2);
        setRowHeight(680);
      } else if (windowSize <= 550) {
        setColumnSize(1);
        setRowHeight(880);
      }
    }
  }, [
    columnSize,
    getTopScoredAnime,
    homepageAnime,
    rowHeight,
    topScoredAnime,
    windowSize,
  ]);

  if (testCon) {
    return (
      <div>
        <div className='header-content'>
          <NavigationBar />
        </div>

        <Divider />

        <TopAnimeBar />

        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "2%",
            marginBottom: "1%",
          }}
          data-testid='top-anime-page-upper-page-section'
        >
          <Pagination
            count={lastPage}
            // classes={{ root: classes.numberLook }}
            sx={{
              "& .MuiButtonBase-root": {
                color: "#ffffff",
                fontSize: 20,
              },
              "& .Mui-selected": {
                backgroundColor: "#59c9a5",
              },
            }}
            color='primary'
            size='large'
            page={buttonValue}
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

        <div className='search-page-contents' data-testid='top-anime-page-contents'>
          <div className='top-anime-top-category-title'>
            {/* <Typography>Top Anime</Typography> */}
          </div>
          <Grid container data-testid='top-anime-result-cards'>
            <ImageList cols={columnSize} rowHeight={rowHeight}>
              {testCon.map((entry) => {
                // console.log(entry);
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
                        }}
                      >
                        <CardHeader
                          title={
                            <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                                fontSize: 25,
                              }}
                            >
                              {entry.title}
                            </Typography>
                          }
                          subheader={
                            <Typography>{`${entry.type} (${entry.episodes} eps)`}</Typography>
                          }
                        />
                        <Link
                          to='/anime-info'
                          state={{ animeId: entry.mal_id }}
                        >
                          <Box
                            className='search-page-list-entry-image'
                            component='img'
                            src={entry.images.jpg.image_url}
                            alt={entry.title}
                            sx={{ width: "100%", height: "100%" }}
                          />
                        </Link>
                        <CardContent>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{
                                // paddingBottom: "1%",
                                fontSize: 30,
                                fontWeight: "bold",
                                marginRight: " 5%",
                              }}
                            >
                              Rank:
                            </Typography>
                            <Typography sx={{ fontSize: 30 }}>
                              {entry.rank.toLocaleString("en-US")}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginRight: " 5%",
                              }}
                            >{`Score: `}</Typography>
                            <Typography
                              sx={{ fontSize: 20 }}
                            >{`${entry.score}`}</Typography>
                          </Box>
                          <Typography
                            variant='body2'
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "3",
                              WebkitBoxOrient: "vertical",

                              fontSize: 20,
                              marginTop: "2%",
                            }}
                          >
                            {entry.synopsis}
                          </Typography>
                          <Link
                            to='/anime-info'
                            state={{ animeId: entry.mal_id }}
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingTop: "3%",

                                fontSize: 25,
                              }}
                            >
                              View More
                            </Typography>
                          </Link>
                        </CardContent>
                      </Card>
                    </ImageListItem>
                  </Box>
                );
              })}
            </ImageList>
          </Grid>

          <Stack
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",

              paddingBottom: "1%",
            }}
            data-testid='top-anime-page-lower-page-section'
          >
            <Pagination
              count={401}
              color='primary'
              sx={{
                "& .MuiButtonBase-root": {
                  color: "#ffffff",
                  fontSize: 20,
                },
                "& .Mui-selected": {
                  backgroundColor: "#59c9a5",
                },
              }}
              size='large'
              page={buttonValue}
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
