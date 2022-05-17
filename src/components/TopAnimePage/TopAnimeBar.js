import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function TopAnimeBar() {
  return (
    <Box>
      <Nav className='rb-navbar '>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: " ", type: "anime" }}
          >
            <Typography sx={{ fontSize: 28 }}>All Anime</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "airing" }}
          >
            <Typography sx={{ fontSize: 28 }}>Top Airing</Typography>
          </Link>
        </Nav.Item>
        <Link
          to='/top-anime'
          onClick={() => window.location.reload()}
          state={{ topFilter: "upcoming" }}
        >
          <Typography sx={{ fontSize: 28 }}>Top Upcoming</Typography>
        </Link>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "tv" }}
          >
            <Typography sx={{ fontSize: 28 }}>Top TV Series</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "movie" }}
          >
            <Typography sx={{ fontSize: 28 }}>Top Movies</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "ova" }}
          >
            <Typography sx={{ fontSize: 28 }}>Top OVAs</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "special" }}
          >
            <Typography sx={{ fontSize: 28 }}>Top Specials</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "bypopularity" }}
          >
            <Typography sx={{ fontSize: 28 }}>Most Popular</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-anime'
            onClick={() => window.location.reload()}
            state={{ topFilter: "favorite" }}
          >
            <Typography sx={{ fontSize: 28 }}>Most Favorited</Typography>
          </Link>
        </Nav.Item>
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
