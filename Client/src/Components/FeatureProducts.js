import react from "react";
import { useContext } from "react";
import { AppContext } from "../Context/productContext";
import Product from "./Product";
import '../index.css';
function FeatureProducts(){
    const {isLoading,featureProducts}=useContext(AppContext);
    console.log(featureProducts);
    if(isLoading){
        return <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    }
    return(
        <>
        <div className="featureHeading">
                <p>Check Now!</p>
                <h2>Our featured products</h2>
                <div className="container featureProds">
                    {featureProducts.map((prod)=>{
                        return(
                            <div className="FitProds">
                                <Product key={prod.id} {...prod}/>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default FeatureProducts; 