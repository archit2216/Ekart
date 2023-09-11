import react, { useContext } from "react";
import {BsGridFill,BsList} from "react-icons/bs";
import { FilterContext } from "../Context/filterContext";
import { Link } from "react-router-dom";
import "../index.css";
function Sort(){
    const {filter_products,setGridView,setListView,sorting}=useContext(FilterContext);
    return(
        <>
        <div className="SortDiv">
            <div>
                <button className="btn" onClick={setGridView}><BsGridFill/></button>
                <button className="btn" onClick={setListView}><BsList /></button>
            </div>
            <div className="col-sm-4">
                <p>{filter_products.length} products available</p>
            </div>
            <div class="dropdown">
                <form action="#">
                    <label htmlFor="sort"></label>
                    <select onClick={sorting} name="sort" id="sort" type="button">                    
                        <option class="dropdown-item" value="lowest">Price (lowest)</option>
                        <option class="dropdown-item" value="highest">Price (highest)</option>
                        <option class="dropdown-item" value="a-z">Price (a-z)</option>
                        <option class="dropdown-item" value="z-a">Price (z-a)</option>

                    </select>
                </form>
            </div>
        </div>
        </>
    )
}

export default Sort;