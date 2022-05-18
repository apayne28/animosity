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

import CharacterDetails from "./CharacterDetails";
import AnimeCharacterSide from "./AnimeCharacterSide";

function AnimeCharacterVoiceActorPage(props) {
  const location = useLocation();
  const animeId = location.state.animeId;
  //   const mangaId = location.state.mangaId;

  const [characterList, setCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  // const [voiceActor, setVoiceActor] = useState();
  // const [voiceRoles, setVoiceRoles] = useState();
  console.log(location, props);

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

  //   let test = roleList.filter(
  //     (value, index, self) =>
  //       index ===
  //       self.findIndex(
  //         (t) =>
  //           t.character.name === value.character.name &&
  //           t.name === value.character.anime,
  //       ),
  //   );

  //   console.log(roleList, test);

  console.log(voiceActors, animeList, characterId);

  if ((characterId, voiceActors)) {
    return (
      <Box sx={{ height: "100vh" }}>
        {/* <Header /> */}
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <AnimeCharacterSide characterId={characterId} />

          <div className='anime-character-list-contents'>
            <CharacterDetails
              voiceActors={voiceActors}
              animeList={animeList}
              characterId={characterId}
              mangaList={mangaList}
            />
            <Grid container>
              <ImageList
                cols={voiceActors.length >= 10 ? 10 : 5}
                rowHeight={voiceActors.length >= 10 ? 400 : 550}
              >
                {voiceActors.map((actor) => {
                  // let characterEntry = character.character;
                  console.log(actor);

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
                        to='/character-voice-actor-page'
                        state={{ characterValue: actor.mal_id }}
                      >
                        <ImageListItem>
                          <Box
                            component='img'
                            sx={{ width: "100%", height: "100%" }}
                            src={actor.image_url}
                            alt={actor.name}
                          />

                          <ImageListItemBar
                            title={actor.name}
                            subtitle={actor.language}
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

export default AnimeCharacterVoiceActorPage;
