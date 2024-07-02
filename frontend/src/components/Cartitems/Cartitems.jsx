import React, { useContext } from 'react'
import './cartitems.css'
import { Shopcontext } from '../../context/Shopcontext'
import remove_icon from '../assests/cart_cross_icon.png'
const Cartitems = () => {
    const {gettotalcartamount,all_product,cartitem,removefromcart} = useContext(Shopcontext);

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
        </div>
        <hr/>
       {all_product.map((e)=>{
        if(cartitem[e.id]>0)
            {
                return  <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className='carticon-product-icon'/>
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitems-quantity'>{cartitem[e.id]}</button>
                    <p>${e.new_price*cartitem[e.id]}</p>
                    <img src={remove_icon} onClick={()=>{removefromcart(e.id)}} alt="" className='carticon-remove-items'/>
                </div>
                <hr />
            </div>
            }
            return null;
       })}
       <div className="vartitems-down">
        <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${gettotalcartamount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${gettotalcartamount()}</h3>
                </div>
                <button>Proceed to checkout</button>
            </div>
           
        </div>
        <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promocode' />
                    <button>Submit</button>
                </div>
            </div>
       </div>

    </div>
  )
}

export default Cartitems