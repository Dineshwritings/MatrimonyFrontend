import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import { fetchProfiles } from '../features/profileSlice';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

const ProfileList = () => {
  const dispatch = useDispatch();
  const { profiles, totalPages, currentPage, loading, error } = useSelector((state) => state.profiles);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [view, setView] = useState('grid');

  const fetchProfilesData = (page) => {
    dispatch(fetchProfiles({ page, limit: 10 }));
  };

  useEffect(() => {
    fetchProfilesData(currentPage);
  }, [dispatch, currentPage]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://matrimony-dqx4.onrender.com/api/deleteprofile/${deleteProfileId}`);
      setMessage('Profile deleted successfully');
      setOpenSnackbar(true);
      fetchProfilesData(currentPage);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error deleting profile');
      setOpenSnackbar(true);
    } finally {
      setConfirmDialogOpen(false);
      setDeleteProfileId(null);
    }
  };

  const openConfirmDialog = (profile) => {
    setDeleteProfileId(profile._id);
    setConfirmDialogOpen(true);
  };

  const handleViewChange = (event, nextView) => {
    if (nextView) {
      setView(nextView);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* View Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
        >
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <GridViewIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error">{error}</Typography>
      ) : profiles.length === 0 ? (
        <Typography variant="h6" color="error">Profiles not available</Typography>
      ) : view === 'grid' ? (
        <Grid container spacing={2}>
          {profiles.map((profile) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={profile.profileId}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={profile.image || '/default-face-icon.png'}
                  alt="Profile Image"
                  sx={{
                    height: 140,
                    backgroundColor: profile.image ? 'none' : '#f0f0f0',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {profile.name} {profile.surname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Age: {profile.age} | Gender: {profile.gender} | Height: {profile.height}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Father: {profile.fatherName} ({profile.fatherOccupation})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Mother: {profile.motherName} ({profile.motherOccupation})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Siblings: {profile.brothers} brothers, {profile.sisters} sisters
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Family Type: {profile.familyType}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={() => openConfirmDialog(profile)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <List>
          {profiles.map((profile) => (
         <ListItem
         key={profile.profileId}
         sx={{
           display: 'flex',
           flexDirection: 'row',
           alignItems: 'center',
           border: '1px solid #ddd',
           borderRadius: 2,
           mb: 2,
           boxShadow: 1,
           padding: 2,
         }}
         secondaryAction={
           <Button
             variant="outlined"
             color="secondary"
             onClick={() => openConfirmDialog(profile)}
           >
             Delete
           </Button>
         }
       >
         <Box sx={{ mr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           {profile.image ? (
             <Avatar
               src={profile.image}
               alt="Profile Image"
               sx={{ width: 100, height: 100, borderRadius: 2 }}
             />
           ) : (
             <Avatar
               sx={{
                 width: 100,
                 height: 100,
                 borderRadius: 2,
                 backgroundColor: '#f0f0f0',
               }}
             >
               <AccountCircleIcon fontSize="large" />
             </Avatar>
           )}
         </Box>
         <ListItemText
           primary={
             <Typography variant="h6" fontWeight="bold">
               {profile.name} {profile.surname}
             </Typography>
           }
           secondary={
             <>
               <Typography variant="body2" color="textSecondary">
                 Age: {profile.age} | Gender: {profile.gender} | Height: {profile.height}
               </Typography>
               <Typography variant="body2" color="textSecondary">
                 Father: {profile.fatherName} ({profile.fatherOccupation})
               </Typography>
               <Typography variant="body2" color="textSecondary">
                 Mother: {profile.motherName} ({profile.motherOccupation})
               </Typography>
               <Typography variant="body2" color="textSecondary">
                 Siblings: {profile.brothers} brothers, {profile.sisters} sisters
               </Typography>
               <Typography variant="body2" color="textSecondary">
                 Family Type: {profile.familyType}
               </Typography>
             </>
           }
         />
       </ListItem>
       
          ))}
        </List>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => fetchProfilesData(currentPage - 1)}
        >
          Previous
        </Button>
        <Typography variant="body1">{`Page ${currentPage} of ${totalPages}`}</Typography>
        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => fetchProfilesData(currentPage + 1)}
        >
          Next
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this profile?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </Box>
  );
};

export default ProfileList;
