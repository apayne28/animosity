import { Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

import React from "react";
import { Nav } from "react-bootstrap";

function MangaAuthorDetails(props) {
  let navigate = useNavigate();
  const location = useLocation();

  console.log(props, location);
  return (
    <Box>
      <Nav className='rb-navbar '>
        <Nav.Item>
          <MuiLink
            onClick={(e) => {
              navigate("/manga-author-page", {
                state: {
                  voiceActor: props.authorId,
                  animeList: props.authorMangaList,
                },
              });
              window.location.reload();
            }}
          >
            <Typography
              className='anime-info-content-navbar-items'
              sx={{ fontSize: 28 }}
            >
              Details
            </Typography>
          </MuiLink>
        </Nav.Item>

        <Nav.Item>
          <Link
            to='/manga-author-manga-list'
            state={{
              voiceActor: props.authorId,
              animeList: props.authorMangaList
                ? props.authorMangaList
                : location.state.animeList,
            }}
            onClick={(e) => console.log(location, props)}
          >
            <Typography
              className='anime-info-content-navbar-items'
              sx={{ fontSize: 28 }}
            >
              Manga
            </Typography>
          </Link>
        </Nav.Item>
      </Nav>
    </Box>
  );
}

export default MangaAuthorDetails;
