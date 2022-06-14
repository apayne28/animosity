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
    if (windowSize > 3008) {
      setColumnSize(10);
      setRowHeight(550);
    } else if (windowSize > 1720 && windowSize <= 2048) {
      setColumnSize(6);
      setRowHeight(550);
    } else if (windowSize > 1200 && windowSize <= 1720) {
      setColumnSize(5);
      setRowHeight(450);
    } else if (windowSize > 750 && windowSize <= 1200) {
      setColumnSize(3);
      setRowHeight(450);
    } else if (windowSize <= 750) {
      setColumnSize(2);
      setRowHeight(350);
    }
  });

  const [columnSize, setColumnSize] = useState();
  const [rowHeight, setRowHeight] = useState();

  console.log(voiceActors, animeList, characterId, mangaList);

  useEffect(() => {
    if (!columnSize && !rowHeight) {
      if (windowSize > 3008) {
        setColumnSize(10);
        setRowHeight(550);
      } else if (windowSize > 1720 && windowSize <= 2048) {
        setColumnSize(6);
        setRowHeight(550);
      } else if (windowSize > 1200 && windowSize <= 1720) {
        setColumnSize(5);
        setRowHeight(450);
      } else if (windowSize > 750 && windowSize <= 1200) {
        setColumnSize(3);
        setRowHeight(450);
      } else if (windowSize <= 750) {
        setColumnSize(2);
        setRowHeight(350);
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
                      <Link to='/manga-info' state={{ mangaId: manga.mal_id }}>
                        <ImageListItem>
                          <Box
                            component='img'
                            sx={{ width: "100%", height: "100%" }}
                            src={manga.image_url}
                            alt={manga.name}
                          />

                          <ImageListItemBar title={manga.name} />
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
