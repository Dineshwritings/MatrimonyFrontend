import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ProfileContainer from './pages/ProfileContainer'; // Adjust the path as needed
import Auth from './components/Auth'; // Import Auth component
import CreateAdmin from './components/CreateAdmin'; // Import CreateAdmin component
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth); // Get authentication status and user role from Redux
  const [isFormOpen, setIsFormOpen] = useState(false); // State for profile form
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false); // State for admin creation dialog

  const handleCreateProfileClick = () => {
    setIsFormOpen(true); // Open the profile form dialog
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  const handleCreateAdminClick = () => {
    setIsAdminDialogOpen(true); // Open the create admin dialog
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Matrimony App</Typography>
          {isAuthenticated ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateProfileClick}
                sx={{ marginRight: 2 }} // Add some margin for spacing
              >
                Create Profile
              </Button>
              {role === 'superuser' && ( // Show the Create Admin button only for superusers
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateAdminClick}
                >
                  Create Admin
                </Button>
              )}
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {isAuthenticated ? (
        <>
          <ProfileContainer isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
          {role === 'superuser' && ( // Conditionally render CreateAdmin dialog for superuser
            <CreateAdmin isOpen={isAdminDialogOpen} onClose={() => setIsAdminDialogOpen(false)} />
          )}
        </>
      ) : (
        <Auth /> // Show the Auth component if not authenticated
      )}
    </div>
  );
};

export default App;
