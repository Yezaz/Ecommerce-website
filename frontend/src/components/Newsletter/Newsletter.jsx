import React from 'react'
import './newsletter.css'
export const Newsletter = () => {
  const subs= ()=>{
    alert("Thank you For subscribing KHAZAR");
  }
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type='email' placeholder='Your Email id'/>
            <button onClick={subs}>Subscribe</button>
            
        </div>
    </div>
  )
}
