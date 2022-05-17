import React from "react";
import { AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function TopMangaBar() {
  return (
    <Nav className='rb-navbar '>
      <Nav.Item>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: " ", type: "manga" }}
        >
          <Typography sx={{ fontSize: 28 }}>All Manga</Typography>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "oneshots" }}
        >
          <Typography sx={{ fontSize: 28 }}>Top One-shots</Typography>
        </Link>
      </Nav.Item>
      <Link
        to='/top-manga'
        onClick={() => window.location.reload()}
        state={{ topFilter: "doujin" }}
      >
        <Typography sx={{ fontSize: 28 }}>Top Doujinshi</Typography>
      </Link>
      <Nav.Item>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "novels" }}
        >
          <Typography sx={{ fontSize: 28 }}>Top Light Novels</Typography>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "manhua" }}
        >
          <Typography sx={{ fontSize: 28 }}>Top Manhua</Typography>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "bypopularity" }}
        >
          <Typography sx={{ fontSize: 28 }}>Most Popular</Typography>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "favorite" }}
        >
          <Typography sx={{ fontSize: 28 }}>Most Favorited</Typography>
        </Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "bypopularity" }}
        >
          <Typography>Most Popular</Typography>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "favorite" }}
        >
          <Typography>Most Favorited</Typography>
        </Link>
      </Nav.Item> */}
    </Nav>
    // <AppBar position='static'>
    //   <div className='top-anime-navigation-bar-items'>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: " ", type: "manga" }}
    //     >
    //       <Typography>All Manga</Typography>
    //     </Link>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "oneshots" }}
    //     >
    //       <Typography>Top One-shots</Typography>
    //     </Link>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "doujin" }}
    //     >
    //       <Typography>Top Doujinshi</Typography>
    //     </Link>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "novels" }}
    //     >
    //       <Typography>Top Light Novels</Typography>
    //     </Link>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "manhwa" }}
    //     >
    //       <Typography>Top Manhwa</Typography>
    //     </Link>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "manhua" }}
    //     >
    //       <Typography>Top Manhua</Typography>
    //     </Link>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "bypopularity" }}
    //     >
    //       <Typography>Most Popular</Typography>
    //     </Link>
    //     <Link
    //       to='/top-manga'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "favorite" }}
    //     >
    //       <Typography>Most Favorited</Typography>
    //     </Link>
    //   </div>
    // </AppBar>
  );
}

export default TopMangaBar;
