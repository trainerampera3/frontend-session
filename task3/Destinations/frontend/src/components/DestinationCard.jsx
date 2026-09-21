import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <div className="card">
      <img
        src={destination[7]}
        alt={destination[1]}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
        }}
      />

      <div className="card-content">
        <span className="category">{destination[3]}</span>

        <h2>{destination[1]}</h2>

        <p className="country">{destination[2]}</p>

        <p>{destination[4]}</p>

        <div className="card-info">
          <p>
            <strong>Best Time:</strong> {destination[5]}
          </p>

          <p>
            <strong>Average Cost:</strong> ${destination[6]}
          </p>
        </div>

        <Link to={`/destinations/${destination[0]}`} className="details-button">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;