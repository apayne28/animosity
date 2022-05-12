import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Divider,
  Grid,
  Typography,
  Link as MuiLink,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { useLocation, Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import AnimeInfoAnimeDetails from "../AnimeInfo/AnimeInfoAnimeDetails";

function AnimeRecPage(props) {
  const location = useLocation();
  const [animeRecs, setAnimeRecs] = useState();
  const originAnime = location.state.animeId;
  const originAnimeRecList = location.state.animeRecList;
  const [animeRecommendationsList, setAnimeRecommendationsList] = useState();
  const [animeCharacterList, setAnimeCharacterList] = useState();

  const [info, setInfo] = useState();

  const id = location.state.animeId;

  console.log(location, props, originAnimeRecList);

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

      //   // Grabs Related Anime Data
      //   let relatedAnimeData = await fetch(
      //     `https://api.jikan.moe/v4/anime/${id}/relations`,
      //   ).then((res) => res.json());

      //   let relatedAnimeDataResults = relatedAnimeData.data;
      //   console.log("RelatedAnime", relatedAnimeDataResults);
      //   setAnimeRelations(relatedAnimeDataResults);
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

    try {
      let animeCharactersData = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/characters`,
      ).then((res) => res.json());
      let animeCharactersDataResults = animeCharactersData.data;
      console.log("Chatacters", animeCharactersDataResults);
      setAnimeCharacterList(animeCharactersDataResults);
    } catch (error) {
      console.log("Character not found");
    }
  }, []);

  useEffect(() => {
    if (!animeRecommendationsList) {
      getAnime(props.animeId);
    }
  }, [animeRecommendationsList, setAnimeRecs, props.animeId, getAnime]);

  if (originAnimeRecList) {
    return (
      <Box className='anime-recs-page'>
        <Header />
        <NavigationBar />
        <AnimeInfoAnimeDetails
          animeRecList={animeRecommendationsList}
          animeId={id}
          charList={animeCharacterList}
        />
        <div className='anime-recs-content'>
          <ImageList cols={10} rowHeight={400}>
            {originAnimeRecList.map((entry) => {
              // console.log(test);
              return (
                <div>
                  <Link
                    to='/anime-info'
                    state={{ animeId: entry.entry.mal_id }}
                  >
                    <ImageListItem>
                      <Box
                        component='img'
                        src={entry.entry.images.jpg.image_url}
                        alt={entry.entry.title}
                        sx={{ width: "100%", height: "100%", borderRadius: 1 }}
                      />
                      <ImageListItemBar title={entry.entry.title} />
                    </ImageListItem>
                    <div>
                      {/* <Typography
                        sx={{
                          wordWrap: "break-word",
                          // backgroundColor: "black",
                          // color: "white",
                        }}
                      >
                        {entry.entry.title}
                      </Typography> */}
                    </div>
                  </Link>
                </div>
              );
            })}
          </ImageList>
        </div>
        <footer class='footer' />
      </Box>
    );
  } else {
    return (
      <div>
        {console.log(location, props)}
        <LoadingScreen />
      </div>
    );
  }
}

export default AnimeRecPage;
