import react, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {FiShoppingCart} from "react-icons/fi";
import { CartContext } from "../Context/cartContext";
// import { useAuth0 } from "@auth0/auth0-react";
import { db } from "./Config/config";
import '../index.css';
import { useUserAuth } from "../Context/userAuthContext";

function Header(){
    const {total_items}=useContext(CartContext);
    // const { loginWithRedirect,logout,isAuthenticated} = useAuth0();
    const {user,logOut}=useUserAuth();
    const [isActive,setActive]=useState('');
    // console.log(user);
    const handleLogOut=async()=>{
        try {
            await logOut();
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleClick=(e)=>{
        setActive(e.name);
    }
    const doSomething=async()=>{
        const docRef = db.collection('users').doc(user.uid);
        const doc = await docRef.get();
        if(doc.exists){
        // console.log(state.cart);
            console.log(doc.data());
            db.collection('users').doc(user.uid).set({
                email:user.email,
                total_items,
                cart:doc.data().cart
            });
        }
        else{
            db.collection('users').doc(user.uid).set({
                email:user.email,
                total_items:0,
                cart:[]
            });
        }
    }
    useEffect(()=>{
        if(user){
            doSomething();
        }
    },[user,total_items]);
    
    return(
        <div>
            <nav style={{padding:"20px 20px"}} className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="NAVBAR container-fluid">
                <Link style={{paddingLeft:"2%"}} className="navbar-brand" to="/">Ekart</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{paddingLeft:"58.5%"}} className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link name='home' className={isActive==='home'?"nav-link active":"nav-link"} onClick={handleClick} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link name='prods' className={isActive==='prods'?"nav-link active":"nav-link"} onClick={handleClick} to="/products">Product</Link>
                    </li>
                    <li className="nav-item">
                    <Link name='contact' className={isActive==='contact'?"nav-link active":"nav-link"} onClick={handleClick} to="/contact">Contact</Link>
                    </li>
                    {
                        user && <li className="nav-item"><p className="nav-link" style={{color:"blue"}}>{user.email}</p></li>
                    }
                    <li className="nav-item">
                        {
                            user?<Link className="nav-link btn btn-danger" onClick={handleLogOut}>
                            Log Out
                            </Link>:
                            <Link to='/login' className="nav-link btn btn-primary">Log In</Link>
                        }
                    
                    </li>
                    <li className="nav-item">
                        {
                            user?<Link className="nav-link" to="/cart">
                            <FiShoppingCart />
                            <span className="HeaderSpan">{total_items}</span>
                        </Link>:<Link className="nav-link" to='/login'>
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