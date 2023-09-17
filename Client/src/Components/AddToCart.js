import react, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import CartAmount from "./CartAmount";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/cartContext";
// import { useAuth0 } from "@auth0/auth0-react";
import { useUserAuth } from "../Context/userAuthContext";

function AddToCart({product}){
    const {addToCart}=useContext(CartContext);
    // const {loginWithRedirect,isAuthenticated}=useAuth0();
    const {user}=useUserAuth();
    const {id,stock}=product;
    // const [color,setColor]=useState(colors[0]);
    const [amount,setAmount]=useState(1);

    const setDecrease=()=>{
        amount>1?setAmount(amount-1):setAmount(1);
        console.log(amount);
    }
    const setIncrease=()=>{
        amount<stock?setAmount(amount+1):setAmount(stock);
        console.log(amount);
    }
    return(
        <>
        {/* <div className="colors">
            <p>Colors:
                {
                    colors.map((currColor,index)=>{
                        return(
                            <>
                            <button onClick={()=>setColor(currColor)} type="button" className="btn btn-circle btn-sm" key={index} style={{backgroundColor:currColor,width:"30px",height:"30px",borderRadius:"15px",margin:"5px",textAlign:"center"}}> {color===currColor && <FaCheck style={{color:"white"}}/>}</button>
                            </>
                        )
                    })
                }
            </p>
        </div> */}
        <CartAmount amount={amount} setDecrease={setDecrease} setIncrease={setIncrease} />
        {
            user?<Link to='/cart' onClick={()=>addToCart(id,amount,product)}>
                <button className="btn btn-primary" style={{marginTop:"2%"}}>Add to Cart</button>
                </Link>:<Link className="nav-link" to='/login'>
                    <button className="btn btn-primary" style={{marginTop:"2%"}}>Add to Cart</button>
                </Link>
        }
        </>
    )
}

export default AddToCart;