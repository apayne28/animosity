import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Box } from "@mui/system";
import logo from "../../../logo2.png";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  return (
    <Navbar className='rb-navbar' variant='light' expand='lg'>
      <Navbar.Brand>
        <Link to='/'>
          <Box component='img' src={logo} alt='Animosity Logo' />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav>
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
