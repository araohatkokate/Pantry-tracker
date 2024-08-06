// components/UploadPhoto.js
import { useState } from 'react';
import { Button, TextField, Box } from "@mui/material";
import { storage } from "./firebase/firebaseconfig";
 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
 
const UploadPhoto = ({ onUpload }) => {
  const [file, setFile] = useState(null);
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
 
  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      onUpload(downloadURL);
      setFile(null);
    }
  };
 
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
        Upload Photo
      </Button>
    </Box>
  );
};
 
export default UploadPhoto;