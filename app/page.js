"use client";
import { useState, useEffect } from 'react';
import { Box, Modal, Typography, Stack, Button, TextField } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, setDoc, deleteDoc } from "firebase/firestore";
import SearchAppBar from "./searchbar";
import { firestore } from "./firebase/firebaseconfig";
import { auth } from "./firebase/firebaseconfig";
import { signInWithGoogle, logOut } from "./auth";
 
export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);
 
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
    console.log(inventoryList);
  };
 
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
 
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };
 
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
 
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };
 
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setFilteredInventory(inventory.filter(item => item.name.toLowerCase().includes(query)));
  };
 
  useEffect(() => {
    updateInventory();
  }, []);
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
<Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" bgcolor="#212121">
<Box width="100%" display="flex" justifyContent="space-between" alignItems="center" padding={2}>
<Box sx={{ flexGrow: 1 }}>
<SearchAppBar onSearchChange={handleSearchChange} />
</Box>
<Box sx={{ ml: 2 }}>
<Button variant="contained" color="primary" onClick={user ? logOut : signInWithGoogle}>
            {user ? "Log Out" : "Sign In with Google"}
</Button>
</Box>
</Box>
<Box width="800px" display="flex" flexDirection="column" alignItems="center" gap={2}>
<Button variant="contained" color="primary" onClick={handleOpen}>
          Add new item
</Button>
<Modal open={open} onClose={handleClose}>
<Box
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="#ffffff"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex" flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%,-50%)",
            }}
>
<Typography variant="h6" color="#00e676">Add Item</Typography>
<Stack direction="row" spacing={2}>
<TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
<Button
                variant="contained"
                color="primary"
                onClick={() => {
                  addItem(itemName);
                  setItemName('');
                  handleClose();
                }}
>
                Add
</Button>
</Stack>
</Box>
</Modal>
<Box border="1px solid #333" width="100%" mt={2}>
<Box width="100%" bgcolor="#212121" display="flex" alignItems="center" justifyContent="center" p={2}>
<Typography variant="h4" color="#00e676">
              CURRENT INVENTORY
</Typography>
</Box>
<Box display="flex" flexDirection="column" width="100%" p={2}>
<Box display="flex" justifyContent="space-between" padding={1} borderBottom="1px solid #333">
<Typography variant="h6" width="20%" color="#00e676">Number</Typography>
<Typography variant="h6" width="40%" color="#00e676">Items</Typography>
<Typography variant="h6" width="20%" textAlign="center" color="#00e676">Quantity</Typography>
<Typography variant="h6" width="20%" textAlign="center" color="#00e676">Edit</Typography>
</Box>
<Stack width="100%" spacing={2} overflow="auto" maxHeight="400px">
              {filteredInventory.map(({ name, quantity }, index) => (
<Box key={name} display="flex" justifyContent="space-between" alignItems="center" padding={1} borderBottom="1px solid #333">
<Typography variant="body1" width="20%" color="#00e676">{index + 1}</Typography>
<Typography variant="body1" width="40%" color="#00e676">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
<Typography variant="body1" width="20%" textAlign="center" color="#00e676">{quantity}</Typography>
<Stack direction="row" spacing={1} width="20%" justifyContent="center">
<Button variant="contained" color="primary" onClick={() => addItem(name)}>
                      Add
</Button>
<Button variant="contained" color="primary" onClick={() => removeItem(name)}>
                      Remove
</Button>
</Stack>
</Box>
              ))}
</Stack>
</Box>
</Box>
</Box>
</Box>
  );
}