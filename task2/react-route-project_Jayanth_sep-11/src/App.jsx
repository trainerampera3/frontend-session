import  Products  from "./components/products.jsx";
import Customers from "./components/customer.jsx";
import { Orders } from "./components/orders.jsx";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home.jsx";
import FootballersSearch from "./hooks/footballsearch.jsx";
// import './components/prod.css'


export default function App(){

  return (

    <>
      <nav  className='navbar'>
        {/* <ul className='nav-list'>
          <li className="nav-list">
            <Link to='/'>Home</Link>
          </li>
          <li className='list-item'>
            <Link to='/products'>Products</Link>
           </li>
           <li className='list-item'>
            <Link to='/customers'>Customers</Link>
           </li>
          <li className='list-item'>
            <Link to='/orders'>Orders</Link>
          </li>
        </ul> */}
        <div className="nav">
          <Link to='/'><div className="nav-items">Home</div></Link>
          <Link to='/products'><div className="nav-items">Products</div></Link>
          <Link to='/customers'><div className="nav-items">Customers</div></Link>
          <Link to='/orders'><div className="nav-items">Orders</div></Link>
          <Link to='/search'><div className="nav-items">Search</div></Link>
        </div>
      </nav>
      <div  className="content">
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/products' element={<Products />} ></Route>
           <Route path='/customers' element={<Customers />} ></Route>
          <Route path='/orders' element={<Orders />} ></Route>
          <Route path='/search' element={<FootballersSearch />} ></Route>
        </Routes>
      </div>
    </>
  )
}