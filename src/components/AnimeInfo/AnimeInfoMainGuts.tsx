import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";

interface Props {
  animeId: number;
}

function AnimeInfoMainGuts(props: Props) {
  const [info, setInfo] = useState();
  const [animeRelations, setAnimeRelations] = useState();
  const [animeCharacterList, setAnimeCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();

  const getAnime = useCallback(
    async (id) => {
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
    },
    [props.animeId],
  );

  const getRelatedAnime = useCallback(
    async (id) => {
      id = props.animeId;
      try {
        let temp = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/relations`,
        ).then((res) => res.json());

        let results = temp.data;
        console.log("RelatedAnime", temp.data);
        setAnimeRelations(results);
        return results;
      } catch (error) {
        console.log("Anime Data not found");
      }
    },
    [props.animeId],
  );

  const getAnimeCharacters = useCallback(async (id) => {
    id = props.animeId;
    try {
      let temp = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/characters`,
      ).then((res) => res.json());
      let results = temp.data;
      console.log("Chatacters", temp.data);

      setAnimeCharacterList(results);

      return Promise.resolve(results);
    } catch (error) {
      console.log("Anime Data not found");
    }
  }, []);

  const getAnimeRecs = useCallback(async (id) => {
    id = props.animeId;
    try {
      let temp = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/recommendations`,
      ).then((res) => res.json());
      let results = temp.data;

      console.log("Recs", temp.data);
      setAnimeRecommendationsList(results);

      return results;
    } catch (error) {
      console.log("Anime Data not found");
    }
  }, []);

  useEffect(() => {
    if (!info) {
      getAnime(props.animeId).catch(console.error);
    }

    if (!animeRelations) {
      getRelatedAnime(props.animeId).catch(console.error);
    }
    if (!animeCharacterList) {
      getAnimeCharacters(props.animeId).catch(console.error);
    }
    if (!animeRecommendationsList) {
      getAnimeRecs(props.animeId).catch(console.error);
    }
  }, [
    animeCharacterList,
    animeRecommendationsList,
    animeRelations,
    getAnime,
    getAnimeCharacters,
    getAnimeRecs,
    getRelatedAnime,
    info,
    props.animeId,
  ]);

  if (
    info &&
    animeCharacterList &&
    animeRelations &&
    animeRecommendationsList
  ) {
    return (
      <div className='anime-info-content-guts'>
        <AnimeInfoAnimeDetails />
        <div className='anime-info-main-popularity-container'>
          <h3>Synopsis</h3>
          <Typography>{info.synopsis}</Typography>
          <Divider sx={{ pb: 4 }} />
          <h3>Background</h3>
          <Typography>{info.background ? info.background : "N/A"}</Typography>
          <Divider sx={{ pb: 4 }} />

          <h3>Related Anime</h3>
          <div className='anime-info-related-anime-container'>
            {animeRelations.map((info: any) => {
              let relatedAnime = info.entry;
              let relatedAnimeType = info.relation;

              return relatedAnime.map((single) => {
                return (
                  <Typography className='anime-info-related-anime-item'>{`${relatedAnimeType}: ${single.name}`}</Typography>
                );
              });
            })}
          </div>
          <Divider sx={{ pb: 4 }} />

          <h3>Characters</h3>
          <div className='anime-info-character-list'>
            {animeCharacterList.slice(0, 5).map((character: any) => {
              let characterEntry: any = character.character;
              // console.log(characterEntry);

              return (
                <Grid item>
                  <img
                    src={characterEntry.images.jpg.image_url}
                    alt={characterEntry.name}
                  />
                  <Typography>{characterEntry.name} </Typography>
                </Grid>
              );
            })}
          </div>

          <Divider sx={{ pb: 4 }} />

          <h3>Recommended Anime</h3>
          <div className='anime-info-rec-anime-container'>
            {animeRecommendationsList.slice(0, 5).map((info: any) => {
              let recAnime = info.entry;

              return (
                <div className='anime-info-rec-anime-item'>
                  <img
                    src={recAnime.images.jpg.image_url}
                    alt={recAnime.title}
                  />
                  <Typography>{recAnime.title}</Typography>
                </div>
              );
            })}
          </div>

          <Divider sx={{ pb: 4 }} />

          <h3>Trailers</h3>
          <a href={info.trailer.url} target='_blank' rel='noreferrer'>
            <img
              className='anime-info-promo-image'
              src={info.trailer.images.small_image_url}
              alt={`${info.title}`}
            />
          </a>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default AnimeInfoMainGuts;
