import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Products from './pages/Products.jsx'
import Customers from './pages/Customers.jsx'
import Orders from './pages/Orders.jsx'
import Stores from './pages/Stores.jsx'
import CardProvider from './context/CardContext.jsx'

function App() {
  return (
    <Router>
      
      <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '15px', justifyContent:'center' }}>
        <Link to="/products">Products</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/stores">Stores</Link>
      </nav>


      <Routes>
        <Route path="/" element={<Products />} /> 
        
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<CardProvider><Customers /> </CardProvider>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/stores" element={<Stores />} />
      </Routes>
    </Router>
  )
}

export default App
