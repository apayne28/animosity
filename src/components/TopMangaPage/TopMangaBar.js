import React from "react";
import { AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function TopMangaBar() {
  return (
    <AppBar position='static'>
      <div className='top-anime-navigation-bar-items'>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: " ", type: "manga" }}
        >
          <Typography>All Manga</Typography>
        </Link>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "oneshots" }}
        >
          <Typography>Top One-shots</Typography>
        </Link>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "doujin" }}
        >
          <Typography>Top Doujinshi</Typography>
        </Link>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "novels" }}
        >
          <Typography>Top Light Novels</Typography>
        </Link>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "manhwa" }}
        >
          <Typography>Top Manhwa</Typography>
        </Link>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "manhua" }}
        >
          <Typography>Top Manhua</Typography>
        </Link>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "bypopularity" }}
        >
          <Typography>Most Popular</Typography>
        </Link>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "favorite" }}
        >
          <Typography>Most Favorited</Typography>
        </Link>
      </div>
    </AppBar>
  );
}

export default TopMangaBar;
