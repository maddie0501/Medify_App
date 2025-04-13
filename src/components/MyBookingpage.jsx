import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

 
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    console.log(storedBookings);

    const normalized = storedBookings.map((booking) => {
      if (booking["Hospital Name"]) { 
        return {
          "Hospital Name": booking["Hospital Name"],
          "City": booking.City,
          "State": booking.State,
          "Hospital Type": booking["Hospital Type"],
          "Hospital overall rating": booking["Hospital overall rating"],
          bookingDate: booking.bookingDate, 
          bookingTime: booking.bookingTime, 
        };
      }
      return booking; 
    });

  
    if (JSON.stringify(storedBookings) !== JSON.stringify(normalized)) {
      localStorage.setItem("bookings", JSON.stringify(normalized)); 
    }

    setBookings(normalized); 
    setFilteredBookings(normalized); 
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);  
    const filtered = bookings.filter((booking) =>
      booking["Hospital Name"]?.toLowerCase().includes(e.target.value.toLowerCase())  
    );
    setFilteredBookings(filtered);  
  };
  
  return (
    <div className={styles.body}>
      <div className={styles.sticky}>
        <p style={{ padding: "5px" }}>
          The health and well-being of our patients and their health care team
          will always be our priority, so we follow the best practices for
          cleanliness.
        </p>
      </div>

      <nav className={styles.navbar}>
        <h2 style={{ color: "#2AA8FF" }}>Medify</h2>
        <div className={styles.topnav}>
          <h4 style={{ color: "#2AA8FF" }}>Find Doctors</h4>
          <h4>Hospitals</h4>
          <h4>Medicines</h4>
          <h4>Surgeries</h4>
          <h4>Software for Provider</h4>
          <h4>Facilites</h4>
          <button
            style={{
              backgroundColor: "rgba(42, 168, 255, 1)",
              color: "white",
              width: "130px",
              height: "40px",
              borderRadius: "8px",
              border: "none",
            }}
          >
            My Bookings
          </button>
        </div>
      </nav>

      <section className={styles.searchpart}>
        <div id="state">
          <input
            type="text"
            placeholder="Search by Hospital"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "rgba(42, 168, 255, 1)",
            color: "white",
            width: "130px",
            height: "40px",
            borderRadius: "8px",
            border: "none",
            marginLeft: "10px",
          }}
          type="submit"
        >
          Search
        </button>
      </section>

      <div
        style={{
          backgroundColor: "rgba(42, 168, 255, 1)",
          width: "100%",
          height: "110px",
          top: "124px",
          color: "white",
        }}
      >
        <h1>My Bookings</h1>
      </div>

      {filteredBookings.map((booking, index) => (
        <div key={index} className={styles.doctorCard}>
          <h3 style={{ color: "rgba(42, 168, 255, 1)" }}>
            {booking["Hospital Name"]}
          </h3>
          <p style={{ paddingTop: "10px" }}>
            <strong>
              {booking.City}, {booking.State}
            </strong>
          </p>
          <p style={{ paddingTop: "10px" }}>
            <strong style={{ color: "#01A400" }}> FREE</strong> Consultation fee at Clinic
          </p>
          <p style={{ paddingTop: "10px" }}>
            ⭐ {booking["Hospital overall rating"] || "Not Rated"}
          </p>
          <div style={{ marginLeft: "500px", justifyContent: "end" }}>
            <div>
              <p className={styles.btn1}>{booking.bookingDate}</p>
              <p className={styles.btn2}>{booking.bookingTime}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookings;
