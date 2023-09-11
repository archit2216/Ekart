import react from "react";
import shopimage from "./images/shopping.jpg"
import { Link } from "react-router-dom";
import Services from "./Components/Services";
import Trusted from "./Components/Trusted";
import Footer from "./Components/Footer";
import FeatureProducts from "./Components/FeatureProducts";
function Home(){
    return(
        <div>
            <div style={{margin:"50px"}} className="row">
                <div className="col-sm">
                    <p>Welcome to</p>
                    <h1>E-commerce Store</h1>
                    <p>This is a store where you can buy anything anytime anywhere with just one click, with your order delivered at doorstep</p>
                    <Link to="/products"><button className="btn btn-primary">Shop Now</button></Link>
                </div>
                <div className="col-sm">
                    <img src={shopimage} alt="Shopping website image" width="100%"></img>
                </div>
            </div>
            <FeatureProducts/>
            <Services/>
            <Trusted/>
            <Footer />
        </div>
    )
}

export default Home;