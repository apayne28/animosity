import {
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import LoadingScreen from "../LoadingScreen";

function AnimeInfoRecommendedAnime(props) {
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  let navigate = useNavigate();

  const getAnimeRecs = useCallback(async (id) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

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
  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];
  if (animeRecommendationsList && animeRecommendationsList.length > 0) {
    return animeRecommendationsList.length >= 1 ? (
      <Box data-testid="animosity-anime-page-recommended-anime-section">
        <Box
          sx={{
            backgroundColor: "#56e39f",
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "2.5%",
          }}
        >
          <h3>Recommended Anime</h3>
          <Link
            to='/anime-recs-page'
            state={{
              animeId: props.animeId,
              animeRecList: animeRecommendationsList,
            }}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                // padding: "0.5%",
                fontSize: 29,
                // display: "flex",
                // justifyContent: "flex-end",
                marginTop: "17%",
                // marginRight: "1%",
              }}
            >
              View More
            </Typography>
          </Link>
        </Box>

        <Box sx={{ paddingLeft: "2%", paddingRight: "2%" }}>

          <div className='anime-info-rec-anime-container' data-testid="animosity-anime-page-recommended-anime-carousel">
            <Carousel breakPoints={breakPoints}>
              {animeRecommendationsList.map((info) => {
                let recAnime = info.entry;

                return (
                  <div>
                    <ImageList cols={1} rowHeight={400}>
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
                    </ImageList>

                    {/* <Typography>{recAnime.title}</Typography> */}
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Box>
      </Box>
    ) : (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          // display: "flex",
          // justifyContent: "space-between",
          // paddingRight: "2.5%",
        }}
      >
        <h3>Recommended Anime</h3>

        <Typography
          sx={{ fontSize: 20, paddingBottom: "2%", marginLeft: " 1%" }}
        >
          N/A
        </Typography>
      </Box>
    );
  } else if (
    animeRecommendationsList &&
    animeRecommendationsList.length === 0
  ) {
    return <div></div>;
  } else {
    return <LoadingScreen />;
  }
}

export default AnimeInfoRecommendedAnime;
