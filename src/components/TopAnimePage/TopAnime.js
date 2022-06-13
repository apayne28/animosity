import {
  Divider,
  Typography,
  Grid,
  Button,
  Stack,
  Pagination as Pagination,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import TopAnimeBar from "./TopAnimeBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { Box, fontSize } from "@mui/system";

const TopAnime = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  let buttonValue = location.state.page ? location.state.page : 1;

  const [topScoredAnime, setTopScoredAnime] = useState();

  const [buttonCounter, setButtonCounter] = useState(buttonValue);
  const [lastPage, setLastPage] = useState();

  let windowSize = window.innerWidth;

  window.addEventListener("resize", () => {
    console.log(windowSize);
    if (windowSize > 3008) {
      setColumnSize(5);
      setRowHeight(980);
    } else if (windowSize > 1100 && windowSize <= 2048) {
      setColumnSize(4);
      setRowHeight(880);
    } else if (windowSize > 855 && windowSize <= 1100) {
      setColumnSize(3);
      setRowHeight(780);
    } else if (windowSize > 550 && windowSize <= 855) {
      setColumnSize(2);
      setRowHeight(780);
    } else if (windowSize <= 550) {
      setColumnSize(1);
      setRowHeight(780);
    }
  });

  const [columnSize, setColumnSize] = useState();
  const [rowHeight, setRowHeight] = useState();

  console.log(location, props);
  let category = location.state.topFilter;
  let homepageAnime = location.state.animeList;
  let testCon = topScoredAnime ? topScoredAnime : homepageAnime;

  const getTopScoredAnime = useCallback(async () => {
    // const paginationStyle = paginationTheme();
    try {
      //   const temp = await fetch(`https://api.jikan.moe/v4/top/anime`).then(
      //     (res) => res.json(),
      //   );
      // category = filter;
      //https://api.jikan.moe/v4/top/anime?type=movie
      //https://api.jikan.moe/v4/top/anime?type=movie&page=1
      console.log(location, category);
      const temp = await fetch(
        `https://api.jikan.moe/v4/top/anime?type=${category}&page=${buttonValue}`,
      ).then((res) => res.json());

      // const temp = await fetch(
      //   `${
      //     category !== " "
      //       ? `https://api.jikan.moe/v3/top/anime/${buttonCounter}/${category}`
      //       : `https://api.jikan.moe/v3/top/anime/${buttonCounter}`
      //   }`,
      // ).then((res) => res.json());
      console.log(
        `https://api.jikan.moe/v4/top/anime?type=${location.state.topFilter}&page=${buttonValue}`,
      );
      console.log(temp, temp.pagination.last_visible_page);
      setLastPage(temp.pagination.last_visible_page);
      setTopScoredAnime(temp.data);
      // return results;
    } catch (error) {
      console.log("Anime not found");
    }
  }, [buttonValue, category, location]);

  useEffect(() => {
    if (!topScoredAnime && !homepageAnime) {
      getTopScoredAnime();
    }

    if (!columnSize && !rowHeight) {
      if (windowSize > 3008) {
        setColumnSize(5);
        setRowHeight(980);
      } else if (windowSize > 1100 && windowSize <= 2048) {
        setColumnSize(4);
        setRowHeight(880);
      } else if (windowSize > 855 && windowSize <= 1100) {
        setColumnSize(3);
        setRowHeight(780);
      } else if (windowSize > 550 && windowSize <= 855) {
        setColumnSize(2);
        setRowHeight(780);
      } else if (windowSize <= 550) {
        setColumnSize(1);
        setRowHeight(780);
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
  // console.log(testCon);

  if (testCon) {
    return (
      <div>
        <div className='header-content'>
          {/* <Header /> */}
          <NavigationBar />
        </div>

        <Divider />

        {/* <div className='top-anime-top-category-container'> */}
        <TopAnimeBar />

        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "2%",
            marginBottom: "1%",
          }}
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

        <div className='search-page-contents'>
          <div className='top-anime-top-category-title'>
            {/* <Typography>Top Anime</Typography> */}
          </div>
          <Grid container>
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
                          // maxHeight: "100%",
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
                          {/* <img src={entry.images.jpg.image_url} alt={entry.title} /> */}

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
                            {/* <Box sx={{ marginBottom: "2%" }}> */}
                            {/* <StarIcon /> */}
                            {/* </Box> */}
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

                          {/* <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginRight: " 5%",
                              }}
                            >
                              Fans:
                            </Typography>
                            <Typography sx={{ fontSize: 20 }}>
                              {entry.members}
                            </Typography>
                          </Box> */}
                          {/* <Typography
                            sx={{ fontSize: 20 }}
                          >{`${entry.members} fans`}</Typography> */}

                          {/* <Typography>{`Score: ${entry.score}`}</Typography> */}
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
                              // paddingBottom: "2%",
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
                                // paddingBottom: "3%",

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
              // marginTop: "1%",
              paddingBottom: "1%",
            }}
          >
            <Pagination
              count={401}
              color='primary'
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
              size='large'
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
