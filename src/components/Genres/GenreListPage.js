import { Divider, Typography, Box } from "@mui/material";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import LoadingScreen from "../LoadingScreen";

function GenreListPage() {
  const [genreList, setGenreList] = useState();

  const getGenreList = useCallback(async () => {
    try {
      let genreData = await fetch(`https://api.jikan.moe/v4/genres/anime`).then(
        (res) => res.json(),
      );

      let genreDataResults = genreData.data;
      setGenreList(genreDataResults);
    } catch (error) {
      console.log("Genre List data not found");
    }
  }, []);

  useEffect(() => {
    if (!genreList) {
      getGenreList();
    }
  }, [genreList, getGenreList]);

  if (genreList) {
    return (
      <Box>
        <Typography>Genres</Typography>
        {genreList.map((genres) => {
          return <Typography>{genres.name}</Typography>;
        })}
        <Divider />
        <Typography>Explicit Genres</Typography>
        <Divider />
        <Typography>Themes</Typography>
        <Divider />
        <Typography>Demographics</Typography>
      </Box>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default GenreListPage;
