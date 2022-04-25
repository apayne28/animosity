import React from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

function MangaInfoMangaDetails(props) {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(props, location);
  return (
    <div className='anime-info-content-navbar'>
      <MuiLink
        onClick={(e) => {
          navigate("/manga-info", {
            state: { mangaId: location.state.mangaId },
          });
          window.location.reload();
        }}
      >
        <Typography className='anime-info-content-navbar-items'>
          Details
        </Typography>
      </MuiLink>
      {/* <div className='anime-info-content-navbar-items'>Characters</div> */}
      <Link
        to='/manga-character-list-page'
        state={{
          mangaId: props.mangaId,
          mangaRecList: props.mangaRecList,
          charList: props.charList,
        }}
      >
        <Typography className='anime-info-content-navbar-items'>
          Characters & Staff
        </Typography>
      </Link>
      <Link
        to='/manga-recs-page'
        state={{
          mangaId: props.mangaId,
          mangaRecList: props.mangaRecList,
          charList: props.charList,
        }}
        onClick={() => console.log(location, props)}
      >
        <Typography className='anime-info-content-navbar-items'>
          Recommendations
        </Typography>
      </Link>
    </div>
  );
}

export default MangaInfoMangaDetails;
