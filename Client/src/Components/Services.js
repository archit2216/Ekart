import react from "react";
import {TbTruckDelivery} from "react-icons/tb"
import {MdSecurity} from "react-icons/md";
import {LiaHandHoldingUsdSolid} from "react-icons/lia"
import {GrSecure} from "react-icons/gr";
import "../Services.css";

function Services(){
    return(
        <>
        <div className="row ServicesMain">
        <h2 className="ServiceHead">Services Provided</h2>
            <div className="col-sm">
                <div>
                    <TbTruckDelivery className="icon" size={20}/>
                    <h5>Super Fast and Free Delivery</h5>
                </div>
            </div>
            <div className="col-sm">
                <div className="ServicesChild2">
                    <MdSecurity className="icon" size={20}/>
                    <h5>Non-contact shipping</h5>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <LiaHandHoldingUsdSolid className="icon" size={20}/>
                    <h5>Money back guarantee</h5>
                </div>
            </div>
            <div className="col-sm">
                <div>
                    <GrSecure className="icon" size={20}/>
                    <h5>Super Fast and Free Delivery</h5>
                </div>
            </div>
        </div>
        </>
    )
}

export default Services;