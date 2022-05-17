import {
  Divider,
  Grid,
  Typography,
  Link as MuiLink,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import MangaInfoCharacters from "./MangaInfoCharacters";
import MangaInfoMangaDetails from "./MangaInfoMangaDetails";
import MangaInfoRecommendedManga from "./MangaInfoRecommendedManga";

const MangaInfoSideContent = (props) => {
  const [info, setInfo] = useState();
  const [externalLinks, setExternalLinks] = useState();

  const [mangaRelations, setMangaRelations] = useState();
  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();

  let navigate = useNavigate();

  const getManga = useCallback(
    async (id) => {
      id = props.mangaId;
      console.log(id);
      try {
        //Grabs Manga Data Object
        const mangaData = await fetch(
          `https://api.jikan.moe/v4/manga/${id}`,
        ).then((res) => res.json());

        let mangaResults = mangaData.data;
        console.log(mangaResults);
        setInfo(mangaResults);

        // Grabs Related Manga Data
        let relatedMangaData = await fetch(
          `https://api.jikan.moe/v4/manga/${id}/relations`,
        ).then((res) => res.json());

        let relatedMangaDataResults = relatedMangaData.data;
        console.log("RelatedManga", relatedMangaDataResults);
        setMangaRelations(relatedMangaDataResults);

        // return results;
      } catch (error) {
        console.log("Manga not found");
      }

      try {
        //Grabs Manga Recs
        let mangaRecommendationsData = await fetch(
          `https://api.jikan.moe/v4/manga/${id}/recommendations`,
        ).then((res) => res.json());
        let mangaRecommendationsDataResults = mangaRecommendationsData.data;

        setMangaRecommendationsList(mangaRecommendationsDataResults);
      } catch (error) {
        console.log("Manga Recs not found");
      }
    },
    [props.mangaId],
  );

  useEffect(() => {
    if (!info && !mangaRelations && !mangaRecommendationsList) {
      getManga(props.mangaId).catch(console.error);
    }
  }, [mangaRelations, getManga, info, props.mangaId, mangaRecommendationsList]);

  // const getManga = useCallback(async (id) => {
  //   id = props.mangaId;
  //   try {
  //     const temp = await fetch(`https://api.jikan.moe/v4/manga/${id}`).then(
  //       (res) => res.json(),
  //     );

  //     let results = temp.data;
  //     console.log(results);
  //     setInfo(results);
  //     return results;
  //   } catch (error) {
  //     console.log("Manga not found");
  //   }
  // }, []);

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
  //     getManga(props.mangaId).catch(console.error);
  //   }

  //   // getExternalAnimeLinks(50265).catch(console.error);
  // }, [getManga, info, props.mangaId]);

  if (info && mangaRelations) {
    return (
      <div>
        <div className='manga-info-main'>
          <div className='anime-info-side-content'>
            <ImageList cols={1}>
              <ImageListItem>
                <Box
                  component='img'
                  src={info.images.jpg.image_url}
                  alt={info.title}
                  sx={{ width: "100%", height: "100%", borderRadius: 1 }}
                />
                <ImageListItemBar
                  title={info.title}
                  subtitle={
                    info.title !== info.title_english && (
                      <Typography
                        sx={{ paddingTop: 1 }}
                      >{`(${info.title_english})`}</Typography>
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
              >{`Score: `}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 25 }}>{`${
                info.score ? info.score : "N/A"
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
              >{`Rank: `}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 25 }}>{`${
                info.rank ? info.rank : "N/A"
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
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Volumes: ${
                info.volumes ? info.volumes : "N/A"
              }`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Chapters: ${
                info.chapters ? info.chapters : "N/A"
              }`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Status: ${info.status}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Published: ${info.published.string}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Genres: ${info.genres.map((genres) =>
                genres ? ` ${genres.name} ` : "N/A",
              )}`}</Typography>
              <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Theme: ${
                info.themes > 0
                  ? info.themes.map((themes) =>
                      themes ? ` ${themes.name} ` : "N/A",
                    )
                  : "N/A"
              }`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Demographics: ${
                info.demographics > 0
                  ? info.demographics.map((demographics) =>
                      demographics ? ` ${demographics.name} ` : "N/A",
                    )
                  : "N/A"
              }`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Serializations: ${info.serializations.map((serialization) =>
                serialization ? ` ${serialization.name} ` : "N/A",
              )}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Author(s): ${info.authors.map((authors) =>
                authors ? ` ${authors.name} ` : "N/A",
              )}`}</Typography>
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
              >{`Popularity: ${info.popularity}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Members: ${info.members}`}</Typography>
              <Typography
                sx={{ padding: "2%", fontSize: 19 }}
              >{`Favorites: ${info.favorites}`}</Typography>
            </div>
          </div>
          <div className='manga-info-main-info-container'>
            <div className='anime-info-main-info-details'>
              <MangaInfoMangaDetails
                mangaId={info.mal_id}
                mangaRecList={mangaRecommendationsList}
              />
            </div>
            <div className='anime-info-main-info-content'>
              <div className='anime-info-content-guts'>
                <div className='anime-info-main-popularity-container'>
                  <Box sx={{ marginTop: "0%" }}>
                    <h3>Synopsis</h3>
                    <Typography paragraph sx={{ padding: "1%", fontSize: 19 }}>
                      {info.synopsis ? info.synopsis : "N/A"}
                    </Typography>
                  </Box>
                  <h3>Background</h3>
                  <Typography
                    sx={{ padding: "1%", fontSize: 19, paddingLeft: "1%" }}
                  >
                    {info.background ? info.background : "N/A"}
                  </Typography>
                  <Divider sx={{ pb: 4 }} />

                  <h3>Related Manga</h3>
                  <div className='anime-info-related-anime-container'>
                    {mangaRelations.length > 0
                      ? mangaRelations.map((info) => {
                          let relatedAnime = info.entry;
                          let relatedAnimeType = info.relation;
                          console.log(info);
                          return relatedAnime.map((single) => {
                            console.log(single);
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

                  <MangaInfoCharacters mangaId={info.mal_id} />

                  <Divider sx={{ pb: 4 }} />
                  <MangaInfoRecommendedManga mangaId={info.mal_id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MangaInfoSideContent;
