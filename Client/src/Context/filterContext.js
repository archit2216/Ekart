import react, { createContext,useContext, useEffect, useReducer} from "react";
import { AppContext } from "./productContext";
import reducer from "../Reducer/filterReducer"
const FilterContext=createContext();

const initialState={
    filter_products:[],
    all_products:[],
    grid_view:true,
    sorting_value:"lowest",
    filters:{
        text:"",
        category:"All",
        brand:"All",
        // color:"All",
        maxPrice:0,
        price:0,
        minPrice:0
    }
}

const FilterProvider=({children})=>{
    const ProductContext=useContext(AppContext)
    const {products}=ProductContext
    // console.log(products)
    const [state,dispatch]=useReducer(reducer,initialState)

    const setGridView=()=>{
        return dispatch({type:"SET_GRID_VIEW"})
    }

    const setListView=()=>{
        return dispatch({type:"SET_LIST_VIEW"})
    }

    const sorting=(e)=>{
        let userSortVal=e.target.value;
        dispatch({type:"GET_SORT_VALUE",payload:userSortVal})
    }

    const updateFilter=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        console.log(name,value);
        return dispatch({type:"UPDATE_FILTER",payload:{name,value}})
    }

    const ClearFilters=()=>{
        dispatch({type:"CLEAR_FILTERS"})
    }

    useEffect(()=>{
        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORTING_PRODUCTS"});
    },[products,state.sorting_value,state.filters])
    
    useEffect(()=>{
        dispatch({type:"Load_Filter_Products",payload:products});

    },[products])

    return <FilterContext.Provider value={{...state,setGridView,setListView,sorting,updateFilter,ClearFilters}}>
        {children}
    </FilterContext.Provider>
}

export {FilterContext,FilterProvider};
