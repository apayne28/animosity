import {
  Box,
  Typography,
  Grid,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import Carousel from "react-elastic-carousel";
import { Accordion } from "react-bootstrap";

function CharacterVoiceActorSide(props) {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const location = useLocation();
  //   let characterValue = location.state.characterValue;

  const [voiceActor, setVoiceActor] = useState();
  const [voiceRoles, setVoiceRoles] = useState();

  console.log(props);
  let id = props.actorId ? props.actorId : location.state.voiceActor;

  const getVoiceActor = useCallback(async () => {
    try {
      const voiceActorData = await fetch(
        `https://api.jikan.moe/v4/people/${id}`,
      ).then((res) => res.json());

      let voiceActorResults = voiceActorData.data;

      console.log("yoo", voiceActorResults);

      setVoiceActor(voiceActorResults);
      console.log(voiceActor);
    } catch (error) {
      console.log("Character not found");
    }

    //Get Voice Roles

    // try {
    //   const voiceActorRoleData = await fetch(
    //     `https://api.jikan.moe/v4/people/${id}/voices`,
    //   ).then((res) => res.json());
    //   console.log(id);
    //   console.log(voiceActorRoleData);
    //   let voiceActorRoleResults = voiceActorRoleData.data;
    //   setVoiceRoles(voiceActorRoleResults);
    //   console.log(voiceRoles);
    // } catch (error) {
    //   console.log("Character not found");
    // }
  }, [id, voiceActor]);

  useEffect(() => {
    if (!voiceActor) {
      getVoiceActor(props.actorId);
    }
  }, [getVoiceActor, props.actorId, voiceActor, voiceRoles]);

  //   const breakPoints = [
  //     { width: 1, itemsToShow: 1 },
  //     { width: 550, itemsToShow: 3, itemsToScroll: 3 },
  //     // { width: 768, itemsToShow: 4, itemsToScroll: 4 },
  //     { width: 1100, itemsToShow: 4, itemsToScroll: 4 },

  //     { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
  //   ];

  //   let filteredVoiceRoles;
  //   let filteredAnime;

  //   if (voiceRoles) {
  //     filteredVoiceRoles = voiceRoles.filter(
  //       (value, index, self) =>
  //         index ===
  //         self.findIndex(
  //           (t) =>
  //             t.character.name === value.character.name &&
  //             t.name === value.character.anime,
  //         ),
  //     );

  //     // filteredAnime = filteredVoiceRoles.filter(
  //     //   (value, index, self) =>
  //     //     index ===
  //     //     self.findIndex(
  //     //       (t) =>
  //     //         t.anime.title === value.anime.title &&
  //     //         t.anime.title === value.anime.title,
  //     //     ),
  //     // );
  //     // console.log(filteredVoiceRoles, filteredAnime);
  //   }
  console.log(location);
  if (voiceActor) {
    return (
      <div className='anime-info-side-content'>
        <ImageList cols={1}>
          <ImageListItem>
            <Box
              component='img'
              src={voiceActor.images.jpg.image_url}
              alt={voiceActor.name}
            />
            <ImageListItemBar
              title={<Typography>{voiceActor.name}</Typography>}
              //   subtitle={
              //     <Typography>{`${
              //       animeCharacter.name_kanji
              //         ? `${animeCharacter.name_kanji}`
              //         : ""
              //     }`}</Typography>
              //   }
            />
          </ImageListItem>
        </ImageList>

        <div className='anime-info-alternative-titles-container'>
          {voiceActor.alternate_names.length > 0 ? (
            <Grid item sx={{ paddingBottom: 5 }}>
              <Typography
                sx={{
                  backgroundColor: "#59C9A5",
                  padding: "2%",
                  borderRadius: "1%",
                  fontSize: 23,
                  opacity: "80%",
                }}
              >
                Nicknames:
              </Typography>
              {voiceActor.alternate_names.map((nicknames) => {
                return (
                  <Typography sx={{ padding: "2%", fontSize: 19 }}>
                    {nicknames}
                  </Typography>
                );
              })}
            </Grid>
          ) : (
            ""
          )}
        </div>
        <div className='anime-character-members-number'>
          <Typography
            sx={{
              backgroundColor: "#59C9A5",
              padding: "2%",
              borderRadius: "1%",
              fontSize: 23,
              opacity: "80%",
            }}
          >
            Member Favorites:
          </Typography>
          <Typography
            sx={{ padding: "2%", fontSize: 25 }}
          >{`${voiceActor.favorites}`}</Typography>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default CharacterVoiceActorSide;
