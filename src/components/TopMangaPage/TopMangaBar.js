import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

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
      </Nav>
    </Box>
  );
}

export default TopMangaBar;
