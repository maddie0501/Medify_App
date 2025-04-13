import Homepage from './components/Homepage'
import './App.css'
import Bookings from './components/MyBookingpage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/my-bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
}
export default App
