import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { useLocation, Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoAnimeDetails from "../AnimeInfo/AnimeInfoAnimeDetails";
import AnimeInfoSideContentSingle from "../AnimeInfo/AnimeInfoSideContentSingle";

function AnimeRecPage(props) {
  const location = useLocation();

  const originAnimeRecList = location.state.animeRecList;
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  const [animeCharacterList, setAnimeCharacterList] = useState();

  // const [info, setInfo] = useState();

  const id = location.state.animeId;
  let windowSize = window.innerWidth;

  window.addEventListener("resize", () => {
    console.log(windowSize);
    if (windowSize > 3008) {
      setColumnSize(10);
      setRowHeight(550);
    } else if (windowSize > 1100 && windowSize <= 2048) {
      setColumnSize(6);
      setRowHeight(550);
    } else if (windowSize > 855 && windowSize <= 1100) {
      setColumnSize(5);
      setRowHeight(350);
    } else if (windowSize > 550 && windowSize <= 855) {
      setColumnSize(3);
      setRowHeight(350);
    } else if (windowSize <= 550) {
      setColumnSize(2);
      setRowHeight(350);
    }
  });

  const [columnSize, setColumnSize] = useState();
  const [rowHeight, setRowHeight] = useState();

  console.log(location, props, originAnimeRecList);

  const getAnime = useCallback(async (id) => {
    // id = props.animeId;
    try {
      //Grabs Anime Data Object
      const animeData = await fetch(
        `https://api.jikan.moe/v4/anime/${id}`,
      ).then((res) => res.json());

      let animeResults = animeData.data;
      console.log(animeResults);
      // setInfo(animeResults);
    } catch (error) {
      console.log("Anime not found");
    }

    try {
      let animeRecommendationsData = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/recommendations`,
      ).then((res) => res.json());
      let animeRecommendationsDataResults = animeRecommendationsData.data;

      console.log("Recs", animeRecommendationsDataResults);
      setAnimeRecommendationsList(animeRecommendationsDataResults);
    } catch (error) {
      console.log("Anime Recs not found");
    }

    try {
      let animeCharactersData = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/characters`,
      ).then((res) => res.json());
      let animeCharactersDataResults = animeCharactersData.data;
      console.log("Chatacters", animeCharactersDataResults);
      setAnimeCharacterList(animeCharactersDataResults);
    } catch (error) {
      console.log("Character not found");
    }
  }, []);

  useEffect(() => {
    if (!animeRecommendationsList) {
      getAnime(props.animeId);
    }

    if (!columnSize && !rowHeight) {
      if (windowSize > 3008) {
        setColumnSize(10);
        setRowHeight(550);
      } else if (windowSize > 1100 && windowSize <= 2048) {
        setColumnSize(6);
        setRowHeight(550);
      } else if (windowSize > 855 && windowSize <= 1100) {
        setColumnSize(5);
        setRowHeight(350);
      } else if (windowSize > 550 && windowSize <= 855) {
        setColumnSize(3);
        setRowHeight(350);
      } else if (windowSize <= 550) {
        setColumnSize(2);
        setRowHeight(350);
      }
    }
  }, [
    animeRecommendationsList,

    props.animeId,
    getAnime,
    columnSize,
    rowHeight,
    windowSize,
  ]);

  if (originAnimeRecList) {
    return (
      <Box>
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <AnimeInfoSideContentSingle animeId={id} />
          <div className='anime-character-list-contents'>
            <AnimeInfoAnimeDetails
              animeRecList={
                animeRecommendationsList
                  ? animeRecommendationsList
                  : location.state.animeRecList
              }
              animeId={id}
              charList={animeCharacterList}
            />
            <Grid container>
              <ImageList cols={columnSize} rowHeight={rowHeight}>
                {originAnimeRecList.map((entry) => {
                  return (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        margin: "auto",
                        backgroundColor: "white",
                      }}
                    >
                      <Link
                        to='/anime-info'
                        state={{ animeId: entry.entry.mal_id }}
                      >
                        <ImageListItem>
                          <Box
                            component='img'
                            src={entry.entry.images.jpg.image_url}
                            alt={entry.entry.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 1,
                            }}
                          />
                          <ImageListItemBar title={entry.entry.title} />
                        </ImageListItem>
                        <div></div>
                      </Link>
                    </Grid>
                  );
                })}
              </ImageList>
            </Grid>
          </div>
        </Box>
        <footer class='footer' />
      </Box>
    );
  } else {
    return (
      <div>
        {console.log(location, props)}
        <LoadingScreen />
      </div>
    );
  }
}

export default AnimeRecPage;
