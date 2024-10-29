import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  createProfileStart,
  createProfileSuccess,
  createProfileFailure,
} from "../features/profileSlice";

const ProfileForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    gender: "",
    height: "",
    colour: "",
    nativePlace: "",
    bodyType: "",
    physicalStatus: "",
    contactNumber: "",
    email: "",
    dob: "",
    placeOfBirth: "",
    timeOfBirth: "",
    dosham: "",
    star: "",
    rasi: "",
    padam: "",
    gothram: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    sisters: "",
    brothers: "",
    familyStatus: "",
    familyType: "",
    partnerHeight: "",
    partnerAge: "",
    partnerCaste: "",
    partnerEducation: "",
    partnerLocation: "",
    partnerWorking: "",
    partnerCountry: "",
    paidAmount: "",
    agentName: "",
    profileId: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dyebgieff/image/upload`; // replace YOUR_CLOUD_NAME with your Cloudinary cloud name
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shashi-test"); // replace with your upload preset

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return the secure URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProfileStart());

    try {
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      // Append the image URL to the formData
      const dataToSend = {
        ...formData,
        image: imageUrl,
      };

      const response = await fetch("http://localhost:5000/api/profiles/", {
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Origin': 'http://localhost:3000',
          'Referer': 'http://localhost:3000/',
          'Content-Type': 'application/json', // Ensure to send as JSON
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      const data = await response.json();
      dispatch(createProfileSuccess(data));
      if (typeof onClose === "function") {
        onClose(); // Close the form after successful submission
      }
    } catch (error) {
      dispatch(createProfileFailure(error.message));
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, position: 'relative', maxHeight: '75vh', overflow: 'hidden' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create Profile</Typography>
          <IconButton
            onClick={onClose}
            style={{ position: "absolute", top: 10, right: 10 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

    
        <Box sx={{ mt: 2, maxHeight: '60vh', overflowY: 'auto', '&::-webkit-scrollbar': { width: '8px' } }}>
          <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
                {imagePreview && (
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Image Preview"
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                      marginLeft: 2,
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Surname"
                  name="surname"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Age"
                  name="age"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gender"
                  name="gender"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
         
              <Grid item xs={6}>
                <TextField
                  label="Height"
                  name="height"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Colour"
                  name="colour"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Native Place"
                  name="nativePlace"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Body Type"
                  name="bodyType"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Physical Status"
                  name="physicalStatus"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="E-mail ID"
                  name="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date of Birth"
                  name="dob"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Place of Birth"
                  name="placeOfBirth"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Time of Birth"
                  name="timeOfBirth"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Dosham"
                  name="dosham"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Star"
                  name="star"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Rasi"
                  name="rasi"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Padam"
                  name="padam"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gothram"
                  name="gothram"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Father's Name"
                  name="fatherName"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mother's Name"
                  name="motherName"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Father's Occupation"
                  name="fatherOccupation"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mother's Occupation"
                  name="motherOccupation"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Number of Sisters"
                  name="sisters"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Number of Brothers"
                  name="brothers"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Family Status"
                  name="familyStatus"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Family Type"
                  name="familyType"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Partner's Height"
                  name="partnerHeight"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Partner's Age"
                  name="partnerAge"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Partner's Caste"
                  name="partnerCaste"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Partner's Education"
                  name="partnerEducation"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Partner's Location"
                  name="partnerLocation"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Partner's Working Status"
                  name="partnerWorking"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Partner's Country"
                  name="partnerCountry"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Paid Amount"
                  name="paidAmount"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Agent's Name"
                  name="agentName"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Profile ID"
                  name="profileId"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileForm;
