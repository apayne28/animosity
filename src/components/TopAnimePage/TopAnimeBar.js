import React from "react";
import { AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function TopAnimeBar() {
  return (
    <AppBar position='static'>
      <div className='top-anime-navigation-bar-items'>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: " ", type: "anime" }}
        >
          <Typography>All Anime</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "airing" }}
        >
          <Typography>Top Airing</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "upcoming" }}
        >
          <Typography>Top Upcoming</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "tv" }}
        >
          <Typography>Top TV Series</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "movie" }}
        >
          <Typography>Top Movies</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "ova" }}
        >
          <Typography>Top OVAs</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "special" }}
        >
          <Typography>Top Specials</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "bypopularity" }}
        >
          <Typography>Most Popular</Typography>
        </Link>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "favorite" }}
        >
          <Typography>Most Favorited</Typography>
        </Link>
      </div>
    </AppBar>
  );
}

export default TopAnimeBar;
