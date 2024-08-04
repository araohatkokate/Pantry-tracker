"use client";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { firestore } from "@/firebase"
import { Box, Modal, Typography } from "@mui/material";
import { collection, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setinventory] = useState([])
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

  useEffect (()=>{
    updateinventory()
  }, [])

  const handleOpen = () => setopen(true)
  const handClose = () => setopen(false)

  return (
  <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" gap={2}>
    <Modal open={open} onClose={handClose}>
      <Box position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
      </Box>
    </Modal>
    <Typography variant="h1">Pantry Tracker</Typography>
  </Box> 
  )
}
