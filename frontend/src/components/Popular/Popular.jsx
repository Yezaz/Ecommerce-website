import React, { useEffect, useState } from 'react'
import './popular.css'
import { Items } from '../Items/Items'
export const Popular = () => {
  const [popularproducts, setpopularproducts] = useState([]);

  useEffect(()=>{
    fetch('https://ecommerce-website-backend-ecru.vercel.app/popularinwomen')
    .then((response)=>response.json())
    .then ((data)=>setpopularproducts(data));
  },[])
  return (
    <div className='popular'>
        <h1>Popular in women</h1>
        <hr/>
        <div className="popular-item">
            {popularproducts.map((v,i)=>{
                return <Items key={i} id={v.id} name={v.name} image={v.image} new_price ={v.new_price} old_price={v.old_price}/>
            })}
        </div>
    </div>
  )
}
