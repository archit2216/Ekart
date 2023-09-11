import react, { createContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/cartReducer";
import { db } from "../Components/Config/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import { getAuth } from "firebase/auth";

// const auth = getAuth();
// const USER = auth.currentUser;

// if (USER !== null) {
//     USER.providerData.forEach((profile) => {
//     //   console.log("Sign-in provider: " + profile.providerId);
//     //   console.log("  Provider-specific UID: " + profile.uid);
//       console.log("  Name: " + profile.name);
//       console.log("  Email: " + profile.email);
//       console.log("Cart: ",profile.cart);
//     //   console.log("  Photo URL: " + profile.photoURL);
//     });
//   }

const CartContext=createContext()

// const getCartData=()=>{
    
//     let newCart=localStorage.getItem("userCart")
//     if(newCart.length===0){
//         return [];
//     }

//     // get
//     return JSON.parse(newCart)
// }


const CartProvider=({children})=>{
// const getCartData=async (user)=>{
//     // const docRef=doc(db,"users",user.sub)
//     const docRef=db.collection('users').doc(user.sub)
//     try {
//         let newCart;
//         docRef.get().then((doc)=>{
//             if(doc.exists){
//                 newCart=(doc.data().cart);
//             }
//         })
//         return newCart;
//     } catch(error) {
//         console.log(error)
//     }
// }

const getCartData = async (user) => {
    try {
      const docRef = db.collection('users').doc(user.sub);
      const doc = await docRef.get();

      if (doc.exists) {
        return doc.data().cart;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };


// const updateCart=async (user)=>{
//     const cityRef = db.collection('users').doc(user.sub);
//     const res = await cityRef.update({cart:[...state.cart]});
//     return res;
// }
 const updateCart = async (user, cartData) => {
    try {
      const docRef = db.collection('users').doc(user.sub);
      await docRef.set({ cart: cartData }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

    const { user,isAuthenticated,loginWithRedirect} = useAuth0();
   
    const initialState={
            cart:[],
            total_items:0,
            total_price:0,
            shipping_fee:5000
        }
    const [state,dispatch]=useReducer(reducer,initialState)

    const addToCart=(id,amount,product)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,amount,product}});
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
        updateCart(user,newCart);
    }

    const removeItem=(id)=>{
        dispatch({type:"REMOVE_ITEM",payload:id})
        let updatedCart=state.cart.filter((currEle)=>{
          return currEle.newId!==id
      })
        updateCart(user,updatedCart);
    }

    const ClearCart=()=>{
        dispatch({type:"CLEAR_CART"})
        updateCart(user,[]);
    }

    const setDecrease=(id)=>{
        dispatch({type:"DECREASE_ITEM",payload:id});
        const newCart=state.cart.map((currEle)=>{
          if(currEle.newId===id){
              let decAmount=currEle.amount-1;
              if(decAmount==0){
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
        updateCart(user,newCart);
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
        updateCart(user,newCart);
    }
    
    useEffect(()=>{
        dispatch({type:"CART_TOTAL_ITEMS"});
        if(isAuthenticated){
            getCartData(user).then((newCart)=>{
                dispatch({type:"SET_CART",payload:newCart});
            });
        }else{
          return ()=>{}
            // localStorage.setItem("userCart",JSON.stringify(state.cart))            
        }
  //Have to stringify because it stores string data only,whereas we had an array here
    },[state.cart,user])
    return  <CartContext.Provider value={{...state,addToCart,removeItem,ClearCart,setIncrease,setDecrease}}>
    {children}
    </CartContext.Provider>
}

export {CartContext,CartProvider}