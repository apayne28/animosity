import {
  Box,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";

const MangaInfoSideContent = (props) => {
  const [info, setInfo] = useState();
  const [externalLinks, setExternalLinks] = useState();

  const getManga = useCallback(async (id) => {
    id = props.mangaId;
    try {
      const temp = await fetch(`https://api.jikan.moe/v4/manga/${id}`).then(
        (res) => res.json(),
      );

      let results = temp.data;
      console.log(results);
      setInfo(results);
      return results;
    } catch (error) {
      console.log("Manga not found");
    }
  }, []);

  // const getExternalAnimeLinks = useCallback(async (id) => {
  //   id = props.animeId;

  //   const temp = await fetch(
  //     `https://api.jikan.moe/v4/anime/${id}/external`,
  //   ).then((res) => res.json());

  //   setExternalLinks(temp.data);
  //   return temp.data;
  // }, []);

  useEffect(() => {
    if (!info) {
      getManga(props.mangaId).catch(console.error);
    }

    // getExternalAnimeLinks(50265).catch(console.error);
  }, [getManga, info, props.mangaId]);

  if (info) {
    return (
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
            info.rank ? info.rank.toLocaleString("en-US") : "N/A"
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
            info.volumes ? info.volumes.toLocaleString("en-US") : "N/A"
          }`}</Typography>
          <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Chapters: ${
            info.chapters ? info.chapters.toLocaleString("en-US") : "N/A"
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
          <Typography sx={{ padding: "2%", fontSize: 19 }}>{`Demographics: ${
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
          >{`Popularity: ${info.popularity.toLocaleString(
            "en-US",
          )}`}</Typography>
          <Typography
            sx={{ padding: "2%", fontSize: 19 }}
          >{`Members: ${info.members.toLocaleString("en-US")}`}</Typography>
          <Typography
            sx={{ padding: "2%", fontSize: 19 }}
          >{`Favorites: ${info.favorites.toLocaleString("en-US")}`}</Typography>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MangaInfoSideContent;
