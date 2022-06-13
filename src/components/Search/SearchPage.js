import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Stack,
  Typography,
  Pagination,
  ImageList,
  ImageListItem,
  Grid,
  Card,
  CardContent,
  Box,
  CardHeader,
} from "@mui/material";
import LoadingScreen from "../LoadingScreen";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import pikafight from "../../pikafight.gif";

const SearchPage = () => {
  // const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const [animeList, setAnimeList] = useState();
  // const [animeList2, setAnimeList2] = useState();

  // const [animeListv3, setAnimeListv3] = useState();

  const location = useLocation();
  let navigate = useNavigate();
  let searchThing = location.state.searchQuery;
  let typeThing = location.state.searchType;
  let buttonValue = location.state.page ? location.state.page : 1;
  const [lastPage, setLastPage] = useState();
  const buttonCounter = buttonValue;
  console.log(typeThing, searchThing, buttonCounter);
  let windowSize = window.innerWidth;

  window.addEventListener("resize", () => {
    console.log(windowSize);
    if (windowSize > 3008) {
      setColumnSize(5);
      setRowHeight(980);
    } else if (windowSize > 1461 && windowSize <= 2048) {
      setColumnSize(4);
      setRowHeight(780);
    } else if (windowSize > 1100 && windowSize <= 1461) {
      setColumnSize(3);
      setRowHeight(780);
    } else if (windowSize > 855 && windowSize <= 1100) {
      setColumnSize(3);
      setRowHeight(680);
    } else if (windowSize > 550 && windowSize <= 855) {
      setColumnSize(2);
      setRowHeight(680);
    } else if (windowSize <= 550) {
      setColumnSize(1);
      setRowHeight(780);
    }
  });

  const [columnSize, setColumnSize] = useState();
  const [rowHeight, setRowHeight] = useState();

  const fetchAnime = useCallback(async (searchType, query, page) => {
    let temp = await fetch(
      `https://api.jikan.moe/v4/${searchType}?letter=${query}&order_by=popularity&sort=asc&page=${page}`,
    ).then((res) => res.json());

    console.log("V4 Letter:", temp.data);
    setLastPage(temp.pagination.last_visible_page);
    setAnimeList(temp.data);

    if (temp.data && temp.data.length === 0) {
      const temp = await fetch(
        `https://api.jikan.moe/v4/${searchType}?q=${query}&order_by=popularity&sort=asc`,
      ).then((res) => res.json());
      console.log(temp);
      console.log("V4 query", temp);

      // console.log(temp.pagination);
      setLastPage(temp.pagination.last_visible_page);
      // setAnimeList(temp.results);
      let sortedAnime;
      if (temp.data && temp.data.length > 0) {
        sortedAnime = temp.data.sort((a, b) =>
          a.popularity > b.popularity ? 1 : -1,
        );
      }

      sortedAnime = temp.data.sort((a, b) =>
        a.popularity > b.popularity ? 1 : -1,
      );
      setAnimeList(sortedAnime);
      // setAnimeList(temp.data);
      console.log(temp.data.length);
    }
  }, []);
  useEffect(() => {
    if (!animeList) {
      fetchAnime(typeThing, searchThing, buttonCounter);
    }
    if (!columnSize && !rowHeight) {
      if (windowSize > 3008) {
        setColumnSize(5);
        setRowHeight(980);
      } else if (windowSize > 1461 && windowSize <= 2048) {
        setColumnSize(4);
        setRowHeight(780);
      } else if (windowSize > 1100 && windowSize <= 1461) {
        setColumnSize(3);
        setRowHeight(780);
      } else if (windowSize > 855 && windowSize <= 1100) {
        setColumnSize(3);
        setRowHeight(680);
      } else if (windowSize > 550 && windowSize <= 855) {
        setColumnSize(2);
        setRowHeight(680);
      } else if (windowSize <= 550) {
        setColumnSize(1);
        setRowHeight(780);
      }
    }
  }, [
    animeList,
    buttonCounter,
    columnSize,
    fetchAnime,
    rowHeight,
    searchThing,
    typeThing,
    windowSize,
  ]);

  console.log(animeList);

  // let sortedAnime;
  // if (animeList.l) {
  //   // let filteredSearchResults = animeList.filter((obj) => {
  //   //   return obj.popularity;
  //   // });

  //   // console.log(filteredSearchResults);
  //   sortedAnime = animeList.sort((a, b) =>
  //     a.popularity > b.popularity ? 1 : -1,
  //   );
  //   setAnimeList(animeList);
  // }

  // console.log(sortedAnime);

  if (animeList && animeList.length > 0) {
    return (
      <div style={{ height: "100vh" }}>
        <div className='header-content'>
          {/* <Header /> */}
          <NavigationBar />
        </div>
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            // marginBottom: "3%",
            marginTop: "1%",
          }}
        >
          <Pagination
            count={lastPage}
            color='primary'
            page={buttonCounter}
            size='large'
            onChange={(event, value) => {
              console.log(event);
              // setButtonCounter(parseInt(e.target.innerText));
              navigate(`/search-page`, {
                state: {
                  searchQuery: searchThing,
                  searchType: typeThing,
                  page: parseInt(value),
                },
              });
              // e.preventDefault();

              window.location.reload();
              window.scrollTo(0, 0);
            }}
            sx={{
              "& .MuiButtonBase-root": {
                color: "#ffffff",
                fontSize: 20,
              },
              "& .Mui-selected": {
                backgroundColor: "#59c9a5",
              },
            }}
          />
        </Stack>
        {/* <div className='anime-character-list-contents'> */}
        <div className='search-page-contents'>
          <Grid container>
            <ImageList cols={columnSize} rowHeight={rowHeight}>
              {animeList.map((anime, key) => (
                <Box sx={{ width: "100%", height: "100%" }}>
                  <ImageListItem>
                    {/* <Card> */}
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
                            {anime.title}
                          </Typography>
                        }
                        // subheader={`${anime.members} fans`}
                      />

                      <Link
                        to={
                          typeThing === "anime" ? "/anime-info" : "/manga-info"
                        }
                        state={
                          typeThing === "anime"
                            ? { animeId: anime.mal_id }
                            : { mangaId: anime.mal_id }
                        }
                      >
                        {/* <ImageListItem> */}
                        {/* <img src={anime.image_url} alt={anime.title} /> */}
                        <Box
                          className='search-page-list-entry-image'
                          component='img'
                          // src={anime.image_url}
                          src={anime.images.jpg.image_url}
                          alt={anime.title}
                          sx={{ width: "100%", height: "100%" }}
                        />

                        {/* <ImageListItemBar
                          title={anime.title}
                          subtitle={
                            typeThing === "anime"
                              ? `${anime.type} (${
                                  anime.episodes
                                    ? `${anime.episodes} eps`
                                    : "N/A"
                                })`
                              : `${anime.type} (${
                                  anime.volumes
                                    ? `${anime.volumes} ${
                                        anime.volumes === 1 ? "vol" : "vols"
                                      }`
                                    : `${
                                        anime.chapters
                                          ? `${anime.chapters} chapters`
                                          : "N/A"
                                      }`
                                })`
                          }
                        /> */}
                        {/* </ImageListItem> */}
                      </Link>
                      <CardContent>
                        {/* <Typography gutterBottom variant='h5' component='div'>
                          {anime.title}
                        </Typography> */}
                        <Typography sx={{ paddingBottom: "2%", fontSize: 25 }}>
                          {typeThing === "anime"
                            ? `${anime.type} (${
                                anime.episodes ? `${anime.episodes} eps` : "N/A"
                              })`
                            : `${anime.type} (${
                                anime.volumes
                                  ? `${anime.volumes} ${
                                      anime.volumes === 1 ? "vol" : "vols"
                                    }`
                                  : `${
                                      anime.chapters
                                        ? `${anime.chapters} chapters`
                                        : "N/A"
                                    }`
                              })`}
                        </Typography>

                        <Typography
                          variant='body2'
                          sx={{ paddingBottom: "3%", fontSize: 25 }}
                        >{`${anime.members.toLocaleString(
                          "en-US",
                        )} fans`}</Typography>
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
                          }}
                        >
                          {anime.synopsis}
                        </Typography>

                        <Link
                          to={
                            typeThing === "anime"
                              ? "/anime-info"
                              : "/manga-info"
                          }
                          state={
                            typeThing === "anime"
                              ? { animeId: anime.mal_id }
                              : { mangaId: anime.mal_id }
                          }
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
                      {/* <CardActions>
                        <Button
                          size='small'
                          onClick={(event, value) => {
                            console.log(event);
                            // setButtonCounter(parseInt(e.target.innerText));
                            navigate(
                              typeThing === "anime"
                                ? "/anime-info"
                                : "/manga-info",
                              typeThing === "anime"
                                ? { state: { animeId: anime.mal_id } }
                                : { state: { mangaId: anime.mal_id } },
                            );
                            // e.preventDefault();

                            window.location.reload();
                            window.scrollTo(0, 0);
                          }}
                        >
                          Details
                        </Button>
                      </CardActions> */}
                    </Card>
                  </ImageListItem>

                  {/* <figure>
                  <Typography>{`Scored: ${anime.score}`}</Typography>
                </figure>
                <figure>
                  <Typography>{`${anime.members} members`}</Typography>
                </figure>

                <figure>
                  <Typography>{anime.synopsis}</Typography>
                </figure> */}
                </Box>
              ))}
            </ImageList>
          </Grid>
        </div>
        <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
          <Pagination
            count={lastPage}
            page={buttonCounter}
            size='large'
            color='primary'
            onChange={(event, value) => {
              console.log(event);
              // setButtonCounter(parseInt(e.target.innerText));
              navigate(`/search-page`, {
                state: {
                  searchQuery: searchThing,
                  searchType: typeThing,
                  page: parseInt(value),
                },
              });
              // e.preventDefault();

              window.location.reload();
              window.scrollTo(0, 0);
            }}
            sx={{
              "& .MuiButtonBase-root": {
                color: "#ffffff",
                fontSize: 20,
              },
              "& .Mui-selected": {
                backgroundColor: "#59c9a5",
              },
            }}
          />
        </Stack>
        {/* <Stack direction='column'>
          <ImageList cols={1} rowHeight={400}>
            {animeList.map((anime, key) => (
              <Stack
                className='search-page-anime-entry'
                direction='row'
                divider={
                  <Divider
                    orientation='horizontal'
                    flexItem
                    sx={{ marginBottom: 50, color: "black" }}
                  />
                }
              >
                <figure>
                  <Link
                    to={typeThing === "anime" ? "/anime-info" : "/manga-info"}
                    state={
                      typeThing === "anime"
                        ? { animeId: anime.mal_id }
                        : { mangaId: anime.mal_id }
                    }
                  >
                    <ImageListItem>
                      <img src={anime.image_url} alt={anime.title} />
                      <ImageListItemBar
                        title={anime.title}
                        subtitle={
                          typeThing === "anime"
                            ? `${anime.type} (${
                                anime.episodes ? `${anime.episodes} eps` : "N/A"
                              })`
                            : `${anime.type} (${
                                anime.volumes
                                  ? `${anime.volumes} ${
                                      anime.volumes === 1 ? "vol" : "vols"
                                    }`
                                  : `${
                                      anime.chapters
                                        ? `${anime.chapters} chapters`
                                        : "N/A"
                                    }`
                              })`
                        }
                      />
                    </ImageListItem>
                  </Link>
                </figure>

                <figure>
                  <Typography>{`Scored: ${anime.score}`}</Typography>
                </figure>
                <figure>
                  <Typography>{`${anime.members} members`}</Typography>
                </figure>

                <figure>
                  <Typography>{anime.synopsis}</Typography>
                </figure>
              </Stack>
            ))}
          </ImageList>
          <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
            <Pagination
              count={401}
              page={buttonCounter}
              onChange={(event, value) => {
                console.log(event);
                // setButtonCounter(parseInt(e.target.innerText));
                navigate(`/search-page`, {
                  state: {
                    searchQuery: searchThing,
                    searchType: typeThing,
                    page: parseInt(value),
                  },
                });
                // e.preventDefault();

                window.location.reload();
                window.scrollTo(0, 0);
              }}
            />
          </Stack>
        </Stack> */}
      </div>
    );
  } else if (animeList && animeList.length === 0) {
    return (
      <div>
        <NavigationBar />
        <Box
          sx={{
            backgroundColor: "#2A1F2D",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "auto",
            // borderStyle: "solid",
            // backgroundColor: "white",
            // height: "auto",
            width: "auto",
            paddingTop: "15%",
          }}
        >
          <img src={pikafight} alt='No results' />
          <Typography sx={{ fontSize: 50, color: "#ffffff" }}>
            Sorry Nothing
          </Typography>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <NavigationBar />
        <LoadingScreen />
      </div>
    );
  }
};

export default SearchPage;
