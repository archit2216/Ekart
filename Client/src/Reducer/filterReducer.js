import react, { createFactory } from "react";

const filterReducer=(state,action)=>{
    switch (action.type) {
        case "Load_Filter_Products":
            let priceArr=action.payload.map((currEle)=>{
                return currEle.price
            });
            let maxPrice=Math.max(...priceArr)
            let minPrice=Math.min(...priceArr)
            // console.log(maxPrice)
            return{
                ...state,
                filter_products:[...action.payload],  //using spread operator to use a copy of original data and not the
                all_products:[...action.payload],     //original data, so that if changes are made,original data doesn't get effected
                filters:{
                    ...state.filters,
                    maxPrice:maxPrice,
                    price:maxPrice,
                    minPrice:minPrice
                }
            }
        case "SET_GRID_VIEW":
            return{
                ...state,
                grid_view:true
            }
        case "SET_LIST_VIEW":
            return{
                ...state,
                grid_view:false
            }

        case "GET_SORT_VALUE":
            return{
                ...state,
                sorting_value:action.payload
            }
        case "SORTING_PRODUCTS":
            let newSortData;
            const {filter_products}=state;
            let copyData=[...filter_products]

            const sortProducts=(a,b)=>{
                if(state.sorting_value==='a-z'){
                    return a.title.localeCompare(b.title)
                }else if(state.sorting_value==='z-a'){
                    return b.title.localeCompare(a.title)
                }else if(state.sorting_value==='lowest'){
                    return a.price-b.price;
                }else{
                    return b.price-a.price;
                }
            }
            newSortData=copyData.sort(sortProducts)
            return{
                ...state,
                filter_products:newSortData
            }
        case "UPDATE_FILTER":
            const {name,value}=action.payload;
            return{
                ...state,
                filters:{
                    ...state.filters,
                    [name]:value
                }
            }
        case "FILTER_PRODUCTS":
            let {all_products}=state;
            let tempData=[...all_products]

            const{text,category,brand,price}=state.filters;
            // console.log(color)
            if(text){
                tempData=tempData.filter((currEle)=>{
                    return currEle.title.toLowerCase().includes(text) //startsWith would look for only product names with exact same starting text
                });                                                     //but includes will look for the text string anywhere in product name
            }
            if(category){
                if(category!=="All"){
                    tempData=tempData.filter((currEle)=>{
                        return currEle.category===category;
                    });
                }
            }
            if(brand){
                if(brand!=="All"){
                    tempData=tempData.filter((currEle)=>{
                        return currEle.brand===brand;
                    });
                }
            }
            // if(color){
            //     if(color!=="All"){
            //         tempData=tempData.filter((currEle)=>{
            //             return currEle.colors.includes(color);
            //         });
            //     }
            // }
            if(price){
                tempData=tempData.filter((currEle)=>{
                    return currEle.price<=price;
                })
            }
            return{
                ...state,
                filter_products:tempData
            }
        case "CLEAR_FILTERS":
            return {
                ...state,
                filters:{
                    ...state.filters,
                    text:"",
                    category:"All",
                    brand:"All",
                    color:"All",
                    maxPrice:state.filters.maxPrice,
                    price:state.filters.maxPrice,
                    minPrice:state.filters.minPrice
                }
            }
            default:
            return state
    }
}

export default filterReducer;