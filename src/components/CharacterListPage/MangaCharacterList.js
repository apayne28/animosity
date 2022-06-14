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
import MangaInfoMangaDetails from "../MangaInfo/MangaInfoMangaDetails";
import MangaInfoSideContentSingle from "../MangaInfo/MangaInfoSideContentSingle";

function MangaCharacterList(props) {
  const location = useLocation();
  const mangaId = location.state.mangaId;

  const [characterList, setCharacterList] = useState();
  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();
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
