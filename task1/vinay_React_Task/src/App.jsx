import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Customers from './pages/Customers.jsx'
import Orders from './pages/Orders.jsx'
import Stores from './pages/Stores.jsx'
import Navbar from './components/Navbar.jsx'
import CardProvider from './context/CardContext.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<CardProvider><Customers /> </CardProvider>} />
        <Route path="/orders" element={<CardProvider><Orders /> </CardProvider>} />
        <Route path="/stores" element={<CardProvider><Stores /> </CardProvider>} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
