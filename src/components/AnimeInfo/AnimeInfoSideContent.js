import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";

const AnimeInfoSideContent = (props) => {
  const [info, setInfo] = useState();
  const [externalLinks, setExternalLinks] = useState();

  const getAnime = useCallback(async (id) => {
    id = props.animeId;
    try {
      const temp = await fetch(`https://api.jikan.moe/v4/anime/${id}`).then(
        (res) => res.json(),
      );

      let results = temp.data;
      console.log(results);
      setInfo(results);
      return results;
    } catch (error) {
      console.log("Anime not found");
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
      getAnime(props.animeId).catch(console.error);
    }

    // getExternalAnimeLinks(50265).catch(console.error);
  }, [getAnime, info, props.animeId]);

  if (info) {
    return (
      <div className='anime-info-side-content'>
        <Typography className='anime-info-title-header'>
          {info.title}
          {info.title !== info.title_english && (
            <Typography
              sx={{ paddingTop: 1 }}
            >{`(${info.title_english})`}</Typography>
          )}
        </Typography>
        <img src={info.images.jpg.image_url} alt={info.title} />
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
          {info.title_synonyms && (
            <div>
              <h3>Synonyms</h3>
              {info.title_synonyms > 0
                ? info.title_synonyms.map((altTitles) => (
                    <Typography className='anime-info-title-synonyms'>
                      {altTitles}
                    </Typography>
                  ))
                : "N/A"}
            </div>
          )}
        </div>
        <div className='anime-info-information'>
          <h3>Information</h3>
          <Typography>{`Type: ${info.type}`}</Typography>
          <Typography>{`Episodes: ${
            info.episodes ? info.episodes : "N/A"
          }`}</Typography>
          <Typography>{`Status: ${info.status}`}</Typography>
          <Typography>{`Aired: ${info.aired.string}`}</Typography>
          <Typography>{`Premiered: ${info.season}. ${info.year}`}</Typography>
          <Typography>{`Broadcast: ${info.broadcast.string}`}</Typography>
          <Typography>{`Producers: ${info.producers.map((producers) =>
            producers ? ` ${producers.name} ` : "N/A",
          )}`}</Typography>
          <Typography>{`Licensors: ${info.licensors.map((licensors) =>
            licensors ? ` ${licensors.name} ` : "N/A",
          )}`}</Typography>

          <Typography>{`Studios: ${
            info.studios > 0
              ? info.studios.map((studios) =>
                  studios ? ` ${studios.name} ` : "N/A",
                )
              : "N/A"
          }`}</Typography>

          <Typography>{`Genres: ${info.genres.map((genres) =>
            genres ? ` ${genres.name} ` : "N/A",
          )}`}</Typography>
          <Typography>{`Theme: ${
            info.themes > 0
              ? info.themes.map((themes) =>
                  themes ? ` ${themes.name} ` : "N/A",
                )
              : "N/A"
          }`}</Typography>
          <Typography>{`Demographics: ${
            info.demographics > 0
              ? info.demographics.map((demographics) =>
                  demographics ? ` ${demographics.name} ` : "N/A",
                )
              : "N/A"
          }`}</Typography>
          <Typography>{`Duration: ${info.duration}`}</Typography>
          <Typography>{`Rating: ${info.rating}`}</Typography>
        </div>
        <div className='anime-info-statistics'>
          <h3>Statistics</h3>
          <Typography>{`Score: ${info.score ? info.score : "N/A"}`}</Typography>
          <Typography>{`Ranked: ${info.rank ? info.rank : "N/A"}`}</Typography>
          <Typography>{`Popularity: ${info.popularity}`}</Typography>
          <Typography>{`Members: ${info.members}`}</Typography>
          <Typography>{`Favorites: ${info.favorites}`}</Typography>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default AnimeInfoSideContent;
