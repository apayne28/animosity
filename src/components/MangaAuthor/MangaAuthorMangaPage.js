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
  Button,
} from "@mui/material";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoSideContent from "../AnimeInfo/AnimeInfoSideContent";
import AnimeInfoAnimeDetails from "../AnimeInfo/AnimeInfoAnimeDetails";
import AnimeInfoSideContentSingle from "../AnimeInfo/AnimeInfoSideContentSingle";

// import VoiceActorDetails from "./VoiceActorDetails";
import MangaAuthorDetails from "./MangaAuthorDetails";
import CharacterVoiceActorSide from "../CharacterVoiceActorPage/CharacterVoiceActorSide";

function MangaAuthorMangaPage(props) {
  const location = useLocation();
  const animeId = location.state.animeId;
  //   const mangaId = location.state.mangaId;

  const [characterList, setCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  // const [voiceActor, setVoiceActor] = useState();
  // const [voiceRoles, setVoiceRoles] = useState();
  console.log(location.state);

  let roleList = props.filteredVoiceRoles
    ? props.filteredVoiceRoles
    : location.state.roleList;
  let voiceActor = props.voiceActor
    ? props.voiceActor
    : location.state.voiceActor;
  let animeList = props.animeList ? props.animeList : location.state.animeList;
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

  // let test = roleList.filter((val, index, self) => {
  //   console.log("Val:", val);
  //   console.log("Role:", index);

  //   console.log("Self", self);
  // });

  //   let test = roleList.filter(
  //     (value, index, self) =>
  //       index ===
  //       self.findIndex(
  //         (t) =>
  //           t.character.name === value.character.name &&
  //           t.name === value.character.anime,
  //       ),
  //   );

  // const getCharacterList = useCallback(
  //   async (id) => {
  //     //   console.log(props, location);

  //     try {
  //       let animeCharactersData = await fetch(
  //         `https://api.jikan.moe/v4/anime/${animeId}/characters`,
  //       ).then((res) => res.json());
  //       let animeCharactersDataResults = animeCharactersData.data;
  //       console.log("Chatacters", animeCharactersDataResults);

  //       setCharacterList(animeCharactersDataResults);
  //     } catch (error) {
  //       console.log("Character List not found");
  //     }

  //     try {
  //       let animeRecommendationsData = await fetch(
  //         `https://api.jikan.moe/v4/anime/${id}/recommendations`,
  //       ).then((res) => res.json());
  //       let animeRecommendationsDataResults = animeRecommendationsData.data;

  //       console.log("Recs", animeRecommendationsDataResults);
  //       setAnimeRecommendationsList(animeRecommendationsDataResults);
  //     } catch (error) {
  //       console.log("Anime Recs not found");
  //     }
  //   },
  //   [animeId],
  // );

  useEffect(() => {
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
  }, [animeId, characterList, columnSize, rowHeight, windowSize]);
  console.log(voiceActor, animeList);
  if (animeList) {
    return (
      <Box sx={{ height: "100vh" }}>
        {/* <Header /> */}
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <CharacterVoiceActorSide actorId={voiceActor} />

          <div className='anime-character-list-contents'>
            <MangaAuthorDetails
              authorId={voiceActor}
              // charList={filteredVoiceRoles}
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
                        // width: "70%",
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

export default MangaAuthorMangaPage;
