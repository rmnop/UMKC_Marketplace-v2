import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <img src={assets.logo} alt="" className="logo" />
      </div>
    </div>
  )
}

export default Navbar
