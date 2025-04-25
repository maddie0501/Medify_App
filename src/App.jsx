import Homepage from "./components/Homepage";
import "./App.css";
import Bookings from "./components/MyBookingpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HospitalCenters from "./components/HospitalCenters";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/centers" element={<HospitalCenters />} />
        <Route path="/my-bookings" element={<Bookings />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
