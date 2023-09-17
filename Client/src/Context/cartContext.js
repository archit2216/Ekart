import react, { createContext, useEffect, useReducer, useState } from "react";
import reducer from "../Reducer/cartReducer";
import { db } from "../Components/Config/config";
import {auth } from '../Components/Config/config';
import { updateDoc} from "firebase/firestore";

const CartContext=createContext()

const CartProvider=({children})=>{
  const user=auth.currentUser;
  const [loading,setLoading]=useState(true);
  // console.log("This is current user:",user);
const getCartData = async () => {
    try {
      const docRef = db.collection('users').doc(user.uid);
      const doc = await docRef.get();
      if (doc.exists) {
        // console.log(doc.data().cart);
        setLoading(false);
        return doc.data().cart;
      } else {
        setLoading(false);
        return [];
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return [];
    }
  };

 const updateCart = async (cartData) => {
    try {
      // console.log("This is user: ",await user);
      const docRef = db.collection('users').doc(user.uid);
      await updateDoc(docRef,{cart:cartData,total_items:cartData.length});
    } catch (error) {
      console.log(error);
    }
  };

    const initialState={
            cart:[],
            total_items:0,
            total_price:0,
            shipping_fee:5000
        }
    const [state,dispatch]=useReducer(reducer,initialState)

    const addToCart=(id,amount,product)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,amount,product}});
        console.log(product);
        const newId=id;
        // console.log(image);
        const image=product.images[0];
        const price=product.price
        const max=product.stock
        const name=product.title;
        let existingItem=state.cart.find((currEle)=>{
          return currEle.newId===id;
      });
      let newCart;
      // let newAmount;
      if(existingItem){
          existingItem.amount+=amount;
          if(existingItem.amount>=existingItem.max){
              existingItem.amount=existingItem.max
          }
          newCart=[...state.cart];
      }else{
        newCart=[...state.cart,{newId,amount,image,name,max,price}];
      }
      console.log("check this:",newCart);
        updateCart(newCart);
    }

    const removeItem=(id)=>{
        dispatch({type:"REMOVE_ITEM",payload:id})
        let updatedCart=state.cart.filter((currEle)=>{
          return currEle.newId!==id
      })
        updateCart(updatedCart);
    }

    const ClearCart=()=>{
        dispatch({type:"CLEAR_CART"})
        updateCart([]);
    }

    const setDecrease=(id)=>{
        dispatch({type:"DECREASE_ITEM",payload:id});
        const newCart=state.cart.map((currEle)=>{
          if(currEle.newId===id){
              let decAmount=currEle.amount-1;
              if(decAmount===0){
                decAmount=1;
              }
              return{
                  ...currEle,
                  amount:decAmount
              }
          }else{
              return currEle;
          }
      });
        updateCart(newCart);
    }

    const setIncrease=(id)=>{
        dispatch({type:"INCREASE_ITEM",payload:id});
        const newCart=state.cart.map((currEle)=>{
          if(currEle.newId===id){
              let incAmount=currEle.amount+1;
              if(incAmount>currEle.max){
                incAmount=currEle.max;
              }
              return{
                  ...currEle,
                  amount:incAmount
              }
          }else{
              return currEle;
          }
      });
        updateCart(newCart);
    }

    useEffect(() => {
      // Load the cart data if the user is authenticated or on page refresh
      if (user) {
        getCartData().then((newCart) => {
          dispatch({ type: "SET_CART", payload: newCart });
        });
      } else {
        // No user logged in, initialize cart as empty
        dispatch({ type: "SET_CART", payload: [] });
      }
    }, [user, getCartData]);



    return  <CartContext.Provider value={{...state,loading,addToCart,removeItem,ClearCart,setIncrease,setDecrease}}>
    {children}
    </CartContext.Provider>
}

export {CartContext,CartProvider}