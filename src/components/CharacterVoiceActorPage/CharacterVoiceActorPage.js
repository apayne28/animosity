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
import VoiceActorDetails from "./VoiceActorDetails";
import ShowMoreText from "react-show-more-text";

function CharacterVoiceActorPage(props) {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  const location = useLocation();
  let characterValue = location.state.characterValue;
  let actor = characterValue ? characterValue : location.state.voiceActor;

  const [voiceActor, setVoiceActor] = useState();
  const [voiceRoles, setVoiceRoles] = useState();

  console.log(location);
  const getVoiceActor = useCallback(async () => {
    // id = props.characterId;

    try {
      const voiceActorData = await fetch(
        `https://api.jikan.moe/v4/people/${actor}`,
      ).then((res) => res.json());

      console.log(voiceActorData);
      let voiceActorResults = voiceActorData;
      setVoiceActor(voiceActorResults.data);
      console.log(voiceActor);
    } catch (error) {
      console.log("Character not found");
    }

    //Get Voice Roles

    try {
      const voiceActorRoleData = await fetch(
        `https://api.jikan.moe/v4/people/${actor}/voices`,
      ).then((res) => res.json());

      console.log(voiceActorRoleData);
      let voiceActorRoleResults = voiceActorRoleData.data;
      setVoiceRoles(voiceActorRoleResults);
      console.log(voiceRoles);
    } catch (error) {
      console.log("Character not found");
    }
  }, [actor, voiceActor, voiceRoles]);

  useEffect(() => {
    if (!voiceActor && !voiceRoles) {
      getVoiceActor(characterValue);
    }
  }, [characterValue, getVoiceActor, voiceActor, voiceRoles]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];

  let filteredVoiceRoles;
  let filteredAnime;

  if (voiceRoles) {
    filteredVoiceRoles = voiceRoles.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.character.name === value.character.name &&
            t.name === value.character.anime,
        ),
    );

    filteredAnime = filteredVoiceRoles.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.anime.title === value.anime.title &&
            t.anime.title === value.anime.title,
        ),
    );
  }
  console.log(filteredVoiceRoles, filteredAnime);
  if (voiceActor && filteredVoiceRoles) {
    return (
      <div>
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
                  src={voiceActor.images.jpg.image_url}
                  alt={voiceActor.name}
                  sx={{ width: "100%", height: "100%", borderRadius: 1 }}
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

            <div className='anime-characters-nickname-container'>
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
          <div className='anime-character-main-info-container'>
            <div>
              <VoiceActorDetails
                animeId={actor}
                charList={filteredVoiceRoles}
                animeRecList={filteredAnime}
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
                >{`${voiceActor.name} `}</Typography>
              </div>

              <div className='anime-info-content-guts'>
                <div className='anime-info-main-popularity-container'>
                  {/* <Accordion flush>
                    <Accordion.Item>
                      <Accordion.Header>
                        <Typography variant='h3'>Background</Typography>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Typography
                          variant='body2'
                          sx={{
                            fontSize: 18,
                            width: "90%",
                            padding: "2%",
                            whiteSpace: "pre-line",
                            // margin: "auto",
                          }}
                        >
                          {animeCharacter.about}
                        </Typography>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion> */}
                  <h3>Background</h3>
                  {voiceActor.about ? (
                    <div>
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
                          {voiceActor.about}
                        </ShowMoreText>
                      </Typography>
                    </div>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "#ffffff",
                        // display: "flex",
                        // justifyContent: "space-between",
                        // paddingRight: "2.5%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 20,
                          paddingBottom: "2%",
                          marginLeft: " 1%",
                          marginTop: " 2%",
                        }}
                      >
                        N/A
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      backgroundColor: "#56e39f",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingRight: "2.5%",
                    }}
                  >
                    <h3>Roles</h3>
                    <Link
                      to='/voice-actor-role-list-page'
                      state={{
                        roleList: filteredVoiceRoles,
                        voiceActor: voiceActor.mal_id,
                        animeList: filteredAnime,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          // padding: "0.5%",
                          fontSize: 29,
                          // display: "flex",
                          // justifyContent: "flex-end",
                          marginTop: "17%",
                          // marginRight: "1%",
                        }}
                      >
                        {/* <Typography sx={{ padding: "0.5%", fontSize: 19, display: 'flex' }}> */}
                        View More
                      </Typography>
                    </Link>
                  </Box>

                  <div
                    className='anime-character-voice-actors'
                    style={{
                      width: `${
                        filteredVoiceRoles.length >= 1 ? "95%" : "50%"
                      }`,
                      margin: `${
                        filteredVoiceRoles.length >= 5 ? "auto" : "auto"
                      }`,
                      marginTop: "2%",
                    }}
                  >
                    <div className='anime-info-character-list'>
                      <Carousel breakPoints={breakPoints}>
                        {filteredVoiceRoles.map((actor) => {
                          console.log(actor.character);
                          return (
                            <div>
                              <ImageList cols={1} rowHeight={400}>
                                <Link
                                  to='/character-profile'
                                  state={{
                                    roleList: filteredVoiceRoles,
                                    voiceActor: voiceActor.mal_id,
                                    animeList: filteredAnime,
                                    characterId: actor.character.mal_id,
                                  }}
                                >
                                  <ImageListItem>
                                    <Box
                                      component='img'
                                      src={actor.character.images.jpg.image_url}
                                      alt={actor.character.name}
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 1,
                                      }}
                                    />
                                    <ImageListItemBar
                                      title={
                                        <Typography>
                                          {actor.character.name}
                                        </Typography>
                                      }
                                      subtitle={
                                        <Typography>{`Role: ${actor.role}`}</Typography>
                                      }
                                    />
                                  </ImageListItem>
                                </Link>
                              </ImageList>
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>
                  </div>

                  <Divider />
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
                      to='/voice-actor-anime-list-page'
                      state={{
                        roleList: filteredVoiceRoles,
                        voiceActor: voiceActor.mal_id,
                        animeList: filteredAnime,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          // padding: "0.5%",
                          fontSize: 29,
                          // display: "flex",
                          // justifyContent: "flex-end",
                          marginTop: "17%",
                          // marginRight: "1%",
                        }}
                      >
                        {/* <Typography sx={{ padding: "0.5%", fontSize: 19, display: 'flex' }}> */}
                        View More
                      </Typography>
                    </Link>
                  </Box>

                  <div
                    className='anime-character-voice-actors'
                    style={{
                      width: `${filteredAnime.length >= 5 ? "95%" : "60%"}`,
                      margin: `${filteredAnime.length >= 5 ? "auto" : "auto"}`,
                      marginTop: "2%",
                    }}
                  >
                    <div className='anime-info-character-list'>
                      <Carousel breakPoints={breakPoints}>
                        {filteredAnime.map((appearances) => {
                          return (
                            <div>
                              <Link
                                to='/anime-info'
                                state={{ animeId: appearances.anime.mal_id }}
                              >
                                <ImageList cols={1} rowHeight={400}>
                                  <ImageListItem>
                                    <Box
                                      component='img'
                                      src={
                                        appearances.anime.images.jpg.image_url
                                      }
                                      alt={appearances.anime.title}
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 1,
                                      }}
                                    />
                                    <ImageListItemBar
                                      title={appearances.anime.title}
                                      //   subtitle={`Role: ${appearances.role}`}
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

export default CharacterVoiceActorPage;
