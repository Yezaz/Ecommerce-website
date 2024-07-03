import React, { useState } from 'react';
import './addproduct.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
    const [image, setImage] = useState(null); // Initialize image state as null
    const [productdetails, setProductDetails] = useState({
        name: "",
        image: "", // Consider removing this as it's handled separately with 'image' state
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changehandler = (e) => {
        setProductDetails({ ...productdetails, [e.target.name]: e.target.value });
    };

    const Add_product = async () => {
        console.log(productdetails);
        let responsedata ;
        let product = productdetails;
        let formdata = new FormData();
        formdata.append('product',image);

        await fetch('https://ecommerce-website-backend-ecru.vercel.app/upload',{
            method:'POST',
            headers :{
                Accept:'application/json',

            },
            body:formdata,

        }).then((res)=>res.json()).then((data)=>{responsedata=data})
        if(responsedata.success)
            {
                product.image = responsedata.image_url;
                console.log(product);
                await fetch('https://ecommerce-website-backend-ecru.vercel.app/addproduct',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type' : 'application/json',
                    },
                    body :JSON.stringify(product),
                }).then((res)=>res.json()).then((data)=>{
                    data.success ? alert("PRODUCT added") : alert("Failed to add");
                })
            }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input type="text" name='name' placeholder='Type here' value={productdetails.name} onChange={changehandler} />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfields">
                    <p>Price</p>
                    <input type="text" name='old_price' placeholder='Type Here' value={productdetails.old_price} onChange={changehandler} />
                </div>
                <div className="addproduct-itemfields">
                    <p>Offer Price</p>
                    <input type="text" name='new_price' placeholder='Type Here' value={productdetails.new_price} onChange={changehandler} />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" className='addproduct-selector' value={productdetails.category} onChange={changehandler}>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumbnail-img' />
                </label>
                <input type="file" name='image' id='file-input' hidden onChange={imageHandler} />
            </div>
            <button className='addproduct-btn' onClick={() => Add_product()}>ADD</button>
        </div>
    );
};

export default Addproduct;
