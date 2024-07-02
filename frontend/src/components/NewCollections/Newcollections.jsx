import React, { useEffect, useState } from 'react'
import './newcollections.css'
import { Items } from '../Items/Items'
export const Newcollections = () => {

  const [new_collection,setnewcollection]=useState([]);
  useEffect(()=>{
    fetch('ecommerce-website-backend-ecru.vercel.app/newcollection')
    .then((res)=>res.json()).then((data)=>setnewcollection(data));
  },[])
  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
            {new_collection.map((v,i)=>{
                return <Items key={i} id={v.id} name={v.name} image={v.image} new_price ={v.new_price} old_price={v.old_price}/>
            })}
        </div>
    </div>
  )
}
