"use client";
import React from 'react'
import { signOut } from 'next-auth/react'
const dashboard = () => {

  const handleSignOut = async () => {
    await signOut({callbackUrl: "/pages/login"});
  };
  return (
   
      <div>

<button className='absolute bg-white text-black m-4 top-4 right-2' onClick={handleSignOut}>Sign Out</button>
  
    <div className='text-white bg-black items-center flex justify-center min-h-screen'>
      <p className='font-bold text-3xl font-serif'>Welcome to Dashboard</p>
      
     
      
      </div>
    </div>
   
  )
}

export default dashboard

