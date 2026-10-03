import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import Customers from "./pages/customers";
import Products from "./pages/products";
import Home from "./pages/home";
import Stores from "./pages/stores";
import Login from "./pages/login";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Navigate } from "react-router-dom";

export default function App() {
  

  const [loggedIn, setLoggedIn] = useState(false);
 
      return <>
    {!loggedIn ?
        (
            <>
                <Routes>
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}/>

                    <Route path="*" element={<Navigate to="/login" replace />}/>
                </Routes>

            </>
        ):(
    <>
     
    
    
      <div className="navbar">
      <nav className="nav">
        <Link to="/"  className="nav-items"><div >Home</div></Link>

          <Link to="/customers" style={{textDecoration: 'none'}}><div className="nav-items">Customers</div></Link>
        
          <Link to="/products"   className="nav-items"><div >Products</div></Link>

          <Link to='/stores' className="nav-items"><div >Stores</div></Link>
        
      </nav>
      <button className="buts extra"  onClick={(e) =>{setLoggedIn(false)}}>Logout </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stores" element={<Stores />} />
        

      </Routes>

    
   
    </>
  )}
  <ToastContainer position="top-center" autoClose={3000} />
  </>
  
}