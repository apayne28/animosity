import { Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

import React from "react";
import { Nav } from "react-bootstrap";

function CharacterDetails(props) {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(location, props);
  return (
    <Box>
      <Nav className='rb-navbar '>
        <Nav.Item>
          <MuiLink
            onClick={(e) => {
              navigate("/character-profile", {
                state: {
                  characterId: props.characterId
                    ? props.characterId
                    : location.state.voiceActor,
                  voiceActors: props.voiceActors,
                  animeList: props.animeList,
                  mangaList: props.mangaList,
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
        {props.voiceActors.length > 0 && (
          <Box>
            <Nav.Item>
              <Link
                to='/character-page-voice-actor-list'
                state={{
                  characterId: props.characterId
                    ? props.characterId
                    : location.state.voiceActor,
                  voiceActors: props.voiceActors,
                  animeList: props.animeList,
                  mangaList: props.mangaList,
                }}
              >
                <Typography
                  className='anime-info-content-navbar-items'
                  sx={{ fontSize: 28 }}
                >
                  Voice Actors
                </Typography>
              </Link>
            </Nav.Item>
          </Box>
        )}

        {props.animeList.length > 0 && (
          <Box>
            <Nav.Item>
              <Link
                to='/character-page-anime-list'
                state={{
                  characterId: props.characterId
                    ? props.characterId
                    : location.state.voiceActor,
                  voiceActors: props.voiceActors,
                  animeList: props.animeList,
                  mangaList: props.mangaList,
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
          </Box>
        )}

        {props.mangaList.length > 0 && (
          <Box>
            <Nav.Item>
              <Link
                to='/character-page-manga-list'
                state={{
                  characterId: props.characterId
                    ? props.characterId
                    : location.state.voiceActor,
                  voiceActors: props.voiceActors,
                  animeList: props.animeList,
                  mangaList: props.mangaList,
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
          </Box>
        )}
      </Nav>
    </Box>
  );
}

export default CharacterDetails;
