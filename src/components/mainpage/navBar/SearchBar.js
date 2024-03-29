import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Form, Form as RBForm } from "react-bootstrap";

const SearchBar = (props) => {


  const [search, setSearch] = useState("");
  const [type, setType] = useState("anime");
  let navigate = useNavigate();
  const isValid = search.length >= 3;



  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();


      console.log(search, type);
      navigate(`/search-page`, {
        state: { searchQuery: search, searchType: type },
      });
      window.location.reload();
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className='search-bar-container' >
      <div className='search-bar-select-button'>
        <RBForm.Select
        data-testid="search-bar-select-button"
          onChange={(e, data) => {
            console.log(e.target.value);

            setType(e.target.value);
            console.log(type);
          }}
        >
          <option value='anime' data-testid="search-bar-select-anime-button">Anime</option>
          <option value='manga' data-testid="search-bar-select-manga-button">Manga</option>
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
        data-testid="search-bar-textbox"
          type='search'
          placeholder='Search for an anime'
          className='me-2'
          required
        />
        <Form.Control.Feedback type='invalid'>
          Must be at least 3 characters
        </Form.Control.Feedback>
        <IconButton
        data-testid="search-bar-search-icon"

          onClick={async (e) => {
            e.preventDefault();

      
            console.log(search, e.charCode);
            navigate(`/search-page`, {
              state: { searchQuery: search, searchType: type },
            });
            window.location.reload();
          }}
          sx={{ marginRight: "5%" }}
        >
          <SearchIcon />
        </IconButton>
      </RBForm>
    </div>
  );
};

export default SearchBar;
