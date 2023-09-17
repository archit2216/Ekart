import react, { useContext } from "react";
import { CartContext } from "./Context/cartContext";
import CartItem from "./Components/CartItem";
import { Link } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import {loadStripe} from '@stripe/stripe-js';
import { useUserAuth } from "./Context/userAuthContext";
import {auth} from './Components/Config/config';
import userDefault from './images/DefaultUser.png';

function Cart(){
    const user=auth.currentUser;
    // console.log(user);
    const {cart,ClearCart,total_price,shipping_fee,loading}=useContext(CartContext);
    // const {user,isAuthenticated}=useAuth0();
    // console.log(cart);
    const makePayment=async()=>{
        const stripe=await loadStripe("pk_test_51NnktNSAh3aoyHVtYr0BPh4Ha01TtNjYr6b1Wt1gjPcC3xaYGLpPNt8JUJRe00vsfFbVdhwETQt3cBG9otuwKIZD00WZ3Csg1d");
        const body={
            products:cart
        }
        const headers={
            "Content-Type":"application/json"
        }
        const response=await fetch("https://react-ecommerce-3uxg.onrender.com/api/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session=await response.json();

        const result=stripe.redirectToCheckout({
            sessionId:session.id
        });
        if(result.error){
            console.log(result.error);
        }
    }
    if(loading){
        return <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
        </div>
    }
    if(cart.length===0){
        return(
            <h1>Cart is Empty</h1>
        )
    }
    return(
        <div>
            {
                user && <div>
                <img src={user.photoURL?user.photoURL:userDefault} alt={user.email} width="100px"/>
                <br />
                <p>{user.email}</p>
                </div>
            }
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div className="col-1 col-sm-1">
                    <p>Item</p>
                </div>
                {/* <div className="col-2 col-sm-3">
                    <p>Item Name</p>
                </div> */}
                <div className="col-1 col-sm-1">
                    <p>Price</p>
                </div>
                <div className="col-1 col-sm-1">
                    <p>Quantity</p>
                </div>
                <div className="col-1 col-sm-1">
                    <p>Subtotal</p>
                </div>
                <div className="col-2 col-sm-1">
                    <p>Remove</p>
                </div>
            </div>
            <hr />
            
            {
                cart.map((currEle)=>{
                    return(
                        <>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <CartItem key={currEle.id} {...currEle} />
                        </div>
                        </>
                    )
                })
            }
            <hr />
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
                <Link to='/products'><button className="btn btn-primary" type="button">Continue Shopping</button></Link>
                <button onClick={ClearCart}  className="btn btn-danger" type="button">Clear Cart</button>
            </div>

            <div style={{justifyContent:"center"}} width="10%">
                <div>
                    <p>Subtotal: {Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(total_price)}</p>
                </div>
                <div>
                    <p>Shipping Fee: {Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(shipping_fee/100)}</p>
                </div>
                <hr width="25%" style={{margin:"auto"}}/>
                <div>
                    <p>Order Total: {Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(total_price+(shipping_fee/100))}</p>
                </div>
                <button type="button" className="btn btn-success" onClick={makePayment}>Make Payment</button>
            </div>
        </div>
    )
}

export default Cart;