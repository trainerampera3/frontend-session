import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Products from './pages/Products.jsx'
import Customers from './pages/Customers.jsx'
import Orders from './pages/Orders.jsx'
import Stores from './pages/Stores.jsx'
import Navbar from './components/Navbar.jsx'
import CardProvider from './context/CardContext.jsx'

function App() {
  return (
    <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} /> 
        
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<CardProvider><Customers /> </CardProvider>} />
        <Route path="/orders" element={<CardProvider><Orders /> </CardProvider>} />
        <Route path="/stores" element={<CardProvider><Stores /> </CardProvider>} />
      </Routes>
    </Router>
  )
}

export default App
