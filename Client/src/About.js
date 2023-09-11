import react, { useContext } from "react";
import { AppContext } from "./Context/productContext";

function About(){
    const name=useContext(AppContext);
    return(
        <div>
            {name.name}
            About page
        </div>
    )
}

export default About;