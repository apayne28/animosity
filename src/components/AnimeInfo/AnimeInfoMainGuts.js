import {
  Divider,
  Grid,
  Typography,
  Link as MuiLink,
  Box,
  Paper,
  Card,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";
import { useNavigate, Link } from "react-router-dom";

import LoadingScreen from "../LoadingScreen";
import ReactPlayer from "react-player";
import AnimeCharacterPage from "../CharacterPage/AnimeCharacterPage";
import AnimeInfoCharacters from "./AnimeInfoCharacters";
import AnimeInfoRecommendedAnime from "./AnimeInfoRecommendedAnime";

function AnimeInfoMainGuts(props) {
  const [info, setInfo] = useState();
  const [animeRelations, setAnimeRelations] = useState();
  // const [animeCharacterList, setAnimeCharacterList] = useState();
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();

  let navigate = useNavigate();

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

  if (info && animeRelations && animeRecommendationsList) {
    return (
      <div>
        <AnimeInfoAnimeDetails
          animeId={info.mal_id}
          animeRecList={animeRecommendationsList}
        />
        {info.trailer.url && (
          <div>
            {/* <a href={info.trailer.url} target='_blank' rel='noreferrer'>
            <img
              className='anime-info-promo-image'
              src={info.trailer.images.small_image_url}
              alt={`${info.title}`}
            />
          </a> */}
            <ReactPlayer
              url={info.trailer.url}
              style={{ display: "flex", margin: "auto", marginTop: "1%" }}
            />
          </div>
        )}

        <div className='anime-info-main-synopsis'>
          <h3>Synopsis</h3>
          <Typography paragraph>{info.synopsis}</Typography>
        </div>
        <div className='anime-info-content-guts'>
          <div className='anime-info-main-popularity-container'>
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
              })}
            </div>
            <Divider sx={{ pb: 4 }} />
            <AnimeInfoCharacters animeId={info.mal_id} />

            <Divider sx={{ pb: 4 }} />
            <h3>Recommended Anime</h3>
            <AnimeInfoRecommendedAnime animeId={info.mal_id} />

            <Divider sx={{ pb: 4 }} />
            {info.trailer.url && (
              <div>
                <h3>Trailers</h3>
                {/* <a href={info.trailer.url} target='_blank' rel='noreferrer'>
            <img
              className='anime-info-promo-image'
              src={info.trailer.images.small_image_url}
              alt={`${info.title}`}
            />
          </a> */}
                <ReactPlayer url={info.trailer.url} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeInfoMainGuts;
