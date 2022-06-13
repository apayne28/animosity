import React from "react";
import { Box } from "@mui/material";
import MangaInfoSideContent from "./MangaInfoSideContent";
import { useLocation } from "react-router-dom";

const MangaInfo = (props) => {
  const location = useLocation();

  // const id = location.state.mangaId;
  const id = props.mangaId ? props.mangaId : location.state.mangaId;

  console.log(location.state.mangaId);

  return (
    <Box>
      <div>
        <MangaInfoSideContent mangaId={id} />
      </div>
    </Box>
  );
};

export default MangaInfo;
