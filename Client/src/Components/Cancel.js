import react from "react";
import {ImCross} from "react-icons/im";
import { Link } from "react-router-dom";
function Cancel(){
    return(
        <>
        <div className="jumbotron">
        <h1 className="display-4">Payment Failed <ImCross color="red"/></h1>
        <p className="lead">There was some problem with processing your transaction, Please try again</p>
        <hr className="my-4" />
        <Link className="btn btn-primary btn-lg" to="/cart" role="button">Back to Cart</Link>
        <Link style={{margin:"2rem"}} className="btn btn-primary btn-lg" to="/" role="button">Continue Shopping</Link>
        </div>
        </>
    )
}

export default Cancel;