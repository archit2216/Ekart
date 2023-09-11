import react, { useContext } from "react";
import { FilterContext } from "../Context/filterContext";
import GridView from "./GridView";
import ListView from "./ListView";

function ProductList(){
    const filterContextProvided=useContext(FilterContext);
    const {filter_products,grid_view}=filterContextProvided;
    console.log(filter_products);
    if(grid_view){
        return <GridView products={filter_products}/>
    }
    else{
        return <ListView products={filter_products}/>
    }
    return(
        <></>
    )
}

export default ProductList;