import {
  Divider,
  Grid,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import AnimeInfoAnimeDetails from "./AnimeInfoAnimeDetails";
import { useNavigate, Link } from "react-router-dom";

import LoadingScreen from "../LoadingScreen";
import ReactPlayer from "react-player";

function AnimeInfoRecommendedAnime(props) {
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  let navigate = useNavigate();

  const getAnimeRecs = useCallback(async (id) => {
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
    if (!animeRecommendationsList) {
      getAnimeRecs(props.animeId);
    }
  }, [animeRecommendationsList, getAnimeRecs, props.animeId]);

  if (animeRecommendationsList) {
    return animeRecommendationsList.length > 1 ? (
      <div>
        <Link
          to='/anime-recs-page'
          state={{
            animeId: props.animeId,
            animeRecList: animeRecommendationsList,
          }}
        >
          <Typography>View More</Typography>
        </Link>

        <div className='anime-info-rec-anime-container'>
          <ImageList
            cols={animeRecommendationsList.length >= 10 ? 10 : 5}
            rowHeight={animeRecommendationsList.length >= 10 ? 400 : 550}
          >
            {animeRecommendationsList.slice(0, 5).map((info) => {
              let recAnime = info.entry;

              return (
                <div>
                  <div className='anime-info-rec-anime-item'>
                    <ImageListItem>
                      <Box
                        component='img'
                        src={recAnime.images.jpg.image_url}
                        alt={recAnime.title}
                        onClick={(e) => {
                          navigate(`/anime-info`, {
                            state: {
                              animeId: recAnime.mal_id,
                              animeRecList: animeRecommendationsList,
                            },
                          });
                          window.location.reload();
                        }}
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 1,
                        }}
                      />
                      <ImageListItemBar
                        title={recAnime.title}
                        sx={{ borderRadius: 1 }}
                      />
                    </ImageListItem>
                    {/* <Typography>{recAnime.title}</Typography> */}
                  </div>
                </div>
              );
            })}
          </ImageList>
        </div>
      </div>
    ) : (
      <Typography sx={{ fontSize: 20 }}>N/A</Typography>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeInfoRecommendedAnime;
