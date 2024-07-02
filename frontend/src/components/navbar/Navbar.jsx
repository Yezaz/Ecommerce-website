import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assests/logo.png'
import cart_icon from "../assests/cart_icon.png"
import { Link } from 'react-router-dom'
import { Shopcontext } from '../../context/Shopcontext'
import dropdown from '../assests/dropdown_icon.png'

export default function Navbar() {
  const [menu,setmenu] = useState("shop")
  const {gettotalcartitems}=useContext(Shopcontext);
  const menuref= useRef();
  const dropdown_toggle= (e)=>{
    menuref.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  return (
    <div className='navbar'>
  <div className='nav-logo'>
    <img src={logo} alt="Logo" />
    <Link to ='/' style={{textDecoration:'none'}}><p>KHAZAR</p></Link>
  </div>
  <img src={dropdown} className='nav-dropdown' alt="" onClick={dropdown_toggle} />
  <ul className='nav-menu' ref={menuref}>
    <li onClick={()=>{setmenu("shop")}}><Link to='/' style={{textDecoration:'none'}}>Shop </Link> {menu === "shop" && <hr />}</li>
    <li onClick={()=>{setmenu("men")}}><Link style={{textDecoration:'none'}} to='/men'>Men </Link> {menu === "men" && <hr />}</li>
    <li onClick={()=>{setmenu("women")}}><Link style={{textDecoration:'none'}} to='/women'>Women </Link>{menu === "women" && <hr />}</li>
    <li onClick={()=>{setmenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link> {menu === "kids" && <hr />}</li>
  </ul>
  
  <div className="nav-login-cart">{/*logout functionality is also added*/}
    {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button> : <Link to='/login'> <button>Login</button></Link>}
   <Link to ='/cart'><img src={cart_icon} alt="Cart Icon"/></Link>
    <div className='nav-cart-count'>{gettotalcartitems()}</div>
  </div>
</div>
  )
} 