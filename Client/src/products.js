import react, { useContext } from "react";
import ProductList from "./Components/ProductList";
import Sort from "./Components/Sort";
import FilterSection from "./Components/FilterSection";
import { FilterContext } from "./Context/filterContext";

function Products(){
    // const FilterContextProvided=useContext(FilterContext)
    // const {filter_products}=FilterContextProvided;
    // console.log(filter_products)
    return(
        <div className="row">
            <div className="col-sm-3">
                <FilterSection />
            </div>
            <div className="col-sm-9">
                <section>
                    <div>
                        <Sort />
                    </div>
                    <div>
                        <ProductList />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Products;