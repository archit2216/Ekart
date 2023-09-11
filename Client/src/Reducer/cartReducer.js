import react from "react";

const cartReducer=(state,action)=>{
    switch(action.type){
        case "SET_CART":
            return{
                ...state,
                cart:action.payload
            }
        case "ADD_TO_CART":
            let {id,color,amount,product}=action.payload;
            let existingItem=state.cart.find((currEle)=>{
                // return currEle.id===id+color;
                return currEle.id==id
            });

            if(existingItem){
                existingItem.amount+=amount;
                if(existingItem.amount>=existingItem.max){
                    existingItem.amount=existingItem.max
                }
                return {
                    ...state,
                    cart:[...state.cart]
                }
            }
            
            // console.log(color,product)
            let cartProduct={
                id:id,                  //id+color would make a different id for same product but with a different color code
                name:product.name,
                color,
                amount,
                image:product.images[0].url,
                price:product.price,
                max:product.stock
            }

            return{
                ...state,
                cart:[...state.cart,cartProduct]
            }
        case "REMOVE_ITEM":
            let updatedCart=state.cart.filter((currEle)=>{
                return currEle.id!==action.payload
            })

            return{
                ...state,
                cart:updatedCart
            }
        case "CLEAR_CART":
            return{
                ...state,
                cart:[]
            }
        case "INCREASE_ITEM":

            let chosenItem=state.cart.map((currEle)=>{
                if(currEle.id===action.payload){
                    let incAmount=currEle.amount+1;
                    return{
                        ...currEle,
                        amount:incAmount
                    }
                }else{
                    return currEle;
                }
            });

            return{
                ...state,
                cart:chosenItem
            }

        case "DECREASE_ITEM":
            let choseItem=state.cart.map((currEle)=>{
                if(currEle.id===action.payload){
                    let decAmount=currEle.amount-1;
                    return{
                        ...currEle,
                        amount:decAmount
                    }
                }else{
                    return currEle;
                }
            });

            return{
                ...state,
                cart:choseItem
            }
        case "CART_TOTAL_ITEMS":
            let {newItemVal,newPriceVal}=state.cart.reduce((accumulator,currEle)=>{
                accumulator.newItemVal+=currEle.amount;
                accumulator.newPriceVal+=(currEle.amount*currEle.price);
                return accumulator
            },{newItemVal:0,newPriceVal:0});

            return{
                ...state,
                total_items:newItemVal,
                total_price:newPriceVal
            }
        default:
            return state;
    }
}

export default cartReducer;
