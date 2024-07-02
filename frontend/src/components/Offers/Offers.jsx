import React from 'react'
import './offers.css'
import exclucive_image from '../assests/exclusive_image.png'
export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>Only On Best Sellers Products</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclucive_image} alt=''/>
        </div>
    </div>
  )
}
