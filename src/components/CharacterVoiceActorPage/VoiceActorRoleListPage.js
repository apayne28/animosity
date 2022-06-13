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
import CharacterVoiceActorSide from "./CharacterVoiceActorSide";
import VoiceActorDetails from "./VoiceActorDetails";

function VoiceActorRoleListPage(props) {
  const location = useLocation();
  // const animeId = location.state.animeId;
  //   const mangaId = location.state.mangaId;

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

  let test = roleList.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.character.name === value.character.name &&
          t.name === value.character.anime,
      ),
  );

  console.log(roleList, test);

  console.log(voiceActor, animeList, roleList);
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
  }, [columnSize, rowHeight, windowSize]);

  if (test) {
    return (
      <Box sx={{ height: "100vh" }}>
        <NavigationBar />

        <Box sx={{ display: "flex", marginTop: "2%" }}>
          <CharacterVoiceActorSide actorId={voiceActor} />

          <div className='anime-character-list-contents'>
            <VoiceActorDetails
              animeId={voiceActor}
              animeList={animeList}
              charList={roleList}
            />
            <Grid container>
              <ImageList cols={columnSize} rowHeight={rowHeight}>
                {test.map((character) => {
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

export default VoiceActorRoleListPage;
