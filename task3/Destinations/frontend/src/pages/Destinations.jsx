import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";

function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/destinations")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDestinations(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Destinations</h1>

      <div className="grid">
        {destinations.map(destination => (
          <DestinationCard
            key={destination[0]}
            destination={destination}
          />
        ))}
      </div>
    </div>
  );
}

export default Destinations;