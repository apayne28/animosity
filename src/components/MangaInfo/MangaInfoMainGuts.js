import { Divider, Grid, Typography, Link as MuiLink } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import MangaInfoCharacters from "./MangaInfoCharacters";
import MangaInfoMangaDetails from "./MangaInfoMangaDetails";
import MangaInfoRecommendedManga from "./MangaInfoRecommendedManga";

function MangaInfoMainGuts(props) {
  const [info, setInfo] = useState();
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

  if (info && mangaRelations) {
    return (
      <div className='anime-info-content-guts'>
        <MangaInfoMangaDetails
          mangaId={info.mal_id}
          mangaRecList={mangaRecommendationsList}
        />

        <div className='anime-info-main-popularity-container'>
          <h3>Synopsis</h3>
          <Typography>{info.synopsis ? info.synopsis : "N/A"}</Typography>
          <Divider sx={{ pb: 4 }} />
          <h3>Background</h3>
          <Typography>{info.background ? info.background : "N/A"}</Typography>
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
                          <Typography className='anime-info-related-anime-item'>{`${relatedAnimeType}: ${single.name}`}</Typography>
                        </MuiLink>
                      </div>
                    );
                  });
                })
              : "N/A"}
          </div>
          <Divider sx={{ pb: 4 }} />

          <h3>Characters</h3>
          <MangaInfoCharacters mangaId={info.mal_id} />

          <Divider sx={{ pb: 4 }} />
          <h3>Recommended Manga</h3>
          <MangaInfoRecommendedManga mangaId={info.mal_id} />
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default MangaInfoMainGuts;
