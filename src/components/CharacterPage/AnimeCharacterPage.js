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

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3, itemsToScroll: 3 },
    // { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },

    { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
  ];

  if (animeCharacter) {
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
                  src={animeCharacter.image_url}
                  alt={animeCharacter.name}
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
              >{`${animeCharacter.member_favorites}`}</Typography>
            </div>
          </div>
          <div className='anime-character-main-info-container'>
            <div className='anime-info-character-info-content'>
              <div className='anime-character-name-header'>
                {/* <Typography>{`${animeCharacter.name} (${
                  animeCharacter.name_kanji ? animeCharacter.name_kanji : ""
                })`}</Typography> */}
                <Typography
                  variant='h3'
                  sx={{ fontSize: 26, marginTop: "1%", marginBottom: "1%" }}
                >{`${animeCharacter.name} ${
                  animeCharacter.name_kanji
                    ? `(${animeCharacter.name_kanji})`
                    : ""
                }`}</Typography>
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
                  <Divider sx={{ paddingTop: 2 }} />

                  <h3>Voice Actors</h3>

                  <div
                    className='anime-character-voice-actors'
                    style={{
                      width: `${
                        animeCharacter.voice_actors.length >= 1 ? "95%" : "50%"
                      }`,
                      margin: `${
                        animeCharacter.voice_actors.length >= 5 ? "auto" : ""
                      }`,
                    }}
                  >
                    <Grid
                      container
                      xs={1}
                      sm={5}
                      md={12}
                      // className='anime-info-character-list'
                      // sx={{ display: "flex", margin: "auto" }}
                    >
                      <Carousel breakPoints={breakPoints}>
                        {animeCharacter.voice_actors.map((actor) => {
                          return (
                            <div>
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
                                      <Typography>{actor.name}</Typography>
                                    }
                                    subtitle={
                                      <Typography>{`Language: ${actor.language}`}</Typography>
                                    }
                                  />
                                </ImageListItem>
                              </ImageList>
                            </div>
                          );
                        })}
                      </Carousel>
                    </Grid>
                  </div>

                  <Divider />

                  <h3>Animeography</h3>
                  <div
                    className='anime-character-voice-actors'
                    style={{
                      width: `${
                        animeCharacter.voice_actors.length >= 1 ? "95%" : "50%"
                      }`,
                      margin: `${
                        animeCharacter.voice_actors.length >= 5 ? "auto" : ""
                      }`,
                    }}
                  >
                    <Grid
                      container
                      xs={1}
                      md={12}
                      sx={{ display: "flex", margin: "auto" }}

                      // className='anime-info-character-list'
                    >
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
                    </Grid>
                  </div>
                  <h3>Mangaography</h3>

                  <div
                    className='anime-character-voice-actors'
                    style={{
                      width: `${
                        animeCharacter.voice_actors.length >= 1 ? "95%" : "50%"
                      }`,
                      margin: `${
                        animeCharacter.voice_actors.length >= 5 ? "auto" : ""
                      }`,
                    }}
                  >
                    <Grid
                      container
                      xs={1}
                      md={12}
                      // className='anime-info-character-list'
                    >
                      <Carousel breakPoints={breakPoints}>
                        {animeCharacter.mangaography.map((appearances) => {
                          return (
                            //  <Grid
                            //    item
                            //    classname='character-profile-anime-appearance-entry'
                            //    sx={{ display: "flex" }}
                            //  >
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

                                {/* <Divider /> */}
                                {/*</Grid>*/}
                              </div>
                            </div>
                          );
                        })}
                      </Carousel>
                    </Grid>
                  </div>
                  <Divider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <Box>
      //   <div className='header-content'>
      //     <Header />

      //     <NavigationBar />
      //   </div>
      //   <div className='anime-info-main'>
      //     <div className="'anime-info-side-content">
      //       {/* <Box
      //         classname='character-profile-side-bar'
      //         sx={{ backgroundColor: "pink" }}
      //       > */}
      //       <ImageList cols={1}>
      //         <ImageListItem>
      //           <Box
      //             component='img'
      //             src={animeCharacter.image_url}
      //             alt={animeCharacter.name}
      //           />
      //           <ImageListItemBar
      //             title={animeCharacter.name}
      //             subtitle={`${
      //               animeCharacter.name_kanji
      //                 ? `${animeCharacter.name_kanji}`
      //                 : ""
      //             }`}
      //           />
      //         </ImageListItem>
      //       </ImageList>
      //       <div className='anime-info-alternative-titles-container'>
      //         {animeCharacter.nicknames.length > 0 ? (
      //           <Grid item sx={{ paddingBottom: 5 }}>
      //             <Typography>Nicknames:</Typography>
      //             {animeCharacter.nicknames.map((nicknames) => {
      //               return <Typography>{nicknames}</Typography>;
      //             })}
      //           </Grid>
      //         ) : (
      //           ""
      //         )}
      //       </div>
      //       <Box classname='character-profile-character-appearances'>
      //         <Typography sx={{ paddingBottom: 1 }}>Animeography</Typography>
      //         <Divider />
      //         {/*
      //         <ImageList cols={2} rowHeight={200}>
      //           {animeCharacter.animeography.map((appearances) => {
      //             return (
      //               <Box>
      //                 <Link
      //                   to='/anime-info'
      //                   state={{ animeId: appearances.mal_id }}
      //                 >
      //                   <div>
      //                     <ImageListItem>
      //                       <img
      //                         src={appearances.image_url}
      //                         alt={appearances.name}
      //                       />
      //                       <ImageListItemBar
      //                         title={appearances.name}
      //                         subtitle={`Role: ${appearances.role}`}
      //                       />
      //                     </ImageListItem>
      //                   </div>
      //                 </Link>

      //                 <Divider />
      //               </Box>
      //             );
      //           })}
      //         </ImageList>

      //         <Typography sx={{ paddingBottom: 1, paddingTop: 2 }}>
      //           Mangaography
      //         </Typography>
      //         <Divider />
      //         <ImageList cols={1}>
      //           {animeCharacter.mangaography.map((appearances) => {
      //             return (
      //               <Grid
      //                 item
      //                 classname='character-profile-anime-appearance-entry'
      //                 sx={{ display: "flex" }}
      //               >
      //                 <Link
      //                   to='/manga-info'
      //                   state={{ mangaId: appearances.mal_id }}
      //                 >
      //                   <ImageListItem>
      //                     <img
      //                       src={appearances.image_url}
      //                       alt={appearances.name}
      //                     />
      //                     <ImageListItemBar
      //                       title={appearances.name}
      //                       subtitle={`Role: ${appearances.role}`}
      //                     />
      //                   </ImageListItem>
      //                 </Link>

      //                 <Divider />
      //               </Grid>
      //             );
      //           })}
      //         </ImageList> */}

      //         <Typography>{`Member Favorites: ${animeCharacter.member_favorites}`}</Typography>
      //       </Box>
      //       {/* </Box> */}
      //     </div>

      //     <Box className='character-info-main-guts'>
      //       <Typography>{`${animeCharacter.name} (${
      //         animeCharacter.name_kanji ? animeCharacter.name_kanji : ""
      //       })`}</Typography>
      //       <Divider />

      //       {/* <Box
      //         className='character-profile-summary'
      //         sx={{ paddingBottom: 5, whiteSpace: "pre-line" }}
      //       >
      //         <Typography>{animeCharacter.about}</Typography>
      //         <Divider sx={{ paddingTop: 2 }} />
      //       </Box> */}
      //       <div className='anime-info-synopsis'>
      //         <Typography>{animeCharacter.about}</Typography>
      //         <Divider sx={{ paddingTop: 2 }} />
      //       </div>

      //       <Grid
      //         container
      //         md={12}
      //         xs={4}
      //         rowSpacing={3}
      //         className='character-profile-voice-actor-info'
      //       >
      //         <Typography>Anime</Typography>
      //         <ImageList cols={10} rowHeight={400}>
      //           {animeCharacter.animeography.map((appearances) => {
      //             return (
      //               <Box>
      //                 <Link
      //                   to='/anime-info'
      //                   state={{ animeId: appearances.mal_id }}
      //                 >
      //                   <div>
      //                     <ImageListItem>
      //                       <img
      //                         src={appearances.image_url}
      //                         alt={appearances.name}
      //                       />
      //                       <ImageListItemBar
      //                         title={appearances.name}
      //                         subtitle={`Role: ${appearances.role}`}
      //                       />
      //                     </ImageListItem>
      //                   </div>
      //                 </Link>

      //                 <Divider />
      //               </Box>
      //             );
      //           })}
      //         </ImageList>
      //       </Grid>

      //       <Grid
      //         container
      //         md={12}
      //         xs={4}
      //         rowSpacing={3}
      //         className='character-profile-voice-actor-info'
      //       >
      //         <Typography sx={{ paddingBottom: 1, paddingTop: 2 }}>
      //           Mangaography
      //         </Typography>
      //         <Divider />
      //         <ImageList cols={1}>
      //           {animeCharacter.mangaography.map((appearances) => {
      //             return (
      //               <Grid
      //                 item
      //                 classname='character-profile-anime-appearance-entry'
      //                 sx={{ display: "flex" }}
      //               >
      //                 <Link
      //                   to='/manga-info'
      //                   state={{ mangaId: appearances.mal_id }}
      //                 >
      //                   <ImageListItem>
      //                     <img
      //                       src={appearances.image_url}
      //                       alt={appearances.name}
      //                     />
      //                     <ImageListItemBar
      //                       title={appearances.name}
      //                       subtitle={`Role: ${appearances.role}`}
      //                     />
      //                   </ImageListItem>
      //                 </Link>
      //                 {/* <Box classname='character-profile-anime-appearance-entry-series-info'>
      //                   <Typography>{appearances.name}</Typography>
      //                   <Typography>{`Role: ${appearances.role}`}</Typography>
      //                 </Box> */}
      //                 <Divider />
      //               </Grid>
      //             );
      //           })}
      //         </ImageList>
      //       </Grid>

      //       <Grid
      //         container
      //         md={12}
      //         xs={4}
      //         rowSpacing={3}
      //         className='character-profile-voice-actor-info'
      //       >
      //         <Typography>Voice Actors</Typography>
      //         <Divider />
      //         <ImageList cols={5} rowHeight={400}>
      //           {animeCharacter.voice_actors.map((actor) => {
      //             return (
      //               <Grid
      //                 item
      //                 classname='character-profile-anime-appearance-entry'
      //               >
      //                 <ImageListItem>
      //                   <img src={actor.image_url} alt={actor.name} />
      //                   <ImageListItemBar
      //                     title={actor.name}
      //                     subtitle={`Language: ${actor.language}`}
      //                   />
      //                 </ImageListItem>
      //                 {/* <Box
      //                   classname='character-profile-anime-appearance-entry-actor-info'
      //                   sx={{ paddingLeft: 2 }}
      //                 >
      //                   <Typography>{actor.name}</Typography>
      //                   <Typography>{`Language: ${actor.language}`}</Typography>
      //                 </Box> */}
      //               </Grid>
      //             );
      //           })}
      //         </ImageList>
      //       </Grid>
      //     </Box>
      //   </div>
      // </Box>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeCharacterPage;
