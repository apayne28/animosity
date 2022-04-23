import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import MangaInfoMangaDetails from "./MangaInfoMangaDetails";

function MangaInfoMainGuts(props) {
  const [info, setInfo] = useState();
  const [mangaRelations, setMangaRelations] = useState();
  const [mangaCharacterList, setMangaCharacterList] = useState();
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

        //Grabs Manga Characters Data
        let mangaCharactersData = await fetch(
          `https://api.jikan.moe/v4/manga/${id}/characters`,
        ).then((res) => res.json());
        let mangaCharactersDataResults = mangaCharactersData.data;
        console.log("Chatacters", mangaCharactersDataResults);

        setMangaCharacterList(mangaCharactersDataResults);

        //Grabs Manga Recs
        let mangaRecommendationsData = await fetch(
          `https://api.jikan.moe/v4/manga/${id}/recommendations`,
        ).then((res) => res.json());
        let mangaRecommendationsDataResults = mangaRecommendationsData.data;

        console.log("Recs", mangaRecommendationsDataResults);
        setMangaRecommendationsList(mangaRecommendationsDataResults);

        // return results;
      } catch (error) {
        console.log("Manga not found");
      }
    },
    [props.mangaId],
  );

  useEffect(() => {
    if (
      !info &&
      !mangaRelations &&
      !mangaCharacterList &&
      !mangaRecommendationsList
    ) {
      getManga(props.mangaId).catch(console.error);
    }
  }, [
    mangaCharacterList,
    mangaRecommendationsList,
    mangaRelations,
    getManga,
    info,
    props.mangaId,
  ]);

  if (
    info &&
    mangaRelations &&
    mangaCharacterList &&
    mangaRecommendationsList
  ) {
    return (
      <div className='anime-info-content-guts'>
        <MangaInfoMangaDetails />

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

                  return relatedAnime.map((single) => {
                    return (
                      <Typography className='anime-info-related-anime-item'>{`${relatedAnimeType}: ${single.name}`}</Typography>
                    );
                  });
                })
              : "N/A"}
          </div>
          <Divider sx={{ pb: 4 }} />

          <h3>Characters</h3>
          <div className='anime-info-character-list'>
            {mangaCharacterList.length > 0
              ? mangaCharacterList.slice(0, 5).map((character) => {
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
                })
              : "N/A"}
          </div>

          <Divider sx={{ pb: 4 }} />
          <h3>Recommended Manga</h3>
          <div className='anime-info-rec-anime-container'>
            {mangaRecommendationsList.length > 0
              ? mangaRecommendationsList.slice(0, 5).map((info) => {
                  let recAnime = info.entry;

                  return (
                    <div className='anime-info-rec-anime-item'>
                      {/* <Link
                        to='/manga-info'
                        state={{ mangaId: recAnime.mal_id }}
                      > */}
                      <img
                        src={recAnime.images.jpg.image_url}
                        alt={recAnime.title}
                        onClick={(e) => {
                          navigate(`/manga-info`, {
                            state: {
                              mangaId: recAnime.mal_id,
                            },
                          });
                          window.location.reload();
                        }}
                      />
                      <Typography>{recAnime.title}</Typography>
                      {/* </Link> */}
                    </div>
                  );
                })
              : "N/A"}
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default MangaInfoMainGuts;
