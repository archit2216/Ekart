import react, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {FiShoppingCart} from "react-icons/fi";
import { CartContext } from "../Context/cartContext";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "./Config/config";
import '../index.css';
function Header(){
    const {total_items}=useContext(CartContext);
    const { user,loginWithRedirect,logout,isAuthenticated} = useAuth0();

    const doSomething=async()=>{
        if(isAuthenticated){
        const docRef = db.collection('users').doc(user.sub);
         const doc = await docRef.get();
         if(doc.exists){
            // console.log(state.cart);
                console.log(doc.data());
                db.collection('users').doc(user.sub).set({
                    name:user.name,
                    email:user.email,
                    total_items,
                    cart:doc.data().cart
                });
            }
            else{
                db.collection('users').doc(user.sub).set({
                    name:user.name,
                    email:user.email,
                    total_items,
                    cart:[]
                });
            }
        }
    }
    useEffect(()=>{
        doSomething();
        if(user){
            doSomething();
        }
    },[isAuthenticated,total_items]);
    
    return(
        <div>
            <nav style={{padding:"20px 20px"}} className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link style={{paddingLeft:"2%"}} className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{paddingLeft:"58.5%"}} className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                    </li> */}
                    <li className="nav-item">
                    <Link className="nav-link" to="/products">Product</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    {
                        isAuthenticated && <li className="nav-item"><p className="nav-text" style={{color:"blue",fontSize:"large"}}>{user.name}</p></li>
                    }
                    <li className="nav-item">
                        {
                            isAuthenticated?<Link className="nav-link btn btn-danger" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                            Log Out
                            </Link>:
                            <Link onClick={() => loginWithRedirect()} className="nav-link btn btn-primary">Log In</Link>
                        }
                    
                    </li>
                    <li className="nav-item">
                        {
                            isAuthenticated?<Link className="nav-link" to="/cart">
                            <FiShoppingCart />
                            <span className="HeaderSpan">{total_items}</span>
                        </Link>:<Link className="nav-link" onClick={() => loginWithRedirect()}>
                            <FiShoppingCart />
                            <span className="HeaderSpan">0</span>
                        </Link>
                        }
                    
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Header;