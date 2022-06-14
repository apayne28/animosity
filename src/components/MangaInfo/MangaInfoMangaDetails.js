import React from "react";
import { Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

function MangaInfoMangaDetails(props) {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(props, location);
  return (
    <Box>
      <Nav className='rb-navbar '>
        <Nav.Item>
          <MuiLink
            onClick={(e) => {
              navigate("/manga-info", {
                state: { mangaId: location.state.mangaId },
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
            to='/manga-character-list-page'
            state={{
              mangaId: props.mangaId,
              mangaRecList: props.mangaRecList,
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
        {props.mangaRecList && props.mangaRecList.length > 0 && (
          <Box>
            <Nav.Item>
              <Link
                to='/manga-recs-page'
                state={{
                  mangaId: props.mangaId,
                  mangaRecList: props.mangaRecList,
                  charList: props.charList,
                }}
                onClick={() => console.log(location, props)}
              >
                <Typography
                  className='anime-info-content-navbar-items'
                  sx={{ fontSize: 28 }}
                >
                  Recommendations
                </Typography>
              </Link>
            </Nav.Item>
          </Box>
        )}
      </Nav>
    </Box>
  );
}

export default MangaInfoMangaDetails;
