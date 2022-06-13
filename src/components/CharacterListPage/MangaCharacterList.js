import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import {
  Grid,
  Typography,
  Box,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoSideContent from "../AnimeInfo/AnimeInfoSideContent";

import MangaInfoSideContent from "../MangaInfo/MangaInfoSideContent";
import MangaInfoMangaDetails from "../MangaInfo/MangaInfoMangaDetails";
import MangaInfoSideContentSingle from "../MangaInfo/MangaInfoSideContentSingle";

function MangaCharacterList(props) {
  const location = useLocation();
  const mangaId = location.state.mangaId;
  //   const mangaId = location.state.mangaId;

  const [characterList, setCharacterList] = useState();
  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();
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
  console.log(props, location);
  const getCharacterList = useCallback(
    async (id) => {
      //   console.log(props, location);

      try {
        let mangaCharactersData = await fetch(
          `https://api.jikan.moe/v4/manga/${mangaId}/characters`,
        ).then((res) => res.json());
        let mangaCharactersDataResults = mangaCharactersData.data;
        console.log("Chatacters", mangaCharactersDataResults);

        setCharacterList(mangaCharactersDataResults);
      } catch (error) {
        console.log("Character List not found");
      }
    },
    [mangaId],
  );

  const getMangaRecs = useCallback(async (id) => {
    try {
      //Grabs Manga Recs
      let mangaRecommendationsData = await fetch(
        `https://api.jikan.moe/v4/manga/${id}/recommendations`,
      ).then((res) => res.json());
      let mangaRecommendationsDataResults = mangaRecommendationsData.data;

      setMangaRecommendationsList(mangaRecommendationsDataResults);
    } catch (error) {
      console.log("Manga Recs not found");
    }
  }, []);

  useEffect(() => {
    if (!characterList) {
      getCharacterList(mangaId);
    }
    if (!mangaRecommendationsList) {
      getMangaRecs(mangaId);
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
    characterList,
    columnSize,
    getCharacterList,
    getMangaRecs,
    mangaId,
    mangaRecommendationsList,
    rowHeight,
    windowSize,
  ]);

  if (characterList) {
    return (
      <Box>
        {/* <Header /> */}
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          {/* <MangaInfoSideContent animeId={animeId} /> */}
          <MangaInfoSideContentSingle mangaId={mangaId} />
          <div className='anime-character-list-contents'>
            <MangaInfoMangaDetails
              mangaId={mangaId}
              mangaRecList={mangaRecommendationsList}
              charList={characterList}
            />
            <Grid container>
              <ImageList cols={columnSize} rowHeight={rowHeight}>
                {characterList.map((character) => {
                  let characterEntry = character.character;
                  // console.log(characterEntry);

                  return (
                    <Link
                      to='/character-profile'
                      state={{ characterId: characterEntry.mal_id }}
                    >
                      <ImageListItem>
                        <Box
                          component='img'
                          src={characterEntry.images.jpg.image_url}
                          alt={characterEntry.name}
                          sx={{ width: "100%", height: "100%" }}
                        />
                        <ImageListItemBar title={characterEntry.name} />
                      </ImageListItem>
                      {/* <Typography>{characterEntry.name} </Typography>å */}
                    </Link>
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

export default MangaCharacterList;
