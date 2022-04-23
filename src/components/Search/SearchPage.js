import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnimeCard from "../mainpage/navBar/AnimeCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography, Divider, Pagination } from "@mui/material";
import LoadingScreen from "../LoadingScreen";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";

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
          <Header />
          <NavigationBar />
        </div>
        <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
          <Pagination
            count={lastPage}
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
        <Stack direction='column'>
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
              {/* {console.log("key", key, anime)} */}
              <figure>
                <Link
                  to={typeThing === "anime" ? "/anime-info" : "/manga-info"}
                  state={
                    typeThing === "anime"
                      ? { animeId: anime.mal_id }
                      : { mangaId: anime.mal_id }
                  }
                >
                  <img src={anime.image_url} alt={anime.title} />
                </Link>
              </figure>
              <figure>
                <h3>{anime.title}</h3>
              </figure>
              <Typography>
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
        </Stack>
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
