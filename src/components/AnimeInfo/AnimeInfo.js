import React from "react";
import AnimeInfoSideContent from "./AnimeInfoPage.js";

import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";

const AnimeInfo = (props) => {
  const location = useLocation();

  const id =
    props.animeId !== undefined ? props.animeId : location.state.animeId;
  console.log(props.animeId, location, id);

  return (
    <Box>
      <div>
        <AnimeInfoSideContent animeId={id} />
      </div>
    </Box>
  );
};

export default AnimeInfo;
