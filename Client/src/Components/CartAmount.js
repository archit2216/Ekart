import react from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function CartAmount({amount,setDecrease,setIncrease}){
    return(
        <>
        <div className="cart-button">
            <div style={{display:"flex"}}>
                <button onClick={()=>setDecrease()} className="btn btn-circle btn-sm" ><FaMinus size={10}/></button>
                <p style={{margin:"0 10px",color:"#1a75ff"}}>{amount}</p>
                <button onClick={()=>setIncrease()} className="btn btn-circle btn-sm" ><FaPlus size={10}/></button>
            </div>
        </div>

        </>
    )
}

export default CartAmount;