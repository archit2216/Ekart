import axios from "axios";
import react, { useEffect,useReducer} from "react";
import { createContext } from "react";
import reducer from "../Reducer/productReducer";

const AppContext=createContext();
// const API="https://api.pujakaitem.com/api/products";
const API="https://dummyjson.com/products";

const initialState={
    isLoading:false,
    isError:false,
    products:[],
    featureProducts:[],
    isSingleLoading:false,
    singleProduct:{}
}
const AppProvider= function({children}){
    const [state,dispatch]=useReducer(reducer,initialState)

    const getProducts=async (url)=>{
        dispatch({type:"Loading"})
        try{
            const res=await axios.get(url)
            const products=res.data.products;
            console.log(products);
            dispatch({type:"SET_PRODUCTS",payload:products})
        }catch(err){
            dispatch({type:"API_ERROR"})
            console.log(err)
        }
    }

    const getSingleProduct=async (url)=>{
        dispatch({type:"Single_Loading"})
        try {
            console.log(url);
            const res=await axios.get(url);
            const singleProduct=res.data
            dispatch({type:"SET_SINGLE_PRODUCT",payload:singleProduct})
        } catch (err) {
            dispatch({type:"SINGLE_ERROR"})
            console.log(err);
        }
    }

    useEffect(()=>{
        getProducts(API)
    },[])
    return(
        <AppContext.Provider value={{...state,getSingleProduct}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider,AppContext};