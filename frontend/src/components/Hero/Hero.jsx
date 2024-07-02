import React from 'react'
import './hero.css'
import hand_icon from '../assests/hand_icon.png'
import arrow_icon from '../assests/arrow.png'
import hero_img from '../assests/hero_image.png'
import { Link } from 'react-router-dom'
export default function Hero() {
  return (
    <div className='hero'>
    <div className="heroleft">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className='hero-hand-icon'>
            <p>new</p>
            <img src={hand_icon} alt='handicon'></img>
        </div>
        <p>Collection</p>
        <p>for everyone</p>
        <div className="hero-latest-btn">
       <Link to='/new' style={{textDecoration:'none', color:'white'}}><div>Latest Collection</div></Link> 
        <img src={arrow_icon} alt='arrowicon'></img>
    </div>
    </div>
    

    <div className="heroright">
        <img src={hero_img} alt='heroimg'></img>
    </div>
    </div>
  )
}
