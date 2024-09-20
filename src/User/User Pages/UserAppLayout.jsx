import React from 'react'
import UserNavbar from '../User Components/Navbar'
import { Outlet } from 'react-router-dom'

export default function UserAppLayout() {
  return (
    <>
        <UserNavbar/>
        <Outlet/>

    </>
  )
}
