import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "../LoadingScreen";

function AnimeInfoMainGuts(props) {
  const [info, setInfo] = useState();
  const [animeRelations, setAnimeRelations] = useState();
  const [animeCharacterList, setAnimeCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();

  let navigate = useNavigate();

  const getAnime = useCallback(
    async (id) => {
      id = props.animeId;
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

        //Grabs Anime Characters Data
        let animeCharactersData = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/characters`,
        ).then((res) => res.json());
        let animeCharactersDataResults = animeCharactersData.data;
        console.log("Chatacters", animeCharactersDataResults);

        setAnimeCharacterList(animeCharactersDataResults);

        let animeRecommendationsData = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/recommendations`,
        ).then((res) => res.json());
        let animeRecommendationsDataResults = animeRecommendationsData.data;

        console.log("Recs", animeRecommendationsDataResults);
        setAnimeRecommendationsList(animeRecommendationsDataResults);

        // return results;
      } catch (error) {
        console.log("Anime not found");
      }
    },
    [props.animeId],
  );

  useEffect(() => {
    if (
      !info &&
      !animeRelations &&
      !animeCharacterList &&
      !animeRecommendationsList
    ) {
      getAnime(props.animeId).catch(console.error);
    }
  }, [
    animeCharacterList,
    animeRecommendationsList,
    animeRelations,
    getAnime,
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
            {animeRelations.map((info) => {
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
            {animeCharacterList.slice(0, 5).map((character) => {
              let characterEntry = character.character;
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
            {animeRecommendationsList.slice(0, 5).map((info) => {
              let recAnime = info.entry;

              return (
                <div className='anime-info-rec-anime-item'>
                  <img
                    src={recAnime.images.jpg.image_url}
                    alt={recAnime.title}
                    onClick={(e) => {
                      navigate(`/anime-info`, {
                        state: {
                          animeId: recAnime.mal_id,
                        },
                      });
                      window.location.reload();
                    }}
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
    return <LoadingScreen />;
  }
}

export default AnimeInfoMainGuts;
