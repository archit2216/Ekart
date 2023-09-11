import react, { useContext, useState } from "react";
import { FilterContext } from "../Context/filterContext";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

function FilterSection(){
    const {filters:{text,category,color,maxPrice,minPrice,price},updateFilter,all_products,ClearFilters}=useContext(FilterContext);

    const getUniqueData=(data,prop)=>{
        let newVal=data.map((currEle)=>{
            return currEle[prop];
        });
        // console.log(newVal);
        if(prop==='colors'){
            // newVal=["All",...new Set([].concat(...newVal))]
            newVal=newVal.flat()
        }
        newVal=["All",... new Set(newVal)]
        
        console.log(newVal);
        return newVal;
        // console.log(newVal)
    }
    // const getColors=(data,prop)=>{
    //     let set=new Set();
    //     data.map((currEle)=>{
    //         // console.log(data)
    //         set=new Set([...set,...currEle[prop]]);
    //         // colorsArr=[... new Set([...colorsArr,...currEle[prop]])]
    //     });
    //     let colorsArr=["All",...set];
    //     return colorsArr;
    // }
    
    const CategoryFilter=getUniqueData(all_products,"category")
    const CompanyFilter=getUniqueData(all_products,"brand")
    const ColorFilter=getUniqueData(all_products,"colors");
    
    return(
        <>
        <div style={{marginTop:"5rem"}}>
            <form onSubmit={(e)=>{e.preventDefault()}}>
                <input placeholder="SEARCH" type="text" name="text" value={text} onChange={updateFilter}/>
            </form>
        </div>
        <div style={{marginTop:"2rem"}}> 
            <h4>Category</h4>
            <div>
                {
                    CategoryFilter.map((currEle,index)=>{
                        return(
                            <button className="btn btn-outline-primary" onClick={updateFilter} style={{width:"55%"}} name="category" key={index} value={currEle} id={currEle} type="button">{currEle}</button>
                        )
                    })
                }
            </div>
        </div>
        <div style={{marginTop:"2rem"}}>
            <h4>Company</h4>
            <div>
                <form action="#">
                    <select onClick={updateFilter} name="brand" id="company">
                        {
                            CompanyFilter.map((currEle,index)=>{
                                return(
                                    <option value={currEle}>
                                        {currEle}
                                    </option>
                                )
                            })
                        }
                    </select>
                </form>
            </div>
        </div>
        {/* <div style={{marginTop:"2rem"}}>
            <h4>Colors</h4>
            <div>
                {
                    ColorFilter.map((currEle,index)=>{
                        return(
                        <button name="color" value={currEle} onClick={updateFilter} type="button" className="btn btn-circle btn-sm" key={index} style={{backgroundColor:currEle==="All"?"white":currEle,width:"30px",height:"30px",borderRadius:"15px",margin:"5px",textAlign:"center"}}>{currEle==="All" && "All"}{color===currEle && <FaCheck style={{color:"white"}}/>}</button>
                        )
                    })
                }
            </div>
        </div> */}
        <div style={{marginTop:"2rem"}}>
            <h4>Price</h4>
            <h6>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(price)}</h6>
            <input type="range" min={minPrice} id="cowbell" max={maxPrice} onChange={updateFilter} name="price" value={price} steps="10000"/>
        </div>
        <div style={{marginTop:"2rem"}}>
            <button onClick={ClearFilters} type="button" className="btn btn-primary">CLEAR FILTERS</button>
        </div>
        </>
    )
}

export default FilterSection;

// {color===currEle && <FaCheck style={{color:"white"}}/>}