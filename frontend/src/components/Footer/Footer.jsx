import React from 'react'
import './footer.css'
import footer_logo from '../assests/logo_big.png'
import ig_logo from '../assests/instagram_icon.png'
import pin_icon from '../assests/pintester_icon.png'
import whatapp_icon from '../assests/whatsapp_icon.png'
export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt='footerlogo'/>
            <p>KHAZAR</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-image-container">
                <img src={ig_logo} alt="Instagram" />
            </div>
            <div className="footer-image-container">
                <img src={pin_icon} alt="pintrest" />
            </div>
            <div className="footer-image-container">
                <img src={whatapp_icon} alt="whatsapp" />
            </div>
        </div>
        <div className="footercopyright">
            <hr/>
            <p>Copyright @ 2024- All Rights Reserved</p>
        </div>
    </div>
  )
}
