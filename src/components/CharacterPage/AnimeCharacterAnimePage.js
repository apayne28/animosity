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
import AnimeCharacterSide from "./AnimeCharacterSide";

import CharacterDetails from "./CharacterDetails";
function AnimeCharacterAnimePage(props) {
  const location = useLocation();
  const animeId = location.state.animeId;
  //   const mangaId = location.state.mangaId;

  const [characterList, setCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  // const [voiceActor, setVoiceActor] = useState();
  // const [voiceRoles, setVoiceRoles] = useState();
  console.log(location.state);

  //    let roleList = props.filteredVoiceRoles
  //      ? props.filteredVoiceRoles
  //      : location.state.roleList;
  //    let voiceActor = props.voiceActor
  //      ? props.voiceActor
  //      : location.state.voiceActor;
  //    let animeList = props.animeList ? props.animeList : location.state.animeList;

  let voiceActors = props.voiceActors
    ? props.voiceActors
    : location.state.voiceActors;
  let characterId = props.characterId
    ? props.characterId
    : location.state.characterId;
  let animeList = props.animeList ? props.animeList : location.state.animeList;
  let mangaList = props.mangaList ? props.mangaList : location.state.mangaList;

  // let test = roleList.filter((val, index, self) => {
  //   console.log("Val:", val);
  //   console.log("Role:", index);

  //   console.log("Self", self);
  // });

  //    let test = roleList.filter(
  //      (value, index, self) =>
  //        index ===
  //        self.findIndex(
  //          (t) =>
  //            t.character.name === value.character.name &&
  //            t.name === value.character.anime,
  //        ),
  //    );

  //    console.log(roleList, test);

  //    console.log(voiceActor, animeList, roleList);
  console.log(voiceActors, animeList, characterId);
  if (animeList) {
    return (
      <Box sx={{ height: "100vh" }}>
        {/* <Header /> */}
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
              <ImageList
                cols={animeList.length >= 10 ? 10 : 5}
                rowHeight={animeList.length >= 10 ? 400 : 550}
              >
                {animeList.map((anime) => {
                  console.log(anime);

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
                      <Link to='/anime-info' state={{ animeId: anime.mal_id }}>
                        <ImageListItem>
                          <Box
                            component='img'
                            sx={{ width: "100%", height: "100%" }}
                            src={anime.image_url}
                            alt={anime.name}
                          />

                          <ImageListItemBar title={anime.name} />
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

export default AnimeCharacterAnimePage;
