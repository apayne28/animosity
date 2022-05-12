import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../logo2.png";

const Header = () => {
  return (
    <header className='page-header'>
      <h1>
        <Link to='/'>
          <Box component='img' src={logo} alt='Animosity Logo' />
        </Link>
      </h1>

      {/* <div className='header-navigation-buttons'>
        <Button>Login</Button>
        <Button>Signup</Button>
      </div> */}
    </header>
  );
};

export default Header;
