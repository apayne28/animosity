import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Box } from "@mui/system";
import logo from "../../../logo2.png";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  return (
    <Box data-testid='animosity-navigation-bar'>
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
    </Box>
   
  );
};

export default NavigationBar;
