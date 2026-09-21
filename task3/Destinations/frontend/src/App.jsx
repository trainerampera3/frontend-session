import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;