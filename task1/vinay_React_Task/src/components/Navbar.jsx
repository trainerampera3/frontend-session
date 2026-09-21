import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        Ampera
      </Link>

      <div className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/stores">Stores</Link>
      </div>

    </nav>
  )
}

export default Navbar