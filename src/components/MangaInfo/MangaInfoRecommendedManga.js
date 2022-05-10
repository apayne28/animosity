import {
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MangaCharacterList from "../CharacterListPage/MangaCharacterList";
import LoadingScreen from "../LoadingScreen";
import MangaInfoCharacters from "./MangaInfoCharacters";
import MangaInfoMangaDetails from "./MangaInfoMangaDetails";

function MangaInfoRecommendedManga(props) {
  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();

  let navigate = useNavigate();

  const getMangaRecs = useCallback(async (id) => {
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
  }, []);

  useEffect(() => {
    if (!mangaRecommendationsList) {
      getMangaRecs(props.mangaId);
    }
  }, [getMangaRecs, mangaRecommendationsList, props.mangaId]);

  if (mangaRecommendationsList) {
    return (
      <div className='anime-info-rec-anime-container'>
        <ImageList cols={5} rowHeight={400}>
          {mangaRecommendationsList.length > 0
            ? mangaRecommendationsList.slice(0, 5).map((info) => {
                let recAnime = info.entry;

                return (
                  <div className='anime-info-rec-anime-item'>
                    <Link to='/manga-info' state={{ mangaId: recAnime.mal_id }}>
                      <ImageListItem>
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
                        <ImageListItemBar title={recAnime.title} />
                      </ImageListItem>
                      {/* <Typography>{recAnime.title}</Typography> */}
                    </Link>
                  </div>
                );
              })
            : "N/A"}
        </ImageList>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default MangaInfoRecommendedManga;
