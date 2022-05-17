import {
  Box,
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
import Carousel from "react-elastic-carousel";
import axios from "axios";

function MangaInfoRecommendedManga(props) {
  const [mangaRecommendationsList, setMangaRecommendationsList] = useState();

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

  // const getMangaRecs2 = useCallback(async (id) => {
  //   try {
  //     //Grabs Manga Recs
  //     let mangaRecommendationsData = await axios
  //       .get(`https://api.jikan.moe/v4/manga/${id}/recommendations`)
  //       .then((res) => res.json());
  //     let mangaRecommendationsDataResults = mangaRecommendationsData.data;

  //     setMangaRecommendationsList(mangaRecommendationsDataResults);
  //   } catch (error) {
  //     console.log("Manga Recs not found");
  //   }
  // }, []);

  //  const getMangaRecs2 = async (id) => {
  //    axios
  //      .get(`https://api.jikan.moe/v4/manga/${id}/recommendations`)
  //      .then((res) => res.json());
  //       try {
  //         //Grabs Manga Recs
  //         let mangaRecommendationsData = await axios
  //           .get(`https://api.jikan.moe/v4/manga/${id}/recommendations`)
  //           .then((res) => res.json());
  //         let mangaRecommendationsDataResults = mangaRecommendationsData.data;

  //         setMangaRecommendationsList(mangaRecommendationsDataResults);
  //       } catch (error) {
  //         console.log("Manga Recs not found");
  //       }
  //  }

  useEffect(() => {
    if (!mangaRecommendationsList) {
      getMangaRecs(props.mangaId);
    }
  }, [getMangaRecs, mangaRecommendationsList, props.mangaId]);
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3, itemsToScroll: 3 },
    // { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },

    { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
  ];
  if (mangaRecommendationsList) {
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

                          {/* <Typography>{recAnime.title}</Typography> */}
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
  } else {
    return <LoadingScreen />;
  }
}

export default MangaInfoRecommendedManga;
