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

function AnimeCharacterSide(props) {
  // const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const location = useLocation();
  let characterValue = location.state.characterId
    ? location.state.characterId
    : props.characterId;

  const [animeCharacter, setAnimeCharacter] = useState();
  console.log(animeCharacter, characterValue, location.state.voiceActor, props);

  const getAnimeCharacter = useCallback(async () => {
    // id = props.characterId;

    try {
      const characterData = await fetch(
        `https://api.jikan.moe/v4/characters/${characterValue}/full`,
      ).then((res) => res.json());

      console.log(characterData);
      let characterResults = characterData.data;
      setAnimeCharacter(characterResults);
      console.log(animeCharacter);
    } catch (error) {
      console.log("Character not found");
    }
  }, [animeCharacter, characterValue]);

  useEffect(() => {
    if (!animeCharacter) {
      getAnimeCharacter(characterValue);
    }
  }, [animeCharacter, characterValue, getAnimeCharacter, props.characterId]);

  console.log(animeCharacter, characterValue);

  if (animeCharacter) {
    return (
      <div className='anime-character-side-content'>
        <ImageList cols={1}>
          <ImageListItem>
            <Box
              component='img'
              src={animeCharacter.images.jpg.image_url}
              alt={animeCharacter.name}
              sx={{ width: "100%", height: "100%", borderRadius: 1 }}
            />
            <ImageListItemBar
              title={<Typography>{animeCharacter.name}</Typography>}
              subtitle={
                <Typography>{`${
                  animeCharacter.name_kanji
                    ? `${animeCharacter.name_kanji}`
                    : ""
                }`}</Typography>
              }
            />
          </ImageListItem>
        </ImageList>

        <div className='anime-characters-nickname-container'>
          {animeCharacter.nicknames.length > 0 ? (
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
              {animeCharacter.nicknames.map((nicknames) => {
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
          >{`${animeCharacter.favorites}`}</Typography>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeCharacterSide;
