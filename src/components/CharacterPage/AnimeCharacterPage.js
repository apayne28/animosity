import { Box, Typography, Grid, Divider } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";

function AnimeCharacterPage(props) {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const location = useLocation();
  let characterValue = location.state.characterId;

  const [animeCharacter, setAnimeCharacter] = useState();

  const getAnimeCharacter = useCallback(
    async (id) => {
      // id = props.characterId;

      try {
        const characterData = await fetch(
          `https://api.jikan.moe/v3/character/${characterValue}`,
        ).then((res) => res.json());

        console.log(characterData);
        let characterResults = characterData;
        setAnimeCharacter(characterResults);
        console.log(animeCharacter);
      } catch (error) {
        console.log("Character not found");
      }
    },
    [animeCharacter, characterValue],
  );

  useEffect(() => {
    if (!animeCharacter) {
      getAnimeCharacter(characterValue);
    }
  }, [animeCharacter, characterValue, getAnimeCharacter, props.characterId]);

  if (animeCharacter) {
    return (
      <Box>
        <Header />
        <NavigationBar />
        <Box classname='character-profile-name-bar'>
          <Typography>{animeCharacter.name}</Typography>
        </Box>
        <Box
          classname='character-profile-container'
          sx={{ backgroundColor: "white", display: "flex" }}
        >
          <Box
            classname='character-profile-side-bar'
            sx={{ backgroundColor: "pink" }}
          >
            <Box className='character-profile-image-and-name'>
              <img src={animeCharacter.image_url} alt={animeCharacter.name} />
              {animeCharacter.nicknames.length > 0 ? (
                <Box sx={{ paddingBottom: 5 }}>
                  <Typography>Nicknames:</Typography>
                  {animeCharacter.nicknames.map((nicknames) => {
                    return <Typography>{nicknames}</Typography>;
                  })}
                </Box>
              ) : (
                ""
              )}
            </Box>

            <Box classname='character-profile-character-appearances'>
              <Typography sx={{ paddingBottom: 1 }}>Animeography</Typography>
              <Divider />
              <Grid container xs={4} md={12}>
                {animeCharacter.animeography.map((appearances) => {
                  return (
                    <Grid
                      item
                      classname='character-profile-anime-appearance-entry'
                      sx={{ display: "flex" }}
                    >
                      <Link
                        to='/anime-info'
                        state={{ animeId: appearances.mal_id }}
                      >
                        <div className='character-profile-image'>
                          <img
                            src={appearances.image_url}
                            alt={appearances.name}
                          />
                        </div>
                      </Link>

                      <Box classname='character-profile-anime-appearance-entry-series-info'>
                        <Typography>{appearances.name}</Typography>
                        <Typography>{`Role: ${appearances.role}`}</Typography>
                      </Box>
                      <Divider />
                    </Grid>
                  );
                })}
              </Grid>

              <Typography sx={{ paddingBottom: 1, paddingTop: 2 }}>
                Mangaography
              </Typography>
              <Divider />

              {animeCharacter.mangaography.map((appearances) => {
                return (
                  <Grid
                    item
                    classname='character-profile-anime-appearance-entry'
                    sx={{ display: "flex" }}
                  >
                    <Link
                      to='/manga-info'
                      state={{ mangaId: appearances.mal_id }}
                    >
                      <img src={appearances.image_url} alt={appearances.name} />
                    </Link>
                    <Box classname='character-profile-anime-appearance-entry-series-info'>
                      <Typography>{appearances.name}</Typography>
                      <Typography>{`Role: ${appearances.role}`}</Typography>
                    </Box>
                    <Divider />
                  </Grid>
                );
              })}
              <Typography>{`Member Favorites: ${animeCharacter.member_favorites}`}</Typography>
            </Box>
          </Box>
          <Box className='character-info-main-guts'>
            <Typography>{`${animeCharacter.name} (${
              animeCharacter.name_kanji ? animeCharacter.name_kanji : ""
            })`}</Typography>
            <Divider />

            <Box
              className='character-profile-summary'
              sx={{ paddingBottom: 5, whiteSpace: "pre-line" }}
            >
              <Typography>{animeCharacter.about}</Typography>
              <Divider sx={{ paddingTop: 2 }} />
            </Box>

            <Grid
              container
              md={12}
              xs={4}
              rowSpacing={3}
              className='character-profile-voice-actor-info'
            >
              <Typography>Voice Actors</Typography>
              <Divider />
              {animeCharacter.voice_actors.map((actor) => {
                return (
                  <Grid
                    item
                    classname='character-profile-anime-appearance-entry'
                    sx={{ display: "flex" }}
                  >
                    <img src={actor.image_url} alt={actor.name} />
                    <Box
                      classname='character-profile-anime-appearance-entry-actor-info'
                      sx={{ paddingLeft: 2 }}
                    >
                      <Typography>{actor.name}</Typography>
                      <Typography>{`Language: ${actor.language}`}</Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeCharacterPage;
