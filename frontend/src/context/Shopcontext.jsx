import React, { createContext, useEffect, useState } from 'react'



export const Shopcontext = createContext(null);
const getDefaultCart=()=>{
    let cart={};
    for(let index=0;index<300+1;index++)
        {
            cart[index]=0;
        }
        return cart;
}
//add and delete cart functions

const Shopcontextprovider = (props)=>{
    //getting data from allproducts not generating it statically
    const[all_product,setall_product]=useState([]);
    const [cartitem,setcartitem] =useState(getDefaultCart());
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts').then((res)=>res.json())
        .then((data)=>setall_product(data))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((res)=>res.json())
            .then((data)=>setcartitem(data))
        }
    },[])
    const addtocart = (itemId)=>{
        setcartitem((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    }

    const removefromcart = (itemId)=>{
        setcartitem((prev)=>({...prev,[itemId]:prev[itemId]-1}))// frontend
        if(localStorage.getItem('auth-token')){ //bckend
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    }
    const gettotalcartamount = ()=>{
        let totalamount=0;
        for(const item in cartitem )
            {
                if(cartitem[item]>0)
                    {
                        let iteminfo=all_product.find((product)=>product.id===Number(item) )
                        totalamount += iteminfo.new_price * cartitem[item];
                    }
              
            }
            return totalamount;   
    }
    const gettotalcartitems = ()=>{
        let totalitem =0;
        for(const item in cartitem)
            {
                if(cartitem[item]>0)
                    {
                        totalitem+=cartitem[item];
                    }
            }
            return totalitem;
    }

    const contextValue = {gettotalcartitems,gettotalcartamount ,all_product,cartitem,addtocart,removefromcart};
    return(
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    )
}

export default Shopcontextprovider;