import react from "react";
import { Link } from "react-router-dom";

function PageNavigation({title}){
    return(
        <>
        <div  style={{paddingLeft:"15px"}} className="navbar navbar-expand-lg bg-body-tertiary">
            <Link to='/'>Home</Link>/{title}
        </div>
        </>
    )
}

export default PageNavigation;