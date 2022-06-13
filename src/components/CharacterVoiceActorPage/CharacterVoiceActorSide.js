import {
  Box,
  Typography,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

function CharacterVoiceActorSide(props) {
  // const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const location = useLocation();
  //   let characterValue = location.state.characterValue;

  const [voiceActor, setVoiceActor] = useState();

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
  }, [id, voiceActor]);

  useEffect(() => {
    if (!voiceActor) {
      getVoiceActor(props.actorId);
    }
  }, [getVoiceActor, props.actorId, voiceActor]);

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
              sx={{ width: "100%", height: "100%", borderRadius: 1 }}
            />
            <ImageListItemBar
              title={<Typography>{voiceActor.name}</Typography>}
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
          >{`${voiceActor.favorites.toLocaleString("en-US")}`}</Typography>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default CharacterVoiceActorSide;
