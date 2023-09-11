import react, { useState } from "react";
import '../index.css';
function MyImage({imgs=[{url:""}]}){
    // console.log(imgs);
    const [imageNumber,changeImage]=useState(imgs[0]);

    return(
        <>
        <div className="row">
        <div className="MyImageDetail">
            <img src={imageNumber} alt={imageNumber} width="70%"/> 
            </div>
            <div className="MyImageDiv1" width="70%">
                {imgs.map((currElem,index)=>{
                    return(
                        <img width="30%" style={{marginTop:"2%"}} onClick={()=>changeImage(currElem)} src={currElem} alt="hello" key={index}/> 
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default MyImage;