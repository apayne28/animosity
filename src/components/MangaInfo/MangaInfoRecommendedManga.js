import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

import Carousel from "react-elastic-carousel";

function MangaInfoRecommendedManga(props) {
  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();
  console.log(props);

  let navigate = useNavigate();

  const getMangaRecs = useCallback(async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
  const breakPoints = [
    { width: 1, itemsToShow: 1 },

    { width: 550, itemsToShow: 2, itemsToScroll: 2 },

    { width: 855, itemsToShow: 3, itemsToScroll: 3 },

    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 2081, itemsToShow: 6, itemsToScroll: 6 },

    { width: 3008, itemsToShow: 8, itemsToScroll: 8 },
  ];

  console.log(
    mangaRecommendationsList,

    props.mangaId,
  );
  if (mangaRecommendationsList && mangaRecommendationsList.length > 0) {
    return (
      <Box>
        <Box
          sx={{
            backgroundColor: "#56e39f",
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "2.5%",
          }}
        >
          <h3>Recommended Manga</h3>
          <Link
            to='/manga-recs-page'
            state={{
              mangaId: props.mangaId,
              mangaRecList: mangaRecommendationsList,
            }}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                fontSize: 29,
                marginTop: "17%",
              }}
            >
              View More
            </Typography>
          </Link>
        </Box>

        <div className='anime-info-rec-anime-container'>
          <Carousel breakPoints={breakPoints}>
            {mangaRecommendationsList.length > 0
              ? mangaRecommendationsList.map((info) => {
                  let recAnime = info.entry;

                  return (
                    <div>
                      <ImageList cols={1} rowHeight={400}>
                        <Link
                          to='/manga-info'
                          state={{ mangaId: recAnime.mal_id }}
                        >
                          <ImageListItem>
                            <Box
                              component='img'
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
                        </Link>
                      </ImageList>
                    </div>
                  );
                })
              : "N/A"}
          </Carousel>
        </div>
      </Box>
    );
  } else if (
    mangaRecommendationsList &&
    mangaRecommendationsList.length === 0
  ) {
    return <div></div>;
  } else {
    return <LoadingScreen />;
  }
}

export default MangaInfoRecommendedManga;
