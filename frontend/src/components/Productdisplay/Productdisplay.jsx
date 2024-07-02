import React, { useContext } from 'react'
import './productdisplay.css'
import star_dull from '../assests/star_dull_icon.png'
import star from '../assests/star_icon.png'
import { Shopcontext } from '../../context/Shopcontext'
export const Productdisplay = (props) => {
    const {product}=props;
    const {addtocart} = useContext(Shopcontext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
              <img src={product.image} alt="" />  
              <img src={product.image} alt="" />  
              <img src={product.image} alt="" />  
              <img src={product.image} alt="" />  
            </div>
            <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star_dull} alt="" />
                <p>122</p>
            </div>
            <div className="productdisplay-right-prices">
              <div className="productdisplay-right-price-old">${product.old_price}</div>
              <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
              A lightweight, usually knitteed , pullover,shirt
            </div>
            <div className="productdisplay-right-size">
              <h1>Selcect size</h1>
              <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
              </div>
              <button onClick={()=>{addtocart(product.id)}}>Add to cart</button>
              <p classname='productdisplay-right-category'><span>Category :</span>Women, t-shirt, crop top</p>
              <p classname='productdisplay-right-category'><span>Tags:</span>Modren, Latest</p>
            </div>
        </div>
    </div>
  )
}