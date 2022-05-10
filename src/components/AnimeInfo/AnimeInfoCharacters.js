import {
  Divider,
  Grid,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";
import { useNavigate, Link } from "react-router-dom";

import LoadingScreen from "../LoadingScreen";
import ReactPlayer from "react-player";

function AnimeInfoCharacters(props) {
  const [animeCharacterList, setAnimeCharacterList] = useState();
  const [isCharLoaded, setIsCharLoader] = useState();
  let navigate = useNavigate();
  console.log(props.animeId);
  const getAnimeCharacters = useCallback(async (id) => {
    let animeCharactersData = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`,
    ).then((res) => res.json());
    let animeCharactersDataResults = animeCharactersData.data;
    console.log("Chatacters", animeCharactersDataResults);
    setAnimeCharacterList(animeCharactersDataResults);
  }, []);
  useEffect(() => {
    if (!animeCharacterList) {
      getAnimeCharacters(props.animeId);
    }
  }, [animeCharacterList, getAnimeCharacters, props.animeId]);

  if (animeCharacterList) {
    return (
      <Box>
        <h3>Characters</h3>

        <Link
          to='/anime-character-list-page'
          state={{ animeId: props.animeId }}
        >
          <Typography>View More</Typography>
        </Link>

        <Grid xs={1} md={12} container className='anime-info-character-list'>
          <ImageList cols={5} rowHeight={400}>
            {animeCharacterList.slice(0, 5).map((character) => {
              let characterEntry = character.character;
              // console.log(characterEntry);

              return (
                <Grid item>
                  <Link
                    to='/character-profile'
                    state={{ characterId: characterEntry.mal_id }}
                  >
                    <ImageListItem>
                      <img
                        src={characterEntry.images.jpg.image_url}
                        alt={characterEntry.name}
                      />
                      <ImageListItemBar title={characterEntry.name} />
                    </ImageListItem>
                    {/* <Typography>{characterEntry.name} </Typography> */}
                  </Link>
                </Grid>
              );
            })}
          </ImageList>
        </Grid>
      </Box>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeInfoCharacters;
