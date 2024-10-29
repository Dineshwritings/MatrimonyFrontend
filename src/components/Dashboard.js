import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = ({ role }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome {role === 'superuser' ? 'Superuser' : 'Admin'}!</Typography>
      {role === 'superuser' && (
        <Typography variant="h6">You can create Admins.</Typography>
      )}
      {role === 'admin' && (
        <Typography variant="h6">You have limited access.</Typography>
      )}
    </Box>
  );
};

export default Dashboard;
