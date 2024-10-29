import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Snackbar, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false); // State for "stay logged in" checkbox
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { username, password, stayLoggedIn }, // Include stayLoggedIn in the request body
        {
          headers: {
            'Accept': '*/*',
            'Origin': 'http://localhost:3000',
            'Referer': 'http://localhost:3000/',
          }
        }
      );
      const { token, role } = response.data;

      localStorage.setItem('token', token); // Save token to localStorage
      dispatch(login({ token, role })); // Dispatch login action

      setMessage('Login successful');
      setOpenSnackbar(true);
      // Redirect to dashboard or home page, if needed
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error occurred');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center">Login</Typography>
      <TextField 
        label="Username" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <TextField 
        label="Password" 
        variant="outlined" 
        type="password" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <FormControlLabel
        control={
          <Checkbox 
            checked={stayLoggedIn} 
            onChange={(e) => setStayLoggedIn(e.target.checked)} 
          />
        }
        label="Stay logged in"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)} 
        message={message} 
      />
    </Box>
  );
};

export default Auth;
