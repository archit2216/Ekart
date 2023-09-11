import react from "react";
import { Link } from "react-router-dom";
import '../index.css';
function Product(currElement){
    const {id,title,images,price,brand,discountPercentage}=currElement;
    return(
        <>
        <Link to={`/products/${id}`}>
            <div className="card bg-dark text-white ProductCard">
            <figure>
            <img src={images[0]} class="card-img" alt={title} height={150}/>
            <div className="card-img-overlay">
            <figcaption className="ProductCaption">{brand}</figcaption>
            </div>
            </figure>
            <div class="card-body">
                <p className="card-text">{title}</p>
                <p className="product_price">M.R.P:<del>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(price+((discountPercentage*price)/100))}</del></p>
                <p className="card-text">Steal Deal:{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(price)}</p>
            </div>
            </div>
        </Link>
        </>
    )
}

export default Product;