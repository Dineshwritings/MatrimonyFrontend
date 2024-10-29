// src/components/ProfileContainer.js
import React from 'react';
import ProfileForm from '../components/ProfileForm';
import ProfileList from './ProfileList'; // Adjust the path as needed

const ProfileContainer = ({ isFormOpen, setIsFormOpen }) => {
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      {isFormOpen ? (
        <ProfileForm onClose={handleCloseForm} />
      ) : (
        <ProfileList />
      )}
    </div>
  );
};

export default ProfileContainer;
