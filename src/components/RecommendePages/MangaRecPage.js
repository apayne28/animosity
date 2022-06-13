import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Divider,
  Grid,
  Typography,
  Link as MuiLink,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { useLocation, Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import MangaInfoMangaDetails from "../MangaInfo/MangaInfoMangaDetails";
import MangaInfoSideContentSingle from "../MangaInfo/MangaInfoSideContentSingle";

function MangaRecPage(props) {
  const location = useLocation();
  const [animeRecs, setAnimeRecs] = useState();
  const originManga = location.state.mangaId;
  const originMangaRecList = location.state.mangaRecList;
  const [info, setInfo] = useState();
  const [characterList, setCharacterList] = useState();
  let id = location.state.mangaId;

  console.log(location, props, originMangaRecList);

  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();
  let navigate = useNavigate();
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

  const getCharacterList = useCallback(async (id) => {
    //   console.log(props, location);

    try {
      let mangaCharactersData = await fetch(
        `https://api.jikan.moe/v4/manga/${id}/characters`,
      ).then((res) => res.json());
      let mangaCharactersDataResults = mangaCharactersData.data;
      console.log("Chatacters", mangaCharactersDataResults);

      setCharacterList(mangaCharactersDataResults);
    } catch (error) {
      console.log("Character List not found");
    }
  }, []);

  useEffect(() => {
    if (!mangaRecommendationsList) {
      getMangaRecs(id);
    }
    if (!characterList) {
      getCharacterList(id);
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
    id,
    mangaRecommendationsList,
    props.mangaId,
    rowHeight,
    windowSize,
  ]);
  console.log(characterList);
  if (originMangaRecList) {
    return (
      <Box>
        {/* <Header /> */}
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <MangaInfoSideContentSingle mangaId={id} />

          <div className='anime-character-list-contents'>
            <MangaInfoMangaDetails
              mangaRecList={mangaRecommendationsList}
              mangaId={id}
              charList={characterList}
            />
            <Grid container>
              <ImageList cols={columnSize} rowHeight={rowHeight}>
                {originMangaRecList.map((entry) => {
                  // console.log(test);
                  return (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // width: "70%",
                        margin: "auto",
                        backgroundColor: "white",
                      }}
                    >
                      <Link
                        to='/manga-info'
                        state={{ mangaId: entry.entry.mal_id }}
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
                        <div>
                          {/* <Typography
                        sx={{
                          wordWrap: "break-word",
                          // backgroundColor: "black",
                          // color: "white",
                        }}
                      >
                        {entry.entry.title}
                      </Typography> */}
                        </div>
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
    return (
      <div>
        {console.log(location, props)}
        <LoadingScreen />
      </div>
    );
  }
}

export default MangaRecPage;
