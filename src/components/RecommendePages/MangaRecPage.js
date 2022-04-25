import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Divider, Grid, Typography, Link as MuiLink, Box } from "@mui/material";

import { useLocation, Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import Header from "../mainpage/Header";
import NavigationBar from "../mainpage/navBar/NavigationBar";
import MangaInfoMangaDetails from "../MangaInfo/MangaInfoMangaDetails";

function MangaRecPage(props) {
  const location = useLocation();
  const [animeRecs, setAnimeRecs] = useState();
  const originManga = location.state.mangaId;
  const originMangaRecList = location.state.mangaRecList;
  const [info, setInfo] = useState();
  const [characterList, setCharacterList] = useState();
  let id = location.state.mangaId;

  console.log(location, props, originMangaRecList);

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

  const getCharacterList = useCallback(async (id) => {
    //   console.log(props, location);

    try {
      let mangaCharactersData = await fetch(
        `https://api.jikan.moe/v4/manga/${id}/characters`,
      ).then((res) => res.json());
      let mangaCharactersDataResults = mangaCharactersData.data;
      console.log("Chatacters", mangaCharactersDataResults);

      setCharacterList(mangaCharactersDataResults);
    } catch (error) {
      console.log("Character List not found");
    }
  }, []);

  useEffect(() => {
    if (!mangaRecommendationsList) {
      getMangaRecs(id);
    }
    if (!characterList) {
      getCharacterList(id);
    }
  }, [
    characterList,
    getCharacterList,
    getMangaRecs,
    id,
    mangaRecommendationsList,
    props.mangaId,
  ]);
  console.log(characterList);
  if (originMangaRecList) {
    return (
      <Box>
        <Header />
        <NavigationBar />
        <MangaInfoMangaDetails
          mangaRecList={mangaRecommendationsList}
          mangaId={id}
          charList={characterList}
        />
        <Grid
          container
          sx={{
            maxWidth: "80%",
            margin: "auto",
            backgroundColor: "white",
          }}
        >
          {originMangaRecList.map((entry) => {
            // console.log(test);
            return (
              <Grid item sx={{ display: "flex", margin: "auto" }}>
                <Link to='/manga-info' state={{ mangaId: entry.entry.mal_id }}>
                  <img
                    src={entry.entry.images.jpg.image_url}
                    alt={entry.entry.title}
                  />
                  <div>
                    <Typography
                      sx={{
                        wordWrap: "break-word",
                        // backgroundColor: "black",
                        // color: "white",
                      }}
                    >
                      {entry.entry.title}
                    </Typography>
                  </div>
                </Link>
              </Grid>
            );
          })}
        </Grid>
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

export default MangaRecPage;
