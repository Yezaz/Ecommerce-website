import React, { useEffect, useState } from 'react';
import './listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

const Listproduct = () => {
  const [allproducts, setallproducts] = useState([]);

  const fetchinfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setallproducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchinfo();
  }, []);
  const remove_product = async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type' : 'application/json',

      },
      body:JSON.stringify({id:id})
    })
    await fetchinfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr /> 
        {allproducts.map((product, index) => (
          
          <div key={index} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt={product.name} className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="Remove" className='listproduct-remove-icon' />
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Listproduct;
