import React from 'react'
import './relatedproducts.css'
import data_product from '../assests/data'
import {Items}  from '../Items/Items'
export const Relatedproducts = () => {
  return (
    <div className='relatedproducts'>
    <h1>RelatedProducts</h1>
    <hr />
    <div className="relatedproducts-item">
        {data_product.map((v,i)=>{
             return <Items key={i} id={v.id} name={v.name} image={v.image} new_price ={v.new_price} old_price={v.old_price}/>
        })}
    </div>


    </div>
  )
}
