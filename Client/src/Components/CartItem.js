import react, { useContext } from "react";
import {ImBin2} from "react-icons/im"
import CartAmount from "./CartAmount";
import { CartContext } from "../Context/cartContext";
function CartItem(currEle){
    const {removeItem,setDecrease,setIncrease}=useContext(CartContext);
    return(
        <>
            <div className="col-1 col-sm-1">
                <img src={currEle.image} alt={currEle.name} width="40%"/>
                {/* <br></br> */}
                <p>{currEle.name}</p>
            </div>
            <div className="col-1 col-sm-1">
                <p>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(currEle.price)}</p>
            </div>
            <div className="col-1 col-sm-1">
                <p><CartAmount amount={currEle.amount} setDecrease={()=>setDecrease(currEle.newId)} setIncrease={()=>setIncrease(currEle.newId)} /></p>
            </div>
            <div className="col-1 col-sm-1">
                <p>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(currEle.amount*currEle.price)}</p>
            </div>
            <div className="col-1 col-sm-1">
                <p><ImBin2 onClick={()=>removeItem(currEle.newId)} /></p>
            </div>
        </>
    )
}

export default CartItem;