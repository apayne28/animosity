import { Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

import React from "react";
import { Nav } from "react-bootstrap";

function VoiceActorDetails(props) {
  let navigate = useNavigate();
  const location = useLocation();

  console.log(props, location);
  return (
    <Box>
      <Nav className='rb-navbar '>
        <Nav.Item>
          <MuiLink
            onClick={(e) => {
              navigate("/character-voice-actor-page", {
                state: {
                  voiceActor: props.animeId
                    ? props.animeId
                    : location.state.voiceActor,
                  animeList: props.animeRecList
                    ? props.animeRecList
                    : location.state.animeList,
                  roleList: props.charList,
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
            to='/voice-actor-role-list-page'
            state={{
              voiceActor: props.animeId
                ? props.animeId
                : location.state.voiceActor,
              animeList: props.animeRecList
                ? props.animeRecList
                : location.state.animeList,
              roleList: props.charList,
            }}
          >
            <Typography
              className='anime-info-content-navbar-items'
              sx={{ fontSize: 28 }}
            >
              Roles
            </Typography>
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link
            to='/voice-actor-anime-list-page'
            state={{
              voiceActor: props.animeId,
              animeList: props.animeRecList
                ? props.animeRecList
                : location.state.animeList,
              roleList: props.charList,
            }}
            onClick={(e) => console.log(location, props)}
          >
            <Typography
              className='anime-info-content-navbar-items'
              sx={{ fontSize: 28 }}
            >
              Anime
            </Typography>
          </Link>
        </Nav.Item>
      </Nav>
    </Box>
  );
}

export default VoiceActorDetails;
