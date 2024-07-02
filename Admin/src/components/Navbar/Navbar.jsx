import React from 'react'
import './navbar.css'
import navlogo from '../../assets/nav_logo.png'
import navprofile from '../../assets/nav-profile.jpg'
const Navbar = () => {
  return (
    <div className='navbar'>
    <img src={navlogo} alt="" className='nav-logo'/><h1>KhaZar (Admin Pannel)</h1>
    <img src={navprofile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar