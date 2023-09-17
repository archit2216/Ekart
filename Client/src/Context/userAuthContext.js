import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth} from '../Components/Config/config';

const userAuthContext=createContext("");

export function UserAuthProvider({children}){

    const [user,setUser]=useState("");

    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }

    function login(email,password){
        localStorage.setItem('isAuth', true)
        return signInWithEmailAndPassword(auth,email,password);
    }

    function logOut(){
        localStorage.setItem('isAuth', false)
        return signOut(auth);
    }
    function googleLogin(){
        const googleAuthProvider=new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider);
    }


    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        });
        return ()=>{
            unsubscribe();
        }
    },[user]);

    return <userAuthContext.Provider value={{user,signup,login,logOut,googleLogin}}>
            { children }
        </userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext);
}