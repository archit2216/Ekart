import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './products';
import Contact from './Contact';
import Item from './Item';
import Cart from './Cart';
import Header from './Components/Header';
import Success from './Components/Success';
import Cancel from './Components/Cancel';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/products/:id' element={<Item/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/success' element={<Success/>} />
          <Route path='/cancel' element={<Cancel/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
