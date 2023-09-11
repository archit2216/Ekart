import react from "react";

const productReducer=(state,action)=>{
    switch (action.type) {
        case 'Loading':
            return{
                ...state,
                isLoading:true
            }

        case 'API_ERROR':
            return{
                ...state,
                isLoading:false,
                isError:true
            }
          
        case 'SET_PRODUCTS':
            // const featureData=action.payload.filter((ele)=>{
            //     return ele.featured===true;
            // });
            const featureData=action.payload.slice(0,3);
            return{
                ...state,
                isLoading:false,
                products:action.payload,
                featureProducts:featureData
            }
        case 'Single_Loading':
            return{
                ...state,
                isSingleLoading:true
            }
        case 'SET_SINGLE_PRODUCT':
            return{
                ...state,
                isSingleLoading:false,
                singleProduct:action.payload
            }
        case 'SINGLE_ERROR':
            return{
                ...state,
                isSingleLoading:false,
                isError:true
            }
        default:
            return state;
    }
}

export default productReducer