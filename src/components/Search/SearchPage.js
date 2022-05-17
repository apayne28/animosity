import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnimeCard from "../mainpage/navBar/AnimeCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Stack,
  Typography,
  Divider,
  Pagination,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
import LoadingScreen from "../LoadingScreen";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import { Box } from "@mui/system";

const SearchPage = () => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const [animeList, setAnimeList] = useState();

  const location = useLocation();
  let navigate = useNavigate();
  let searchThing = location.state.searchQuery;
  let typeThing = location.state.searchType;
  let buttonValue = location.state.page ? location.state.page : 1;
  const [lastPage, setLastPage] = useState();
  const buttonCounter = buttonValue;
  console.log(typeThing, searchThing, buttonCounter);

  const fetchAnime = useCallback(
    async (searchType, query, page) => {
      // const temp = await fetch(
      //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
      // ).then((res) => res.json());

      const temp = await jikanjsV3.search(searchType, query, page);
      // const temp = await client.
      console.log(temp);
      setLastPage(temp.last_page);
      setAnimeList(temp.results);
    },
    [jikanjsV3],
  );
  useEffect(() => {
    if (!animeList) {
      fetchAnime(typeThing, searchThing, buttonCounter);
    }
  }, [animeList, buttonCounter, fetchAnime, searchThing, typeThing]);

  if (animeList) {
    return (
      <div>
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
          />
        </Stack>
        {/* <div className='anime-character-list-contents'> */}
        <div className='search-page-contents'>
          <Grid container>
            <ImageList cols={6} rowHeight={980}>
              {animeList.map((anime, key) => (
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
                        title={`${anime.title} `}
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
                          src={anime.image_url}
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
                        <Typography sx={{ paddingBottom: "5%" }}>
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
                        <Typography variant='body2'>
                          {anime.synopsis}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{ paddingTop: "5%" }}
                        >{`${anime.members} fans`}</Typography>
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
  } else {
    return (
      <div>
        <Header />
        <NavigationBar />
        <LoadingScreen />
      </div>
    );
  }
};

export default SearchPage;
