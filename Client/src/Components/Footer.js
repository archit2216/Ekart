import react from "react";
import {BsDiscord,BsInstagram,BsYoutube} from "react-icons/bs"
import "../Footer.css";
function Footer(){
    return(
    <>
    <div className="FooterDiv">
        <div className="container row">
            <div className="col-sm" style={{margin:"10px"}}>
            <h5 className="FooterText">Ready to get started?</h5>
            <h5 className="FooterText">Talk to us today</h5>
            </div>
            <div className="col-sm" style={{margin:"10px"}}>
                <button className="btn btn-light" type="submit">GET STARTED</button>
            </div>
        </div>
        <hr className="FooterText" /> 
        <div style={{margin:"50px"}} className="row">
            <div className="col-sm">
                <p className="FooterText">Ecommerce Store</p>
                <p className="FooterText">Buy anything, anytime, anywhere</p>
            </div>
            <div className="col-sm">
                <p className="FooterText">Subscribe to get important updates</p>
                <input placeholder="YOUR EMAIL"/>
                <button style={{margin:"10px"}} className="btn btn-light">SUBSCRIBE</button>
            </div>
            <div className="col-sm">
                <p className="FooterText">Follow us</p>
                <BsDiscord className="FooterIcons"/>
                <BsInstagram className="FooterIcons" />
                <BsYoutube className="FooterIcons"/>
            </div>
            <div className="col-sm">
                <p className="FooterText">Call Us</p>
                <p className="FooterText">+911234567890</p>
            </div>
        </div>
        <hr className="FooterText" /> 
        <div className="row container">
            <div className="col-sm">
                <p className="FooterText">©{new Date().getFullYear()} Archit Sharma.All rights reserved</p>
            </div>
            <div className="col-sm">
                <p className="FooterText">Privacy Policy</p>
                <p className="FooterText">Terms and Conditions</p>
            </div>
        </div>
    </div>
    </>
    )
}

export default Footer;