import React, { useState, useEffect } from "react";
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
import AnimeCharacterSide from "./AnimeCharacterSide";
import CharacterDetails from "./CharacterDetails";

function AnimeCharacterMangaPage(props) {
  const location = useLocation();
  // const animeId = location.state.animeId;
  //   const mangaId = location.state.mangaId;

  console.log(location.state);

  let voiceActors = props.voiceActors
    ? props.voiceActors
    : location.state.voiceActors;
  let characterId = props.characterId
    ? props.characterId
    : location.state.characterId;
  let animeList = props.animeList ? props.animeList : location.state.animeList;
  let mangaList = props.mangaList ? props.mangaList : location.state.mangaList;
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

  console.log(voiceActors, animeList, characterId, mangaList);

  useEffect(() => {
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
  }, [columnSize, rowHeight, windowSize]);

  if (mangaList) {
    return (
      <Box sx={{ height: "100vh" }}>
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <AnimeCharacterSide actorId={characterId} />

          <div className='anime-character-list-contents'>
            <CharacterDetails
              voiceActors={voiceActors}
              animeList={animeList}
              characterId={characterId}
              mangaList={mangaList}
            />

            <Grid container>
              <ImageList cols={columnSize} rowHeight={rowHeight}>
                {mangaList.map((manga) => {
                  console.log(manga);

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
                      <Link to='/manga-info' state={{ mangaId: manga.manga.mal_id }}>
                        <ImageListItem>
                          <Box
                            component='img'
                            sx={{ width: "100%", height: "100%" }}
                            src={manga.manga.images.jpg.image_url}
                            alt={manga.manga.title}
                          />

                          <ImageListItemBar title={manga.manga.title} />
                        </ImageListItem>

                        {/* <Typography>{characterEntry.name} </Typography> */}
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

export default AnimeCharacterMangaPage;
