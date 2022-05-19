import {
  Button,
  MenuItem,
  Select,
  TextField,
  IconButton,
  AppBar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import React from "react";
import SearchBar from "./SearchBar";
import { Box } from "@mui/system";
import logo from "../../../logo2.png";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  let defaultItems;

  const [animeList, setAnimeList] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("anime");
  let navigate = useNavigate();

  // const [animeList, setAnimeList] = useState([]);

  // const [search, setSearch] = useState("");

  // const FetchAnime = async (query) => {
  //   // const temp = await fetch(
  //   //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
  //   // ).then((res) => res.json());

  //   const temp = await jikanjsV3.search("anime", query, 1);
  //   // const temp = await client.

  //   setAnimeList(temp.results);
  // };

  // const HandleSearch = (e) => {
  //   e.preventDefault();

  //   FetchAnime(search);

  // navigate(`/search-page`, {
  //   state: { searchQuery: search, searchType: type },
  // });
  //   console.log(search);
  // };

  const FetchAnime = async (query) => {
    // const temp = await fetch(
    //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
    // ).then((res) => res.json());

    const temp = await jikanjsV3.search("anime", query, 1);
    // const temp = await client.

    setAnimeList(temp.results);
  };

  return (
    <Navbar className='rb-navbar' variant='light' expand='lg'>
      <Navbar.Brand>
        <Link to='/'>
          <Box component='img' src={logo} alt='Animosity Logo' />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav
          style={
            {
              // margin: "auto",
              // marginLeft: "2%",
            }
          }
        >
          <NavDropdown
            title='Anime'
            id='navbarScrollingDropdown'
            style={{ fontSize: 30, paddingRight: "10%", marginTop: "0.5%" }}
          >
            <NavDropdown.Item>
              <Link
                to='/top-anime'
                style={{
                  textDecoration: "none",
                  color: "#3B2C35",
                  fontSize: 25,
                }}
                state={{ topFilter: " ", type: "anime" }}
              >
                Top Anime
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title='Manga'
            style={{ fontSize: 30, paddingRight: "50%" }}
          >
            <NavDropdown.Item>
              <Link
                to='/top-manga '
                style={{
                  textDecoration: "none",
                  color: "#3B2C35",
                  fontSize: 25,
                }}
                state={{ topFilter: " ", type: "manga" }}
              >
                Top Manga
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <SearchBar />
      </Nav>
    </Navbar>
    // <AppBar position='static' sx={{ backgroundColor: "#59C9A5" }}>
    //   <div>
    //     {/* <Box>
    //       <Link to='/'>
    //         <Box component='img' src={logo} alt='Animosity Logo' />
    //       </Link>
    //     </Box> */}
    //     <div className='navigation-bar-items'>
    //       {/* <Typography>Anime</Typography> */}
    //       <Link to='/top-anime' state={{ topFilter: " ", type: "anime" }}>
    //         <Typography>Anime</Typography>
    //       </Link>

    //       {/* <Typography>Manga</Typography> */}
    //       <Link to='/top-manga' state={{ topFilter: " ", type: "manga" }}>
    //         <Typography>Manga</Typography>
    //       </Link>
    //       {/* <Link to='/genre-list-page'>
    //         <Typography>Genres</Typography>
    //       </Link> */}
    //       {/* <Typography>Genres</Typography> */}
    //       <SearchBar
    //       // HandleSearch={HandleSearch}
    //       // search={search}
    //       // SetSearch={setSearch}
    //       // animeList={animeList}
    //       />

    //       {/* </Link> */}
    //     </div>
    //     <div className='navigation-bar-search-bar'></div>
    //   </div>
    // </AppBar>

    //  <Select
    //         labelid='search-bar-type-filter'
    //         value={type}
    //         label='Type'
    //         onChange={(e, data) => {
    //           setType(data.props.value);
    //           console.log(type);
    //         }}
    //         // sx={{
    //         //   display: "flex",
    //         //   flexDirection: "column",
    //         //   alignItems: "flex-start",
    //         //   position: "absolute",
    //         //   width: "126px",
    //         //   height: "48px",
    //         //   left: "2530px",
    //         //   top: "72px",
    //         //   backgroundColor: "#fff",
    //         // }}
    //       >
    //         <MenuItem value='anime'>Anime</MenuItem>
    //         <MenuItem value='manga'>Manga</MenuItem>
    //       </Select>

    //       <form
    //         className='search-box'
    //         onSubmit={async (e) => {
    //           e.preventDefault();

    //           FetchAnime(search);
    //           console.log(search, e.charCode);
    //           navigate(`/search-page`, {
    //             state: { searchQuery: search, searchType: type },
    //           });
    //           window.location.reload();
    //         }}
    //       >
    //         <TextField
    //           type='search'
    //           placeholder='Search for an anime...'
    //           required
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //           // sx={{
    //           //   display: "flex",
    //           //   flexDirection: "column",
    //           //   alignItems: "flex-start",
    //           //   position: "absolute",
    //           //   width: "220px",
    //           //   height: "48px",
    //           //   left: "2731px",
    //           //   top: "70px",
    //           // }}
    //         />
    //       </form>

    //       {/* <Link to='/search-page' state={{ list: animeList, searchQuery: search }}> */}
    //       <IconButton
    //         onClick={async (e) => {
    //           e.preventDefault();

    //           FetchAnime(search);
    //           console.log(search, e.charCode);
    //           navigate(`/search-page`, {
    //             state: { searchQuery: search, searchType: type },
    //           });
    //           window.location.reload();
    //         }}
    //         // sx={{
    //         //   display: "flex",
    //         //   flexDirection: "column",
    //         //   justifyContent: "center",
    //         //   alignItems: "center",
    //         //   position: "absolute",
    //         //   width: "220px",
    //         //   height: "48px",
    //         //   left: "2840px",
    //         //   top: "70px",
    //         // }}
    //       >
    //         <SearchIcon />
    //       </IconButton>
  );
};

export default NavigationBar;
