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
import MangaAuthorDetails from "./MangaAuthorDetails";
import CharacterVoiceActorSide from "../CharacterVoiceActorPage/CharacterVoiceActorSide";

function MangaAuthorMangaPage(props) {
  const location = useLocation();
  const animeId = location.state.animeId;

  let voiceActor = props.voiceActor
    ? props.voiceActor
    : location.state.voiceActor;
  let animeList = props.animeList ? props.animeList : location.state.animeList;
  let windowSize = window.innerWidth;

  window.addEventListener("resize", () => {
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
  }, [animeId, columnSize, rowHeight, windowSize]);
  console.log(voiceActor, animeList);
  if (animeList) {
    return (
      <Box sx={{ height: "100vh" }}>
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <CharacterVoiceActorSide actorId={voiceActor} />

          <div className='anime-character-list-contents'>
            <MangaAuthorDetails
              authorId={voiceActor}
              authorMangaList={animeList}
            />
            <Grid container>
              <ImageList cols={columnSize} rowHeight={rowHeight}>
                {animeList.map((anime) => {
                  let animeEntry = anime.manga;
                  console.log(anime);

                  console.log(animeEntry);

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
                        to='/manga-info'
                        state={{ mangaId: animeEntry.mal_id }}
                      >
                        <ImageListItem>
                          <Box
                            component='img'
                            sx={{ width: "100%", height: "100%" }}
                            src={animeEntry.images.jpg.image_url}
                            alt={animeEntry.name}
                          />

                          <ImageListItemBar
                            title={animeEntry.title}
                            subtitle={anime.position}
                          />
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

export default MangaAuthorMangaPage;
