import {
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import { useNavigate, Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";
import AnimeInfoCharacters from "./AnimeInfoCharacters";
import AnimeInfoRecommendedAnime from "./AnimeInfoRecommendedAnime";

const AnimeInfoSideContent = (props) => {
  const [info, setInfo] = useState();
  const [externalLinks, setExternalLinks] = useState();
  const [animeRelations, setAnimeRelations] = useState();
  // const [animeCharacterList, setAnimeCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();

  let navigate = useNavigate();

  // const getAnime = useCallback(async (id) => {
  //   id = props.animeId;
  //   try {
  //     const temp = await fetch(`https://api.jikan.moe/v4/anime/${id}`).then(
  //       (res) => res.json(),
  //     );

  //     let results = temp.data;
  //     console.log(results);
  //     setInfo(results);
  //     return results;
  //   } catch (error) {
  //     console.log("Anime not found");
  //   }
  // }, []);

  const getAnime = useCallback(async (id) => {
    // id = props.animeId;
    try {
      //Grabs Anime Data Object
      const animeData = await fetch(
        `https://api.jikan.moe/v4/anime/${id}`,
      ).then((res) => res.json());

      let animeResults = animeData.data;
      console.log(animeResults);
      setInfo(animeResults);

      // Grabs Related Anime Data
      let relatedAnimeData = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/relations`,
      ).then((res) => res.json());

      let relatedAnimeDataResults = relatedAnimeData.data;
      console.log("RelatedAnime", relatedAnimeDataResults);
      setAnimeRelations(relatedAnimeDataResults);
    } catch (error) {
      console.log("Anime not found");
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
  }, []);

  useEffect(() => {
    if (!info && !animeRelations && !animeRecommendationsList) {
      getAnime(props.animeId).catch(console.error);
    }
  }, [animeRecommendationsList, animeRelations, getAnime, info, props.animeId]);

  // const getExternalAnimeLinks = useCallback(async (id) => {
  //   id = props.animeId;

  //   const temp = await fetch(
  //     `https://api.jikan.moe/v4/anime/${id}/external`,
  //   ).then((res) => res.json());

  //   setExternalLinks(temp.data);
  //   return temp.data;
  // }, []);

  // useEffect(() => {
  //   if (!info) {
  //     getAnime(props.animeId).catch(console.error);
  //   }

  //   // getExternalAnimeLinks(50265).catch(console.error);
  // }, [getAnime, info, props.animeId]);

  if (info && animeRelations && animeRecommendationsList) {
    return (
      <div>
        <div className='anime-info-main'>
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
              <h3>Alternate Titles:</h3>
              {info.title_english && (
                <Typography className='anime-info-alternative-english'>
                  {`English: ${info.title_english}`}
                </Typography>
              )}
              {info.title_japanese && (
                <Typography className='anime-info-alternative-japanese'>
                  {`Japanese: ${info.title_japanese}`}
                </Typography>
              )}
              <Divider sx={{ paddingBottom: "1%", marginBottom: "5%" }} />

              {info.title_synonyms && (
                <div>
                  <h3>Synonyms</h3>

                  {info.title_synonyms.length > 0
                    ? info.title_synonyms.map((altTitles) => (
                        <Typography className='anime-info-title-synonyms'>
                          {altTitles}
                        </Typography>
                      ))
                    : "N/A"}
                </div>
              )}
            </div>
            <div className='anime-info-score'>
              <Typography>{`Score: ${
                info.score ? info.score : "N/A"
              }`}</Typography>
            </div>
            <div className='anime-info-statistics'>
              <h3>Statistics</h3>

              <Typography>{`Ranked: ${
                info.rank ? info.rank : "N/A"
              }`}</Typography>
              <Typography>{`Popularity: ${info.popularity}`}</Typography>
              <Typography>{`Members: ${info.members}`}</Typography>
              <Typography>{`Favorites: ${info.favorites}`}</Typography>
            </div>
            <div className='anime-info-information'>
              <h3>Information</h3>
              <Typography>{`Type: ${info.type}`}</Typography>
              <Typography>{`Episodes: ${
                info.episodes ? info.episodes : "N/A"
              }`}</Typography>
              <Typography>{`Status: ${info.status}`}</Typography>
              <Typography>{`Aired: ${info.aired.string}`}</Typography>
              <Typography>{`Premiered: ${
                info.season && info.year
                  ? `${info.season}. ${info.year}`
                  : "Unknown"
              }`}</Typography>
              <Typography>
                {`Broadcast: ${
                  info.broadcast.string ? info.broadcast.string : "Unknown"
                }`}{" "}
              </Typography>
              <Typography>{`Producers: ${
                info.producers.length > 0
                  ? info.producers.map((producers) =>
                      producers ? ` ${producers.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>
              <Typography>{`Licensors: ${
                info.licensors.length
                  ? info.licensors.map((licensors) =>
                      licensors ? ` ${licensors.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>

              <Typography>{`Studios: ${
                info.studios.length > 0
                  ? info.studios.map((studios) =>
                      studios ? ` ${studios.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>

              <Typography>{`Genres: ${info.genres.map((genres) =>
                genres ? ` ${genres.name} ` : "Unknown",
              )}`}</Typography>
              <Typography>{`Theme: ${
                info.themes.length > 0
                  ? info.themes.map((themes) =>
                      themes ? ` ${themes.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>
              <Typography>{`Demographics: ${
                info.demographics.length > 0
                  ? info.demographics.map((demographics) =>
                      demographics ? ` ${demographics.name} ` : "N/A",
                    )
                  : "Unknown"
              }`}</Typography>
              <Typography>{`Duration: ${
                info.duration ? info.duration : "Unknown"
              }`}</Typography>
              <Typography>{`Rating: ${
                info.rating ? info.rating : "Unknown"
              }`}</Typography>
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
                <div>
                  <ReactPlayer
                    url={info.trailer.url}
                    style={{ display: "flex", margin: "auto", marginTop: "1%" }}
                  />
                </div>
              )}

              <div className='anime-info-main-synopsis'>
                <h3>Synopsis</h3>
                <Typography paragraph>
                  {info.synopsis ? info.synopsis : "N/A"}
                </Typography>
              </div>
              <div className='anime-info-content-guts'>
                <div className='anime-info-main-popularity-container'>
                  <Divider sx={{ pb: 4 }} />
                  <h3>Background</h3>
                  <Typography>
                    {info.background ? info.background : "N/A"}
                  </Typography>
                  <Divider sx={{ pb: 4 }} />

                  <h3>Related Anime</h3>
                  <div className='anime-info-related-anime-container'>
                    {animeRelations.length > 0
                      ? animeRelations.map((info) => {
                          let relatedAnime = info.entry;
                          let relatedAnimeType = info.relation;

                          return relatedAnime.map((single) => {
                            return (
                              <div>
                                <MuiLink
                                  onClick={(e) => {
                                    navigate(
                                      single.type === "anime"
                                        ? "/anime-info"
                                        : "/manga-info",

                                      single.type === "anime"
                                        ? { state: { animeId: single.mal_id } }
                                        : { state: { mangaId: single.mal_id } },
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  <Typography className='anime-info-related-anime-item'>{`${relatedAnimeType}: ${single.name}`}</Typography>
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
                  <h3>Recommended Anime</h3>
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

export default AnimeInfoSideContent;
