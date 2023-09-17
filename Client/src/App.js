import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Home';
import Products from './products';
import Contact from './Contact';
import Item from './Item';
import Cart from './Cart';
import Header from './Components/Header';
import Success from './Components/Success';
import Cancel from './Components/Cancel';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useContext } from 'react';
import {UserAuthProvider} from "./Context/userAuthContext";
import ProtectedRoute from './Components/ProtectedRoute';
import { useLocation } from 'react-router-dom';

function App() {

  const Main=()=>{
    const location=useLocation();
    return(
    <div>
      {location.pathname!=='/login' && location.pathname!=='/signup' && <Header/>}
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/products/:id' element={<Item/>} />
      <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
      <Route path='/success' element={<ProtectedRoute><Success/></ProtectedRoute>} />
      <Route path='/cancel' element={<ProtectedRoute><Cancel/></ProtectedRoute>} />
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
      <UserAuthProvider>
          {/* <Routes> */}
            <Main />
          {/* </Routes> */}
        </UserAuthProvider>
      </BrowserRouter>
    </div>
  );
}


export default App;
