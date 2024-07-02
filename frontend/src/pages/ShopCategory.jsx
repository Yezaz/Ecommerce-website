import React, { useContext } from 'react';
import './CSS/shopcategory.css';
import { Shopcontext } from '../context/Shopcontext';
import ddp from '../components/assests/dropdown_icon.png';
import { Items } from '../components/Items/Items';
import { Link } from 'react-router-dom';

const ShopCategory = (props) => {
  const {all_product} = useContext(Shopcontext);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
      </div> 
      <div className="shopcategory-products">
        {all_product.map((v,i)=>{
          if(props.category===v.category)
            {
              return <Items key={i} id={v.id} name={v.name} image={v.image} new_price ={v.new_price} old_price={v.old_price}/>
            }
          else{
            return null;
          }
        })}
      </div>
     <Link to='/kids' style={{textDecoration:"none"}}> <div className="shopcategory-loadmore">Explore More</div> </Link>
    </div>
  )
}
export default ShopCategory;