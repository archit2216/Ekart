import react from "react";
import Product from "./Product";
import "../index.css";
function GridView({products}){
    return(
        <>
        <div class="row GridClass">
            {
                products.map((prod,id)=>{
                    return(
                        <div style={{margin:"1rem"}} class="col-sm-3">
                            <Product key={prod.id} {...prod}/>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default GridView;