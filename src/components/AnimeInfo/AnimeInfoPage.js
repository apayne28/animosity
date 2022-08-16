import {
  Divider,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";
import AnimeInfoCharacters from "./AnimeInfoCharacters";
import AnimeInfoRecommendedAnime from "./AnimeInfoRecommendedAnime";

const AnimeInfoPage = (props) => {
  const [info, setInfo] = useState();
  // const [animeRelations, setAnimeRelations] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  let navigate = useNavigate();

  const getAnime = useCallback(
    async (id) => {
      try {
        //Grabs Anime Data Object
        const animeData = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/full`,
        ).then((res) => res.json());

        let animeResults = animeData.data;
        console.log(animeResults);
        setInfo(animeResults);
      } catch (error) {
        console.log("Anime not found");
      }

      if (!animeRecommendationsList) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      try {
        let animeRecommendationsData = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/recommendations`,
        ).then((res) => res.json());
        let animeRecommendationsDataResults = animeRecommendationsData.data;

        console.log("Recs", animeRecommendationsDataResults);
        setAnimeRecommendationsList(animeRecommendationsDataResults);
      } catch (error) {
        console.log("Anime Recs not found");
      }
    },
    [animeRecommendationsList],
  );

  useEffect(() => {
    if (!info && !animeRecommendationsList) {
      getAnime(props.animeId).catch(console.error);
    }
  }, [animeRecommendationsList, getAnime, info, props.animeId]);

  if (info && animeRecommendationsList) {
    return (
      <div>
        <NavigationBar />

        <div className='anime-info-main' data-testid={`animosity-anime-page-${info.title}`}>
          <div className='anime-info-side-content'>
            <ImageList cols={1}>
              <ImageListItem>
                <Box
                  component='img'
                  src={info.images.jpg.image_url}
                  alt={info.title}
                  sx={{ width: "100%", height: "100%" }}
                />
                <ImageListItemBar
                  data-testid={`anime-info-page-side-content-title`}
                  title={info.title}
                  subtitle={
                    info.title !== info.title_english && (
                      <Typography sx={{ paddingTop: 1 }}>{`${
                        info.title_english ? info.title_english : ""
                      }`}</Typography>
                    )
                  }
                />
              </ImageListItem>
            </ImageList>
            <div className='anime-info-alternative-titles-container'>
              <Typography
                variant='h3'
                sx={{
                  backgroundColor: "#59C9A5",
                  padding: "2%",
                  borderRadius: "1%",
                  fontSize: 23,
                  opacity: "80%",
                }}
              >
                Alternate Titles:
              </Typography>
              {info.title_english && (
                <Typography
                  className='anime-info-alternative-english'
                  sx={{ padding: "2%", fontSize: 19 }}
                >
                  {`English: ${info.title_english}`}
                </Typography>
              )}
              {info.title_japanese && (
                <Typography
                  className='anime-info-alternative-japanese'
                  sx={{ padding: "2%", fontSize: 19 }}
                >
                  {`Japanese: ${info.title_japanese}`}
                </Typography>
              )}
              <Divider sx={{ paddingBottom: "1%", marginBottom: "5%" }} />

              {info.title_synonyms && (
                <div>
                  <Typography
                    variant='h3'
                    sx={{
                      backgroundColor: "#59C9A5",
                      padding: "2%",
                      borderRadius: "1%",
                      fontSize: 23,
                      opacity: "80%",
                    }}
                  >
                    Synonyms
                  </Typography>

                  {info.title_synonyms.length > 0 ? (
                    info.title_synonyms.map((altTitles) => (
                      <Typography
                        className='anime-info-title-synonyms'
                        sx={{ padding: "2%", fontSize: 19 }}
                      >
                        {altTitles}
                      </Typography>
                    ))
                  ) : (
                    <Typography sx={{ padding: "2%", fontSize: 19 }}>
                      N/A
                    </Typography>
                  )}
                </div>
              )}
            </div>
            <div className='anime-info-score'>
              <Typography
                sx={{
                  backgroundColor: "#59C9A5",
                  padding: "2%",
                  borderRadius: "1%",
                  fontSize: 23,
                  opacity: "80%",
                }}
              >{`Rank: `}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 25 }}>{`${
                info.rank ? info.rank.toLocaleString("en-US") : "N/A"
              }`}</Typography>
            </div>
            <div className='anime-info-score'>
              <Typography
                sx={{
                  backgroundColor: "#59C9A5",
                  padding: "2%",
                  borderRadius: "1%",
                  fontSize: 23,
                  opacity: "80%",
                }}
              >{`Score: `}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 25 }}>{`${
                info.score ? info.score : "N/A"
              }`}</Typography>
            </div>

            <div className='anime-info-information'>
              <Typography
                variant='h3'
                sx={{
                  backgroundColor: "#59C9A5",
                  padding: "2%",
                  borderRadius: "1%",
                  fontSize: 23,
                  opacity: "80%",
                }}
              >
                Information
              </Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Type: ${info.type}`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Episodes: ${
                info.episodes ? info.episodes.toLocaleString("en-US") : "N/A"
              }`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Status: ${info.status}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Aired: ${info.aired.string}`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Premiered: ${
                info.season && info.year
                  ? `${info.season}. ${info.year}`
                  : "Unknown"
              }`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>
                {`Broadcast: ${
                  info.broadcast.string ? info.broadcast.string : "Unknown"
                }`}{" "}
              </Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Producers: ${
                info.producers.length > 0
                  ? info.producers.map((producers) =>
                      producers ? ` ${producers.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Licensors: ${
                info.licensors.length
                  ? info.licensors.map((licensors) =>
                      licensors ? ` ${licensors.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>

              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Studios: ${
                info.studios.length > 0
                  ? info.studios.map((studios) =>
                      studios ? ` ${studios.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>

              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Genres: ${info.genres.map((genres) =>
                genres ? ` ${genres.name} ` : "Unknown",
              )}`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Theme: ${
                info.themes.length > 0
                  ? info.themes.map((themes) =>
                      themes ? ` ${themes.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Demographics: ${
                info.demographics.length > 0
                  ? info.demographics.map((demographics) =>
                      demographics ? ` ${demographics.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Duration: ${
                info.duration ? info.duration : "Unknown"
              }`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Rating: ${
                info.rating ? info.rating : "Unknown"
              }`}</Typography>
            </div>
            <div className='anime-info-statistics'>
              <Typography
                variant='h3'
                sx={{
                  backgroundColor: "#59C9A5",
                  padding: "2%",
                  borderRadius: "1%",
                  fontSize: 23,
                  opacity: "80%",
                }}
              >
                Statistics:
              </Typography>

              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Popularity: ${info.popularity.toLocaleString(
                "en-US",
              )}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Members: ${info.members.toLocaleString("en-US")}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Favorites: ${info.favorites.toLocaleString(
                "en-US",
              )}`}</Typography>
            </div>
          </div>
          <div className='anime-info-main-info-container'>
            <div className='anime-info-main-info-details'>
              <AnimeInfoAnimeDetails
                animeId={info.mal_id}
                animeRecList={animeRecommendationsList}
              />
            </div>
            <div className='anime-info-main-info-content'>
              {info.trailer.url && (
                <div data-testid={`anime-info-page-trailer-${info.title}`}>
                  <ReactPlayer
                    url={info.trailer.url}
                    style={{
                      display: "flex",
                      margin: "auto",
                      marginTop: "1%",
                      marginBottom: "2%",
                    }}
                  />
                </div>
              )}

              <div className='anime-info-main-synopsis'>
                <h3>Synopsis</h3>
                <Typography paragraph sx={{ padding: "1%", fontSize: 19 }}
                data-testid={`anime-info-page-synopsis-text-${info.title}`}
                >
                  {info.synopsis ? info.synopsis : "N/A"}
                </Typography>
              </div>
              <div className='anime-info-content-guts'>
                <div className='anime-info-main-popularity-container' data-testid="animosity-anime-page-background">
                  <Divider sx={{ pb: 4 }} />
                  <h3>Background</h3>
                  <Typography
                    sx={{ padding: "1%", fontSize: 19, paddingLeft: "1%" }}
                    data-testid="animosity-anime-page-background-text"
                  >
                    {info.background ? info.background : "N/A"}
                  </Typography>
                  <Divider sx={{ pb: 4 }} />

                  <h3>Related Anime</h3>
                  <div className='anime-info-related-anime-container' data-testid="animosity-anime-page-related-anime">
                    {info.relations.length > 0
                      ? info.relations.map((info) => {
                          let relatedAnime = info.entry;
                          let relatedAnimeType = info.relation;

                          return relatedAnime.map((single) => {
                            return (
                              <div      data-testid={`animosity-anime-page-related-anime-entry-${single.name}`}>
                                <MuiLink
                                  data-testid={`animosity-anime-page-related-anime-entry-link-${single.name}`}
                                  onClick={(e) => {
                                    navigate(
                                      single.type === "anime"
                                        ? `/anime-info`
                                        : "/manga-info",

                                      single.type === "anime"
                                        ? { state: { animeId: single.mal_id } }
                                        : { state: { mangaId: single.mal_id } },
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  <Typography
                                    className='anime-info-related-anime-item'
                                    sx={{
                                      padding: "0.5%",
                                      fontSize: 19,
                                      paddingLeft: "1%",
                                    }}
                                  >{`${relatedAnimeType}: ${single.name}`}</Typography>
                                </MuiLink>
                              </div>
                            );
                          });
                        })
                      : "N/A"}
                  </div>
                  <Divider sx={{ pb: 4 }} />
                  <AnimeInfoCharacters animeId={info.mal_id} />

                  <Divider sx={{ pb: 4 }} />
                  <AnimeInfoRecommendedAnime animeId={info.mal_id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
};

export default AnimeInfoPage;
