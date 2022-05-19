import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function TopAnimeBar() {
  return (
    <Box sx={{ marginTop: "8%" }}>
      <Nav className='rb-navbar '>
        {/* <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: " ", type: "anime", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              All Anime
            </Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "airing", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Top Airing
            </Typography>
          </Link>
        </Nav.Item>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "upcoming", page: 1 }}
          style={{
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
            Top Upcoming
          </Typography>
        </Link> */}
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "tv", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Top TV Series
            </Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "movie", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Top Movies
            </Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "ova", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Top OVAs
            </Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "special", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Top Specials
            </Typography>
          </Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "bypopularity", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Most Popular
            </Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "favorite", page: 1 }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Most Favorited
            </Typography>
          </Link>
        </Nav.Item> */}
      </Nav>
    </Box>

    // <AppBar
    //   position='static'
    //   sx={{ backgroundColor: "#56e39f", color: "#FFFFFF", width: "99.5%" }}
    // >
    //   <div className='top-anime-navigation-bar-items'>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: " ", type: "anime" }}
    //     >
    //       <Typography>All Anime</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "airing" }}
    //     >
    //       <Typography>Top Airing</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "upcoming" }}
    //     >
    //       <Typography>Top Upcoming</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "tv" }}
    //     >
    //       <Typography>Top TV Series</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "movie" }}
    //     >
    //       <Typography>Top Movies</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "ova" }}
    //     >
    //       <Typography>Top OVAs</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "special" }}
    //     >
    //       <Typography>Top Specials</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "bypopularity" }}
    //     >
    //       <Typography>Most Popular</Typography>
    //     </Link>
    //     <Link
    //       to='/top-anime'
    //       onClick={() => window.location.reload()}
    //       state={{ topFilter: "favorite" }}
    //     >
    //       <Typography>Most Favorited</Typography>
    //     </Link>
    //   </div>
    // </AppBar>
  );
}

export default TopAnimeBar;
