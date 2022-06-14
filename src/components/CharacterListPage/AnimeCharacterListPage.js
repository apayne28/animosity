import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import {
  Grid,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoAnimeDetails from "../AnimeInfo/AnimeInfoAnimeDetails";
import AnimeInfoSideContentSingle from "../AnimeInfo/AnimeInfoSideContentSingle";

function AnimeCharacterListPage(props) {
  const location = useLocation();
  const animeId = location.state.animeId;
  //   const mangaId = location.state.mangaId;

  const [characterList, setCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();

  console.log(props, location);
  let windowSize = window.innerWidth;

  window.addEventListener("resize", () => {
    console.log(windowSize);
    if (windowSize > 3000) {
      setColumnSize(5);
      setRowHeight(780);
    } else if (windowSize > 2048 && windowSize <= 3000) {
      setColumnSize(4);
      setRowHeight(780);
    } else if (windowSize > 1100 && windowSize <= 2048) {
      setColumnSize(4);
      setRowHeight(580);
    } else if (windowSize > 855 && windowSize <= 1100) {
      setColumnSize(3);
      setRowHeight(480);
    } else if (windowSize > 550 && windowSize <= 855) {
      setColumnSize(2);
      setRowHeight(480);
    } else if (windowSize <= 550) {
      setColumnSize(1);
      setRowHeight(580);
    }
  });

  const [columnSize, setColumnSize] = useState();
  const [rowHeight, setRowHeight] = useState();

  const getCharacterList = useCallback(
    async (id) => {
      //   console.log(props, location);

      try {
        let animeCharactersData = await fetch(
          `https://api.jikan.moe/v4/anime/${animeId}/characters`,
        ).then((res) => res.json());
        let animeCharactersDataResults = animeCharactersData.data;
        console.log("Chatacters", animeCharactersDataResults);

        setCharacterList(animeCharactersDataResults);
      } catch (error) {
        console.log("Character List not found");
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
    },
    [animeId],
  );

  useEffect(() => {
    if (!characterList) {
      getCharacterList(animeId);
    }
    if (!columnSize && !rowHeight) {
      if (windowSize > 3000) {
        setColumnSize(5);
        setRowHeight(780);
      } else if (windowSize > 2048 && windowSize <= 3000) {
        setColumnSize(4);
        setRowHeight(780);
      } else if (windowSize > 1100 && windowSize <= 2048) {
        setColumnSize(4);
        setRowHeight(580);
      } else if (windowSize > 855 && windowSize <= 1100) {
        setColumnSize(3);
        setRowHeight(480);
      } else if (windowSize > 550 && windowSize <= 855) {
        setColumnSize(2);
        setRowHeight(480);
      } else if (windowSize <= 550) {
        setColumnSize(1);
        setRowHeight(580);
      }
    }
  }, [
    animeId,
    characterList,
    columnSize,
    getCharacterList,
    rowHeight,
    windowSize,
  ]);

  if (characterList) {
    return (
      <Box>
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <AnimeInfoSideContentSingle animeId={animeId} />
          <div className='anime-character-list-contents'>
            <AnimeInfoAnimeDetails
              animeId={animeId}
              animeRecList={
                animeRecommendationsList
                  ? animeRecommendationsList
                  : location.state.animeRecList
              }
              charList={characterList}
            />
            <Grid container>
              <ImageList cols={columnSize} rowHeight={rowHeight}>
                {characterList.map((character) => {
                  let characterEntry = character.character;

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
                        to='/character-profile'
                        state={{ characterId: characterEntry.mal_id }}
                      >
                        <ImageListItem>
                          <Box
                            component='img'
                            sx={{ width: "100%", height: "100%" }}
                            src={characterEntry.images.jpg.image_url}
                            alt={characterEntry.name}
                          />

                          <ImageListItemBar title={characterEntry.name} />
                        </ImageListItem>
                      </Link>
                    </Grid>
                  );
                })}
              </ImageList>
            </Grid>
          </div>
        </Box>
      </Box>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeCharacterListPage;
