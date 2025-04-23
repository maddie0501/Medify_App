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
        <Route
          path="/"
          element={
            <>
              <Homepage />
              <Footer />
            </>
          }
        />
         <Route path="/centers" element={<HospitalCenters />} />
        <Route path="/my-bookings" element={
          <>
            <Bookings />
            <Footer />
          </>
         } />
      </Routes>
    </Router>
  );
}
export default App;
