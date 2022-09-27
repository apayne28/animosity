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
        // const characterData = await fetch(
        //   `https://api.jikan.moe/v3/character/${characterValue}`,
        // ).then((res) => res.json());

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
        <div className='anime-characters-main' data-testid={`anime-character-main-${animeCharacter.name}`}>
          <div className='anime-character-side-content' data-testid={`anime-character-side-content-${animeCharacter.name}`}>
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
              >{`${animeCharacter.favorites.toLocaleString(
                "en-US",
              )}`}</Typography>
            </div>
          </div>
          <div className='anime-character-main-info-container'>
            <div>
              <CharacterDetails
                characterId={animeCharacter.mal_id}
                voiceActors={animeCharacter.voices}
                animeList={animeCharacter.anime}
                mangaList={animeCharacter.manga}
              />
            </div>
            <div className='anime-info-character-info-content'>
              <div className='anime-character-name-header'>
                {/* <Typography>{`${animeCharacter.name} (${
                  animeCharacter.name_kanji ? animeCharacter.name_kanji : ""
                })`}</Typography> */}
                <Typography
                data-testid={`anime-character-header-${animeCharacter.name}`}
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

                  <Typography sx={{ margin: "1%", fontSize: 22 }}
                  data-testid={`anime-character-${animeCharacter.name}-background`}
                  >
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

                  {animeCharacter.voices.length > 0 && (
                    <div data-testid={`anime-character-${animeCharacter.name}-voice-actor-list`}>
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
                        data-testid={`anime-character-${animeCharacter.name}-voice-actor-list-view-more`}
                          to='/character-page-voice-actor-list'
                          state={{
                            voiceActors: animeCharacter.voices,
                            characterId: animeCharacter.mal_id,

                            animeList: animeCharacter.anime,
                            mangaList: animeCharacter.manga,
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
                            animeCharacter.voices.length >= 1
                              ? "95%"
                              : "50%"
                          }`,
                          margin: `${
                            animeCharacter.voices.length >= 5
                              ? "auto"
                              : "auto"
                          }`,
                          marginTop: "2%",
                        }}
                      >
                        <div className='anime-info-character-list' data-testid={`anime-character-${animeCharacter.name}-voice-actor-carousel`}>
                          <Carousel breakPoints={breakPoints}>
                            {animeCharacter.voices.map((actor) => {
                              return (
                                <div>
                                  <Link
                                  data-testid={`anime-character-${animeCharacter.name}-voice-actor-${actor.person.name}`}
                                    to='/character-voice-actor-page'
                                    state={{ characterValue: actor.person.mal_id }}
                                  >
                                    <ImageList cols={1} rowHeight={400}>
                                      <ImageListItem>
                                        <Box
                                          component='img'
                                          src={actor.person.images.jpg.image_url}
                                          alt={actor.person.name}
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

                  {animeCharacter.anime.length > 0 && (
                    <div data-testid={`anime-character-${animeCharacter.name}-animeography`}>
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
                        data-testid={`anime-character-${animeCharacter.name}-animeography-list-view-more`}
                          to='/character-page-anime-list'
                          state={{
                            voiceActors: animeCharacter.voices,
                            characterId: animeCharacter.mal_id,

                            animeList: animeCharacter.animeo,
                            mangaList: animeCharacter.manga,
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
                            animeCharacter.anime.length >= 3
                              ? "95%"
                              : "60%"
                          }`,
                          margin: `${
                            animeCharacter.anime.length >= 5
                              ? "auto"
                              : "auto"
                          }`,
                          marginTop: "2%",
                        }}
                      >
                        <div className='anime-info-character-list' data-testid={`anime-character-${animeCharacter.name}-animeography-carousel`}>
                          <Carousel breakPoints={breakPoints}>
                            {animeCharacter.anime.map((appearances) => {
                              return (
                                <div>
                                  <Link
                                    to='/anime-info'
                                    state={{ animeId: appearances.anime.mal_id }}
                                    data-testid={`anime-character-${animeCharacter.name}-animeography-${appearances.anime.title}`}
                                  >
                                    <ImageList cols={1} rowHeight={400}>
                                      <ImageListItem>
                                        <Box
                                          component='img'
                                          src={appearances.anime.images.jpg.image_url}
                                          alt={appearances.anime.title}
                                          sx={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 1,
                                          }}
                                        />
                                        <ImageListItemBar
                                          title={appearances.anime.title}
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

                  {animeCharacter.manga.length > 0 && (
                    <Box data-testid={`anime-character-${animeCharacter.name}-mangaography`}>
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
                        data-testid={`anime-character-${animeCharacter.name}-mangaography-view-more`}
                          to='/character-page-manga-list'
                          state={{
                            voiceActors: animeCharacter.voices,
                            characterId: animeCharacter.mal_id,

                            animeList: animeCharacter.anime,
                            mangaList: animeCharacter.manga,
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
                            animeCharacter.manga.length >= 1
                              ? "95%"
                              : "50%"
                          }`,
                          margin: `${
                            animeCharacter.manga.length >= 5
                              ? "auto"
                              : ""
                          }`,
                          marginTop: "2%",
                        }}
                      >
                        <div className='anime-info-character-list' data-testid={`anime-character-${animeCharacter.name}-mangaography-carousel`}>
                          <Carousel breakPoints={breakPoints}>
                            {animeCharacter.manga.map((appearances) => {
                              console.log(appearances)
                              return (
                                <div>
                                  <div className='anime-info-rec-anime-item'>
                                    <div>
                                      <Link
                                      data-testid={`anime-character-${animeCharacter.name}-mangaography-${appearances.manga.title}`}
                                        to='/manga-info'
                                        state={{ mangaId: appearances.manga.mal_id }}
                                      >
                                        <ImageList cols={1} rowHeight={400}>
                                          <ImageListItem>
                                            <Box
                                              component='img'
                                              src={appearances.manga.images.jpg.image_url}
                                              alt={appearances.manga.title}
                                              sx={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 1,
                                              }}
                                            />
                                            <ImageListItemBar
                                              title={appearances.manga.title}
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
