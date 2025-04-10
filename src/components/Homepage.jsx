import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Homepage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [center, setCenter] = useState([]);

  const [selectedstate, setSelectedstate] = useState("");
  const [selectedcity, setSelectedcity] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    
    

//   const navigate = useNavigate();

  useEffect(() => {
    const fetchstates = async () => {
      try {
        const res = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );
        //console.log(res);
        setStates(res.data);
        setSelectedstate("");
        setCities([]);
        setSelectedcity("");
        // setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setloading(false);
      }
    };
    fetchstates();
  }, []);

  useEffect(() => {
    const fetchcities = async () => {
      if (selectedstate) {
        try {
          const res = await axios.get(
            `https://meddata-backend.onrender.com/cities/${selectedstate}`
          );
          //console.log(res);
          setCities(res.data);
          setSelectedcity("");

          // setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          // setloading(false);
        }
      }
    };
    fetchcities();
  }, [selectedstate]);

  const handleFindCenters = async () => {
    if (selectedstate && selectedcity) {
      try {
        const res = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${selectedstate}&city=${selectedcity}`
        );
        setCenter(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const availableDates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  });



  const handleBookClick = (centerData) => {
    setSelectedCenter(centerData);
    setShowCalendar(true);
    setSelectedDate("");
    setSelectedTimeSlot("");
  };

  const handleConfirmBooking = () => {
    const booking = {
      hospital: selectedCenter["Hospital Name"],
      state: selectedstate,
      city: selectedcity,
      date: selectedDate,
      time: selectedTimeSlot,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));
    alert("✅ Booking confirmed!");
    setShowCalendar(false);
  };
  return (
    <div>
      <p className={styles.sticky}>
        The health and well-being of our patients and their health care team
        will always be our priority, so we follow the best practices for
        cleanliness.
      </p>
      <nav className={styles.navbar}>
        <h2 style={{ color: "#2AA8FF" }}>Medify</h2>
        <h3>Find Doctors</h3>
        <h3>Hospitals</h3>
        <h3>Medicines</h3>
        <h3>Surgeries</h3>
        <h3>Software for Provider</h3>
        <h3>Facilites</h3>
        <button
          style={{
            backgroundColor: "rgba(42, 168, 255, 1)",
            color: "white",
            width: "130px",
            height: "40px",
            borderRadius: "8px",
          }}
        >
          My Bookings
        </button>
      </nav>

      <div className={styles.hero}>
        <h2>Skip the travel! Find Online Medical Centers</h2>
        <h4>
          Connect instantly with a 24x7 specialist or choose to video visit a
          particular doctor.
        </h4>
      </div>

      <section className={styles.searchpart}>
        <div id="state">
          <select
            style={{ padding: "10px" }}
            value={selectedstate}
            onChange={(e) => setSelectedstate(e.target.value)}
          >
            <option value="" disabled>
              State
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div id="city">
          <select
            style={{ padding: "10px" }}
            value={selectedcity}
            onChange={(e) => setSelectedcity(e.target.value)}
          >
            <option value="" disabled>
              City
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          style={{
            backgroundColor: "rgba(42, 168, 255, 1)",
            color: "white",
            width: "130px",
            height: "40px",
            borderRadius: "8px",
          }}
          onClick={handleFindCenters}
          type="submit"
        >
          Search
        </button>
      </section>

      <div style={{ marginTop: "20px" }}>
        {center.length > 0 ? (
          center.map((c, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                margin: "10px 0",
              }}
            >
              <h3>{c["Hospital Name"]}</h3>
              <p>
                {c.Address}, {c.City}, {c.State} {c["ZIP Code"]}
              </p>
              <p>Free Consulation fee at Clinic</p>
              <p> ⭐ {c["Hospital overall rating"] || "Not Rated"}</p>
              <button
                style={{
                  backgroundColor: "rgba(42, 168, 255, 1)",
                  color: "white",
                  width: "130px",
                  height: "40px",
                  borderRadius: "8px",
                }}
                onClick={() => handleBookClick(c)}
              >
                Book FREE Center Visit
              </button>
            </div>
          ))
        ) : (
          <p>You may be looking for</p>
        )}
      </div>

      {showCalendar && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
<h4>Select Appointment Date</h4>
<div
  style={{
    display: "flex",
    overflowX: "auto",
    gap: "16px",
    padding: "10px 0",
    scrollbarWidth: "none",
  }}
>
  {availableDates.map((date, idx) => {
    const label =
      idx === 0
        ? "Today"
        : idx === 1
        ? "Tomorrow"
        : new Date(date).toLocaleDateString("en-US", { weekday: "long" });

    // Fake slot count — replace this with your real logic
    const slotsAvailable = Math.floor(Math.random() * 15) + 1;

    return (
      <div
        key={date}
        style={{
          minWidth: "180px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "16px",
          textAlign: "center",
          flexShrink: 0,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>{label}</strong>
        </p>
        <p style={{ margin: "8px 0 0 0" }}>
          {slotsAvailable} slots available
        </p>
      </div>
    );
  })}
</div>


          <h4 style={{ marginTop: "15px" }}>Select Time of Day</h4>
          {[
            { label: "Morning", slots: ["10:00 AM", "11:00 AM"] },
            { label: "Afternoon", slots: ["12:00 PM", "1:00 PM", "3:00 PM"] },
            { label: "Evening", slots: ["5:00 PM", "6:00 PM"] },
          ].map((group) => (
            <div key={group.label} style={{ marginBottom: "10px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {group.label}
              </p>
              {group.slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  style={{
                    margin: "5px",
                    backgroundColor:
                      selectedTimeSlot === slot ? "#2AA8FF" : "#f0f0f0",
                    color: selectedTimeSlot === slot ? "white" : "black",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          ))}

          {selectedDate && selectedTimeSlot && (
            <>
              <p style={{ marginTop: "10px" }}>
                ✅ Booking Confirmed for <strong>{selectedDate}</strong> at{" "}
                <strong>{selectedTimeSlot}</strong>
              </p>
              <button
                onClick={handleConfirmBooking}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#2AA8FF",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Confirm Booking
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default Homepage;
