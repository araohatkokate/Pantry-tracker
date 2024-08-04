"use client";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { firestore } from "@/firebase"
import { Box, Typography } from "@mui/material";
import { collection, getDoc, getDocs, query } from "firebase/firestore";

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

  const removeitem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docsnap = await getDoc(docRef)

    if(docsnap.exists()){
      const {quantity} = docsnap.data()
    }
  }

  useEffect (()=>{
    updateinventory()
  }, [])

  return (
  <Box>
    <Typography variant="h1">Pantry Tracker</Typography>
    {inventory.forEach((item)=> {
      console.log(item)
      return (
      <Box>
      {item.name}
      {item.count}
      </Box>
      )
    })}
  </Box> 
  )
}
