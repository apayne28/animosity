import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='page-header'>
      <h1>
        <Link to='/'>
          <Typography>InsertNameHere</Typography>
        </Link>
      </h1>
      <div className='header-navigation-buttons'>
        <Button>Login</Button>
        <Button>Signup</Button>
      </div>
    </header>
  );
};

export default Header;
