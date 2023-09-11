import react, { useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./Context/productContext";
import PageNavigation from "./Components/PageNavigation";
import MyImage from "./Components/MyImage";
import { GrSecure } from "react-icons/gr";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import {FaStar} from "react-icons/fa";
import { BsStarHalf } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import AddToCart from "./Components/AddToCart";

import React from "react";

// const API="https://api.pujakaitem.com/api/products/"
const API="https://dummyjson.com/products";
function Item(){
    const {id}=useParams();
    const {getSingleProduct,isSingleLoading,singleProduct}=useContext(AppContext);
    const {id:alias,title,brand,price,description,category,stock,images,rating,discountPercentage}=singleProduct;
    useEffect(()=>{
        // getSingleProduct(`${API}?id=${id}`);
        // console.log(`${API}/${id}`);
        getSingleProduct(`${API}/${id}`);
    },[])

    if(isSingleLoading){
        return <div class="spinner-border text-primary" role="status">
        <span class="sr-only"></span>
      </div>
    }
    return(
        <>
        <PageNavigation title={title}/>
        <div style={{margin:"5% 15%"}} className="row">
           <div className="col-sm">
            <MyImage imgs={images} />
           </div>
           <div style={{textAlign:"left"}} className="col-sm">
                <div className="product_data">
                    <h2>{title}</h2>
                    {
                        Array.from({length:5},(elem,index)=>{
                            let number=index+0.5;
                            return(
                                <span key={index}>
                                    {
                                        rating>=index+1?<FaStar />:rating>=number?<BsStarHalf />:<FaRegStar />
                                    }
                                </span>
                            )
                        })
                    }
                    <p>{rating}</p>
                <p className="product_price">M.R.P:<del>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(price+((discountPercentage*price)/100))}</del></p>
                <p style={{color:"red"}}>Discount:{discountPercentage}%</p>
                <p style={{color:"blue"}} className="product_price_new">Deal of the Day:{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(price)}</p>
                <p>{description}</p>
                <div style={{width:"75%",display:"flex",justifyContent:"space-between"}}>
                    <div>
                        <TbTruckDelivery className="icon"/>
                        <p>Super Fast and Free Delivery</p>
                    </div>
                    <div>
                        <MdSecurity className="icon"/>
                        <p>Non-contact shipping</p>
                    </div>
                    <div>
                        <LiaHandHoldingUsdSolid className="icon"/>
                        <p>Money back guarantee</p>
                    </div>
                    <div>
                        <GrSecure className="icon"/>
                        <p>Super Fast and Free Delivery</p>
                    </div>
                </div>
                <div style={{width:"100%"}} className="Availability">
                    <p>Available:{stock>0?<span style={{color:"green"}}>In Stock</span>:<span style={{color:"red"}}>Out of Stock</span>}</p>
                </div>
                <p>ID: {id}</p>
                <p>Brand: {brand}</p>
                <hr/>
                {
                    stock>0 && <AddToCart product={singleProduct} />
                }
                </div>
           </div>
        </div>
        </>
    )
}

export default Item;