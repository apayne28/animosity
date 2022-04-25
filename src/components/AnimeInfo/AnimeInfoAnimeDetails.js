import { Typography, Link as MuiLink } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

import React from "react";

function AnimeInfoAnimeDetails(props) {
  let navigate = useNavigate();
  const location = useLocation();

  console.log(props, location);
  return (
    <div className='anime-info-content-navbar'>
      <MuiLink
        onClick={(e) => {
          navigate("/anime-info", {
            state: { animeId: location.state.animeId },
          });
          window.location.reload();
        }}
      >
        <Typography className='anime-info-content-navbar-items'>
          Details
        </Typography>
      </MuiLink>

      <Link
        to='/anime-character-list-page'
        state={{
          animeId: props.animeId,
          animeRecList: props.animeRecList,
          charList: props.charList,
        }}
      >
        <Typography className='anime-info-content-navbar-items'>
          Characters & Staff
        </Typography>
      </Link>
      <Link
        to='/anime-recs-page'
        state={{
          animeId: props.animeId,
          animeRecList: props.animeRecList,
          charList: props.charList,
        }}
        onClick={(e) => console.log(location, props)}
      >
        <Typography className='anime-info-content-navbar-items'>
          Recommendations
        </Typography>
      </Link>
    </div>
  );
}

export default AnimeInfoAnimeDetails;
