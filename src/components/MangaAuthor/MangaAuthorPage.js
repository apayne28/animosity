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
import MangaAuthorDetails from "./MangaAuthorDetails";
import ShowMoreText from "react-show-more-text";

function MangaAuthorPage(props) {

  const location = useLocation();
  let authorValue = location.state.voiceActor;
  let actor = authorValue ? authorValue : location.state.authorId;

  const [author, setAuthor] = useState();
  const [authorManga, setAuthorManga] = useState();

  console.log(location);
  const getAuthor = useCallback(async () => {
    // id = props.characterId;

    try {
      const authorData = await fetch(
        `https://api.jikan.moe/v4/people/${actor}`,
      ).then((res) => res.json());

      console.log(authorData);
      let voiceActorResults = authorData;
      setAuthor(voiceActorResults.data);
      console.log(author);
    } catch (error) {
      console.log("Character not found");
    }

    //Get Voice Roles

    try {
      const authorMangaData = await fetch(
        `https://api.jikan.moe/v4/people/${actor}/manga`,
      ).then((res) => res.json());

      console.log(authorMangaData);
      let voiceActorRoleResults = authorMangaData.data;
      setAuthorManga(voiceActorRoleResults);
      console.log(authorManga);
    } catch (error) {
      console.log("Character not found");
    }
  }, [actor, author, authorManga]);

  useEffect(() => {
    if (!author && !author) {
      getAuthor(authorValue);
    }
  }, [author, authorValue, getAuthor]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];

  console.log(author, authorManga);
  if (author && authorManga) {
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
                  src={author.images.jpg.image_url}
                  alt={author.name}
                  sx={{ width: "100%", height: "100%", borderRadius: 1 }}
                />
                <ImageListItemBar
                  title={<Typography>{author.name}</Typography>}
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
              {author.alternate_names.length > 0 ? (
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
                  {author.alternate_names.map((nicknames) => {
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
              >{`${author.favorites.toLocaleString("en-US")}`}</Typography>
            </div>
          </div>
          <div className='anime-character-main-info-container'>
            <div>
              <MangaAuthorDetails
                authorId={actor}
                // charList={filteredVoiceRoles}
                authorMangaList={authorManga}
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
                >{`${author.name} `}</Typography>
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
                  {author.about ? (
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
                          {author.about}
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

                  <Divider />
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
                      to='/manga-author-manga-list'
                      state={{
                        voiceActor: author.mal_id,
                        animeList: authorManga,
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
                      width: `${authorManga.length >= 5 ? "95%" : "60%"}`,
                      margin: `${authorManga.length >= 5 ? "auto" : "auto"}`,
                      marginTop: "2%",
                    }}
                  >
                    <div className='anime-info-character-list'>
                      <Carousel breakPoints={breakPoints}>
                        {authorManga.map((appearances) => {
                          return (
                            <div>
                              <Link
                                to='/manga-info'
                                state={{ mangaId: appearances.manga.mal_id }}
                              >
                                <ImageList cols={1} rowHeight={400}>
                                  <ImageListItem>
                                    <Box
                                      component='img'
                                      src={
                                        appearances.manga.images.jpg.image_url
                                      }
                                      alt={appearances.manga.title}
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 1,
                                      }}
                                    />
                                    <ImageListItemBar
                                      title={appearances.manga.title}
                                      subtitle={`Role: ${appearances.position}`}
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

export default MangaAuthorPage;
