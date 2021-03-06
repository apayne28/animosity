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
import { Link, useLocation } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import Carousel from "react-elastic-carousel";
import CharacterDetails from "./CharacterDetails";
import ShowMoreText from "react-show-more-text";

function AnimeCharacterPage(props) {
  // const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
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

  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];

  console.log(animeCharacter, location);
  if (animeCharacter) {
    return (
      <div style={{ height: "100vh" }}>
        <Box>
          <div className='header-content'>
            {/* <Header /> */}
            <NavigationBar />
          </div>
        </Box>
        <div className='anime-characters-main'>
          <div className='anime-character-side-content'>
            <ImageList cols={1}>
              <ImageListItem>
                <Box
                  component='img'
                  src={animeCharacter.image_url}
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
              >{`${animeCharacter.member_favorites.toLocaleString(
                "en-US",
              )}`}</Typography>
            </div>
          </div>
          <div className='anime-character-main-info-container'>
            <div>
              <CharacterDetails
                characterId={animeCharacter.mal_id}
                voiceActors={animeCharacter.voice_actors}
                animeList={animeCharacter.animeography}
                mangaList={animeCharacter.mangaography}
              />
            </div>
            <div className='anime-info-character-info-content'>
              <div className='anime-character-name-header'>
                {/* <Typography>{`${animeCharacter.name} (${
                  animeCharacter.name_kanji ? animeCharacter.name_kanji : ""
                })`}</Typography> */}
                <Typography
                  variant='h3'
                  sx={{
                    fontSize: 26,
                    marginTop: "1%",
                    marginBottom: "1%",
                    marginLeft: "1%",
                  }}
                >{`${animeCharacter.name} ${
                  animeCharacter.name_kanji
                    ? `(${animeCharacter.name_kanji})`
                    : ""
                }`}</Typography>
              </div>

              <div className='anime-info-content-guts'>
                <div className='anime-info-main-popularity-container'>
                  <h3>Background</h3>

                  <Typography sx={{ margin: "1%", fontSize: 22 }}>
                    <ShowMoreText
                      lines={15}
                      more='Show more'
                      less='Show less'
                      expanded={false}
                      width={0}
                      truncatedEndingComponent={"... "}
                      keepNewLines={true}
                      style={{ fontSize: "80" }}
                    >
                      {animeCharacter.about}
                    </ShowMoreText>
                  </Typography>

                  <Divider sx={{ paddingTop: 2 }} />

                  {animeCharacter.voice_actors.length > 0 && (
                    <div>
                      <Box
                        sx={{
                          backgroundColor: "#56e39f",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingRight: "2.5%",
                        }}
                      >
                        <h3>Voice Actors</h3>
                        <Link
                          to='/character-page-voice-actor-list'
                          state={{
                            voiceActors: animeCharacter.voice_actors,
                            characterId: animeCharacter.mal_id,

                            animeList: animeCharacter.animeography,
                            mangaList: animeCharacter.mangaography,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            sx={{
                              fontSize: 29,
                              marginTop: "17%",
                            }}
                          >
                            View More
                          </Typography>
                        </Link>
                      </Box>
                      <div
                        className='anime-character-voice-actors'
                        style={{
                          width: `${
                            animeCharacter.voice_actors.length >= 1
                              ? "95%"
                              : "50%"
                          }`,
                          margin: `${
                            animeCharacter.voice_actors.length >= 5
                              ? "auto"
                              : "auto"
                          }`,
                          marginTop: "2%",
                        }}
                      >
                        <div className='anime-info-character-list'>
                          <Carousel breakPoints={breakPoints}>
                            {animeCharacter.voice_actors.map((actor) => {
                              return (
                                <div>
                                  <Link
                                    to='/character-voice-actor-page'
                                    state={{ characterValue: actor.mal_id }}
                                  >
                                    <ImageList cols={1} rowHeight={400}>
                                      <ImageListItem>
                                        <Box
                                          component='img'
                                          src={actor.image_url}
                                          alt={actor.name}
                                          sx={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 1,
                                          }}
                                        />
                                        <ImageListItemBar
                                          title={
                                            <Typography>
                                              {actor.name}
                                            </Typography>
                                          }
                                          subtitle={
                                            <Typography>{`Language: ${actor.language}`}</Typography>
                                          }
                                        />
                                      </ImageListItem>
                                    </ImageList>
                                  </Link>
                                </div>
                              );
                            })}
                          </Carousel>
                        </div>
                      </div>

                      <Divider />
                    </div>
                  )}

                  {animeCharacter.animeography.length > 0 && (
                    <div>
                      <Box
                        sx={{
                          backgroundColor: "#56e39f",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingRight: "2.5%",
                        }}
                      >
                        <h3>Animeography</h3>

                        <Link
                          to='/character-page-anime-list'
                          state={{
                            voiceActors: animeCharacter.voice_actors,
                            characterId: animeCharacter.mal_id,

                            animeList: animeCharacter.animeography,
                            mangaList: animeCharacter.mangaography,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            sx={{
                              fontSize: 29,

                              marginTop: "17%",
                            }}
                          >
                            View More
                          </Typography>
                        </Link>
                      </Box>
                      <div
                        className='anime-character-voice-actors'
                        style={{
                          width: `${
                            animeCharacter.animeography.length >= 3
                              ? "95%"
                              : "60%"
                          }`,
                          margin: `${
                            animeCharacter.animeography.length >= 5
                              ? "auto"
                              : "auto"
                          }`,
                          marginTop: "2%",
                        }}
                      >
                        <div className='anime-info-character-list'>
                          <Carousel breakPoints={breakPoints}>
                            {animeCharacter.animeography.map((appearances) => {
                              return (
                                <div>
                                  <Link
                                    to='/anime-info'
                                    state={{ animeId: appearances.mal_id }}
                                  >
                                    <ImageList cols={1} rowHeight={400}>
                                      <ImageListItem>
                                        <Box
                                          component='img'
                                          src={appearances.image_url}
                                          alt={appearances.name}
                                          sx={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 1,
                                          }}
                                        />
                                        <ImageListItemBar
                                          title={appearances.name}
                                          subtitle={`Role: ${appearances.role}`}
                                        />
                                      </ImageListItem>
                                    </ImageList>
                                  </Link>
                                </div>
                              );
                            })}
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  )}

                  {animeCharacter.mangaography.length > 0 && (
                    <Box>
                      <Box
                        sx={{
                          backgroundColor: "#56e39f",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingRight: "2.5%",
                        }}
                      >
                        <h3>Mangaography</h3>

                        <Link
                          to='/character-page-manga-list'
                          state={{
                            voiceActors: animeCharacter.voice_actors,
                            characterId: animeCharacter.mal_id,

                            animeList: animeCharacter.animeography,
                            mangaList: animeCharacter.mangaography,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            sx={{
                              fontSize: 29,

                              marginTop: "17%",
                            }}
                          >
                            View More
                          </Typography>
                        </Link>
                      </Box>

                      <div
                        className='anime-character-voice-actors'
                        style={{
                          width: `${
                            animeCharacter.mangaography.length >= 1
                              ? "95%"
                              : "50%"
                          }`,
                          margin: `${
                            animeCharacter.mangaography.length >= 5
                              ? "auto"
                              : ""
                          }`,
                          marginTop: "2%",
                        }}
                      >
                        <div className='anime-info-character-list'>
                          <Carousel breakPoints={breakPoints}>
                            {animeCharacter.mangaography.map((appearances) => {
                              return (
                                <div>
                                  <div className='anime-info-rec-anime-item'>
                                    <div>
                                      <Link
                                        to='/manga-info'
                                        state={{ mangaId: appearances.mal_id }}
                                      >
                                        <ImageList cols={1} rowHeight={400}>
                                          <ImageListItem>
                                            <Box
                                              component='img'
                                              src={appearances.image_url}
                                              alt={appearances.name}
                                              sx={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 1,
                                              }}
                                            />
                                            <ImageListItemBar
                                              title={appearances.name}
                                              subtitle={`Role: ${appearances.role}`}
                                            />
                                          </ImageListItem>
                                        </ImageList>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </Carousel>
                        </div>
                      </div>
                    </Box>
                  )}

                  <Divider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeCharacterPage;
