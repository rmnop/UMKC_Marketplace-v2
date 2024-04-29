import React, {useContext, useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { MarketContext } from '../../Context/MarketContext'

const Navbar = ({setShowLogin}) => {

   const [menu, setMenu] = useState("home");
   const { getTotalCartAmount, token ,setToken } = useContext(MarketContext);
   const navigate = useNavigate();

   const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }
   
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
        <ul className='navbar-menu'>
            <li onClick={()=>setMenu("home")}className={menu ==="home" ? "active": ""}>Home</li>
            <li onClick={()=>setMenu("Categories")}className={menu ==="Categories" ? "active": ""}>Categories</li>
            <li onClick={()=>setMenu("Messages")}className={menu === "Messages" ? "active": ""}>Messages</li>
            <li onClick={()=>setMenu("contact-us")}className={menu === "contact-us" ? "active": ""}>Contact Us</li>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="" />
            <div className='navbar-search-icon'>
               <Link to='/cart'> <img src={assets.basket_icon} alt="" />
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div></Link>
            </div>
             {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <p>Logout</p></li> 
            </ul>
          </div>
        }

        </div>
    </div>
  )
}

export default Navbar
