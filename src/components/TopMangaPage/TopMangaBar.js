import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function TopMangaBar() {
  return (
    <Box sx={{ marginTop: "8%" }}>
      <Nav className='rb-navbar '>
        <Nav.Item>
          <Link
            to='/top-manga'
            onClick={() => window.location.reload()}
            state={{ topFilter: " ", type: "manga" }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 28 }}>All Manga</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-manga'
            onClick={() => window.location.reload()}
            state={{ topFilter: "oneshots" }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 28 }}>Top One-shots</Typography>
          </Link>
        </Nav.Item>
        {/* <Link
          to='/top-manga'
          onClick={() => window.location.reload()}
          state={{ topFilter: "doujin" }}
          style={{
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          <Typography sx={{ fontSize: 28 }}>Top Doujinshi</Typography>
        </Link> */}
        <Nav.Item>
          <Link
            to='/top-manga'
            onClick={() => window.location.reload()}
            state={{ topFilter: "novels" }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 28 }}>Top Light Novels</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-manga'
            onClick={() => window.location.reload()}
            state={{ topFilter: "manhua" }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 28 }}>Top Manhua</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-manga'
            onClick={() => window.location.reload()}
            state={{ topFilter: "manhwa" }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 28 }}>Top Manhwa</Typography>
          </Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Link
            to='/top-manga'
            onClick={() => window.location.reload()}
            state={{ topFilter: "bypopularity" }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 28 }}>Most Popular</Typography>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to='/top-manga'
            onClick={() => window.location.reload()}
            state={{ topFilter: "favorite" }}
            style={{
              textDecoration: "none",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ fontSize: 28 }}>Most Favorited</Typography>
          </Link>
        </Nav.Item> */}
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
    </Box>
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
