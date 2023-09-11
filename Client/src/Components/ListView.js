import react from "react";
import { Link } from "react-router-dom";

function ListView({products}){
    return(
        <>
        <div style={{width:"80%"}}>
                {
                    products.map((prod,index)=>{
                        const {id,description,images,title,price}=prod
                        return(
                            <>
                            <div className="row" style={{border:'1px solid',margin:"2rem"}}>
                                <div style={{justifyContent:"center"}} className="col-sm-3">
                                    <img src={images[0]} alt={title} width="100%"/>
                                </div>
                                <div style={{textAlign:"left"}} className="col-sm-9">
                                    <h3>{title}</h3>
                                    <p>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(price)}</p>
                                    <p>{description.slice(0,90)}...</p>
                                    <Link to={`/products/${id}`}><button class="btn btn-primary">Read More</button></Link>
                                </div>
                            </div>
                            </>
                        )
                    })
                }
        </div>
        </>
    )
}

export default ListView;