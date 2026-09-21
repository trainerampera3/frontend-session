import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="hero-small">TRAVEL • EXPLORE • DISCOVER</p>

          <h1>Discover Your Next Destination</h1>

          <p>
            Explore beautiful places around the world and find the perfect
            destination for your next journey.
          </p>

          <Link to="/destinations" className="hero-button">
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;