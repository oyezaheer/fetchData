// src/components/SearchBar.js
import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      fullWidth
      className="search-bar"
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={onSearchChange}
      margin="normal"
    />
  );
};

export default SearchBar;
