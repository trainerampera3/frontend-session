import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8001/destinations/${id}`)
      .then(response => response.json())
      .then(data => setDestination(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!destination) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details">
      <img src={destination[7]} alt={destination[1]} />

      <div>
        <h1>{destination[1]}</h1>
        <h3>{destination[2]}</h3>

        <p>{destination[4]}</p>

        <p>
          <strong>Category:</strong> {destination[3]}
        </p>

        <p>
          <strong>Best Time:</strong> {destination[5]}
        </p>

        <p>
          <strong>Average Cost:</strong> ${destination[6]}
        </p>
      </div>
    </div>
  );
}

export default DestinationDetails;