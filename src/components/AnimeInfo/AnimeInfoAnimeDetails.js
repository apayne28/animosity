import { Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

import React from "react";
import { Nav } from "react-bootstrap";

function AnimeInfoAnimeDetails(props) {
  let navigate = useNavigate();
  const location = useLocation();

  console.log(props, location);
  return (
    <Box
    data-testid='anime-info-anime-details-bar'
    >
      <Nav className='rb-navbar '>
        <Nav.Item>
          <MuiLink
           data-testid='anime-info-anime-details-bar-details'
            onClick={(e) => {
              navigate("/anime-info", {
                state: { animeId: location.state.animeId },
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
           data-testid='anime-info-anime-details-bar-characters'
            to='/anime-character-list-page'
            state={{
              animeId: props.animeId,
              animeRecList: props.animeRecList,
              charList: props.charList,
            }}
          >
            <Typography
              className='anime-info-content-navbar-items'
              sx={{ fontSize: 28 }}
            >
              Characters
            </Typography>
          </Link>
        </Nav.Item>

        {props.animeRecList && props.animeRecList.length > 0 && (
          <Nav.Item>
            <Link
             data-testid='anime-info-anime-details-bar-recommendations'
              to='/anime-recs-page'
              state={{
                animeId: props.animeId,
                animeRecList: props.animeRecList,
                charList: props.charList,
              }}
              onClick={(e) => console.log(location, props)}
            >
              <Typography
                className='anime-info-content-navbar-items'
                sx={{ fontSize: 28 }}
              >
                Recommendations
              </Typography>
            </Link>
          </Nav.Item>
        )}
      </Nav>
    </Box>
  );
}

export default AnimeInfoAnimeDetails;
