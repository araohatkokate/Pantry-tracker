"use client";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { firestore } from "@/firebase"
import { Box, Modal, Typography, Stack, Button, TextField, createTheme } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, setDoc, deleteDoc } from "firebase/firestore";
import SearchAppBar from "./searchbar";
/*import { createTheme, ThemeProvider } from "@mui/material"*/

/*const theme = createTheme()*/

export default function Home() {
  const [inventory, setinventory] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([])
  const [open, setopen] = useState(false)
  const [itemName, setitemName] = useState('')

  const updateinventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventorylist = []
    docs.forEach((doc)=>{
      inventorylist.push(
        {
          name:doc.id,
          ...doc.data(),
        }
      )
    })
    setinventory(inventorylist)
    setFilteredInventory(inventorylist)
    console.log(inventorylist)
  }

  const additem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity+1})
    }
      
    else{
        await setDoc(docRef, {quantity:1})
    }
    await updateinventory()
  }
  
  const removeitem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity===1){
        await deleteDoc(docRef)
      }

      else{
        await setDoc(docRef, {quantity: quantity-1})
      }
    }

    await updateinventory()
  }

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setFilteredInventory(inventory.filter(item=> item.name.toLowerCase().includes(query)));
  };

  useEffect (()=>{
    updateinventory()
  }, [])

  const handleOpen = () => setopen(true)
  const handleClose = () => setopen(false)

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box width="800px" display="flex" flexDirection="column" alignItems="center" gap={2}>
        <SearchAppBar onSearchChange={handleSearchChange} />
        <Button variant="contained" onClick={handleOpen}>
          Add new item
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="white"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%,-50%)"
            }}
          >
            <Typography variant="h6">Add Item</Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                variant='outlined'
                fullWidth
                value={itemName}
                onChange={(e) => setitemName(e.target.value)}
              />
              <Button variant="outlined" onClick={() => {
                additem(itemName);
                setitemName('');
                handleClose();
              }}>
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Box border="1px solid #333">
          <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h2" color="#333">
              Pantry Items
            </Typography>
          </Box>
          <Stack width="800px" height="300px" spacing={2} overflow="auto">
            {filteredInventory.map(({ name, quantity }) => (
              <Box key={name} display="flex" alignItems="center" justifyContent="space-between" padding={5}>
                <Typography variant="h3" textAlign="center">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h3" textAlign="center">
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => additem(name)}>
                  Add
                </Button>
                <Button variant="contained" onClick={() => removeitem(name)}>
                  Remove
                </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
