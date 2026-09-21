import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Travel Explorer</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
      </div>
    </nav>
  );
}

export default Navbar;