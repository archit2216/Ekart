import react from "react";
import { Link } from "react-router-dom";
import {BiSolidCheckCircle} from "react-icons/bi";
function Success(){
    return(
        <>
        <div className="jumbotron">
        <h1 className="display-4">Payment Successful <BiSolidCheckCircle color="green"/></h1>
        <p className="lead">Thank you for choosing us, your order will be at your doorstep within a few days</p>
        <hr className="my-4" />
        <Link className="btn btn-primary btn-lg" to="/" role="button">Continue Shopping</Link>
        </div>
        </>
    )
}

export default Success;