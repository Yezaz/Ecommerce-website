import React from 'react'
import './breadcrum.css'
import arrow from '../assests/breadcrum_arrow.png'
const Breadcrums = (props) => {
    const {product}=props;
  return (
    <div className='breadcrum'>
        Home <img src={arrow} alt="" /> SHOP <img src={arrow} alt="" />{product.category} <img src={arrow} alt="" /> {product.name}
    </div>
  )
}
export default Breadcrums;
