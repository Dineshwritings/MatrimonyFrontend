// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onCreateProfile }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Matrimony App
        </Typography>
        <Button color="inherit" onClick={onCreateProfile}>
          Create Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
