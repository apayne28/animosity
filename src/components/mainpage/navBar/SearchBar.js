import React from "react";
import AnimeCard from "./AnimeCard";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dropdown, Form, Form as RBForm, FormControl } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const SearchBar = (props) => {
  const jikanjsV3 = require("jikanjs"); // Uses per default the API version 3
  let defaultItems;

  const [animeList, setAnimeList] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("anime");
  let navigate = useNavigate();
  const isValid = search.length >= 3;

  const FetchAnime = async (query) => {
    // const temp = await fetch(
    //   `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`,
    // ).then((res) => res.json());

    const temp = await jikanjsV3.search("anime", query, 1);
    // const temp = await client.

    setAnimeList(temp.results);
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();

      FetchAnime(search);
      console.log(search, type);
      navigate(`/search-page`, {
        state: { searchQuery: search, searchType: type },
      });
      window.location.reload();
    } else {
      e.preventDefault();
    }
  };

  // const HandleSearch = (e) => {
  //   e.preventDefault();

  //   FetchAnime(search);
  //   console.log(search);
  // };
  // console.log(props.search);

  return (
    <div className='search-bar-container'>
      <div className='search-bar-select-button'>
        {/* <Select
          labelid='search-bar-type-filter'
          value={type}
          label='Type'
          onChange={(e, data) => {
            setType(data.props.value);
            console.log(type);
          }}
          // sx={{
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "flex-start",
          //   position: "absolute",
          //   width: "126px",
          //   height: "48px",
          //   left: "2530px",
          //   top: "72px",
          //   backgroundColor: "#fff",
          // }}
        >
          <MenuItem value='anime'>Anime</MenuItem>
          <MenuItem value='manga'>Manga</MenuItem>
        </Select> */}
        {/* <Dropdown
          onChange={(e, data) => {
            setType(data.props.value);
            console.log(type);
          }}
        >
          <DropdownToggle variant='success'>{type}</DropdownToggle>
          <Dropdown.Menu>
            <Dropdown.Item value={type}>Anime</Dropdown.Item>
            <Dropdown.Item value={type}>Manga</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        <RBForm.Select
          onChange={(e, data) => {
            console.log(e.target.value);

            setType(e.target.value);
            console.log(type);
          }}
        >
          <option value='anime'>Anime</option>
          <option value='manga'>Manga</option>
        </RBForm.Select>
      </div>
      <RBForm
        className='d-flex'
        aria-label='Search'
        value={props.search}
        validated={isValid}
        onSubmit={handleSubmit}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      >
        <Form.Control
          type='search'
          placeholder='Search for an anime...'
          className='me-2'
          required
        />
        <Form.Control.Feedback type='invalid'>
          Must be at least 3 characters
        </Form.Control.Feedback>
        <IconButton
          onClick={async (e) => {
            e.preventDefault();

            FetchAnime(search);
            console.log(search, e.charCode);
            navigate(`/search-page`, {
              state: { searchQuery: search, searchType: type },
            });
            window.location.reload();
          }}
        >
          <SearchIcon />
        </IconButton>
      </RBForm>
      {/* <form
        className='search-bar-search-button-input'
        onSubmit={async (e) => {
          e.preventDefault();

          FetchAnime(search);
          console.log(search, e.charCode);
          navigate(`/search-page`, {
            state: { searchQuery: search, searchType: type },
          });
          window.location.reload();
        }}
      >
        <TextField
          type='search'
          placeholder='Search for an anime...'
          required
          value={props.search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={async (e) => {
                    e.preventDefault();

                    FetchAnime(search);
                    console.log(search, e.charCode);
                    navigate(`/search-page`, {
                      state: { searchQuery: search, searchType: type },
                    });
                    window.location.reload();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form> */}

      {/* <Link to='/search-page' state={{ list: animeList, searchQuery: search }}> */}

      {/* </Link> */}
    </div>
  );
};

export default SearchBar;
