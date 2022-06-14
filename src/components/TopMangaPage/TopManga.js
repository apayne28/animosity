import {
  Divider,
  Typography,
  Grid,
  Stack,
  Pagination,
  ImageList,
  ImageListItem,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";

import NavigationBar from "../mainpage/navBar/NavigationBar";
import TopMangaBar from "./TopMangaBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const TopManga = () => {
  const location = useLocation();
  let navigate = useNavigate();
  let buttonValue = location.state.page ? location.state.page : 1;
  let category = location.state.topFilter;

  const [topScoredManga, setTopScoredManga] = useState();
  const buttonCounter = buttonValue;
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
  });

  const [columnSize, setColumnSize] = useState();
  const [rowHeight, setRowHeight] = useState();

  console.log(location);

  const getTopScoredManga = useCallback(async () => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/top/manga?type=${category}&page=${buttonValue}`,
      ).then((res) => res.json());

      console.log(
        `https://api.jikan.moe/v4/top/manga?type=${location.state.topFilter}&page=${buttonValue}`,
      );
      console.log(temp, temp.pagination.last_visible_page);
      setLastPage(temp.pagination.last_visible_page);
      setTopScoredManga(temp.data);
    } catch (error) {
      console.log("Manga not found");
    }
  }, [buttonValue, category, location.state.topFilter]);

  useEffect(() => {
    if (!topScoredManga) {
      getTopScoredManga();
    }
    if (!columnSize && !rowHeight) {
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
  }, [columnSize, getTopScoredManga, rowHeight, topScoredManga, windowSize]);

  if (topScoredManga) {
    return (
      <div>
        <div className='header-content'>
          {/* <Header /> */}
          <NavigationBar />
        </div>

        <Divider />

        {/* <div className='top-anime-top-category-container'> */}
        <TopMangaBar />
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
              navigate(`/top-manga`, {
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
              {topScoredManga.map((entry) => {
                // const entryInfo = getManga(entry.mal_id);
                // console.log(entryInfo);
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
                            <Typography>{`${entry.type} (${
                              entry.volumes
                                ? `${entry.volumes} vols`
                                : `${
                                    entry.chapters
                                      ? `${entry.chapters} vols`
                                      : "? vols"
                                  }`
                            })`}</Typography>
                          }
                        />
                        <Link
                          to='/manga-info'
                          state={{ mangaId: entry.mal_id }}
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

                          {/* <LinesEllipsis
                            text={entry.synopsis}
                            maxLine='500'
                            ellipsis='...'
                            trimRight
                            basedOn='words'
                          /> */}

                          {/* <Box sx={{ display: "flex", paddingBottom: "5%" }}>
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
                            to='/manga-info'
                            state={{ mangaId: entry.mal_id }}
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
            sx={{ display: "flex", alignItems: "center", paddingBottom: "1%" }}
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
                navigate(`/top-manga`, {
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

export default TopManga;
