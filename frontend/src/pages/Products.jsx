import React, { useContext } from 'react'
import {Shopcontext} from '../context/Shopcontext'
import { useParams } from 'react-router-dom';
import  Breadcrums  from '../components/Breadcrums/Breadcrums';
import { Productdisplay } from '../components/Productdisplay/Productdisplay';
import { Descriptionbox } from '../components/Descriptionbox/Descriptionbox';
import { Relatedproducts } from '../components/Relatedproducts/Relatedproducts';
export default function Products() {
  const {all_product}= useContext(Shopcontext);
  const {productId}= useParams();
  const product = all_product.find((e)=>e.id===Number(productId));
  return (
    <div>
      <Breadcrums product={product}/>
      <Productdisplay product={product}/>
      <Descriptionbox/>
      <Relatedproducts/>
    </div>
  )
}