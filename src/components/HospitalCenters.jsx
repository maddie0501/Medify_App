import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function HospitalCenters() {
  const navigate = useNavigate();
  const location = useLocation();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [center, setCenter] = useState([]);
  const [loading, setloading] = useState(true);

  const [selectedstate, setSelectedstate] = useState("");
  const [selectedcity, setSelectedcity] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [activeCalendarIndex, setActiveCalendarIndex] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    console.log(location);

    const state = params.get("state");
    const city = params.get("city");
    setSelectedstate(state);
    setSelectedcity(city);
  }, []);

  useEffect(() => {
    const fetchstates = async () => {
      try {
        const res = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );

        setStates(res.data);
        // setSelectedstate("");
        setCities([]);
        // setSelectedcity("");
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
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

          setCities(res.data);
          // setSelectedcity("");

          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setloading(false);
        }
      }
    };
    fetchcities();
  }, [selectedstate]);

  useEffect(() => {
    handleFindCenters();
  }, [location, selectedstate, selectedcity]);

  const handleFindCenters = async () => {
    if (selectedstate && selectedcity) {
      try {
        const res = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${selectedstate}&city=${selectedcity}`
        );
        console.log("Fetched centers:", res.data);
        setCenter(res.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    }
  };

  const availableDates = [...Array(7)].map((_, i) => {
    //get 7 dates array
    const date = new Date();
    date.setDate(date.getDate() + i); // local date today then + 1
    return date.toISOString().split("T")[0]; // return only dates not time
  });

  const handleBookClick = (centerData, index) => {
    setSelectedCenter(centerData);
    setActiveCalendarIndex(true);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setActiveCalendarIndex((prev) => (prev === index ? null : index)); // open only 1 calender for 1 center at a time
  };

  const handleConfirmBooking = () => {
    if (!selectedCenter || !selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    const booking = {
      "Hospital Name": selectedCenter["Hospital Name"],
      City: selectedCenter.City,
      State: selectedCenter.State,
      "Hospital Type": selectedCenter["Hospital Type"],
      "Hospital overall rating": selectedCenter["Hospital overall rating"],
      bookingDate: selectedDate,
      bookingTime: selectedTimeSlot,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(booking); // Add the new booking

    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    alert("Booking confirmed!");
    setActiveCalendarIndex(false);
    navigate("/my-bookings");
  };

  return (
    <div>
      {loading}
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
          <a href="#" style={{ color: "#2AA8FF", textDecoration: "none" }}>
            Find Doctors
          </a>
          <a href="#" style={{ color: "black" }}>
            Hospitals
          </a>
          <a href="#" style={{ color: "black" }}>
            Medicines
          </a>
          <a href="#" style={{ color: "black" }}>
            Surgeries
          </a>
          <a href="#" style={{ color: "black" }}>
            Software for Provider
          </a>
          <a href="#" style={{ color: "black" }}>
            Facilites
          </a>
          <button
            style={{
              backgroundColor: "rgba(42, 168, 255, 1)",
              color: "white",
              width: "130px",
              height: "40px",
              borderRadius: "8px",
              border: "none",
            }}
            onClick={() => navigate("my-bookings")}
          >
            My Bookings
          </button>
        </div>
      </nav>

      <section className={styles.searchpart}>
        <div style={{ position: "relative" }}>
          <div id="state" onClick={() => setIsOpen(true)}>
            <input
              type="search"
              value={selectedstate}
              readOnly
              placeholder="State"
              style={{ padding: "5px" }}
            />
          </div>
          {isOpen && (
            <ul
              id="statedrop"
              style={{
                backgroundColor: "white",
                position: "absolute",
                height: "200px",
                width: "100%",
                overflowY: "scroll",
                border: "1px solid gray",
                top: "40px",
                left: "0",
                zIndex: "10",
              }}
            >
              {states.map((state, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedstate(state);
                    setIsOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <div id="city" onClick={() => setIsOpen2(true)}>
            <input
              type="search"
              value={selectedcity}
              readOnly
              placeholder="City"
              style={{ padding: "5px" }}
            />
          </div>
          {isOpen2 && (
            <ul
              id="statedrop"
              style={{
                backgroundColor: "white",
                position: "absolute",
                height: "200px",
                width: "100%",
                overflowY: "scroll",
                border: "1px solid gray",
                top: "40px",
                left: "0",
                zIndex: "10",
              }}
            >
              {cities.map((city, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSelectedcity(city);
                    setIsOpen2(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          style={{
            backgroundColor: "rgba(42, 168, 255, 1)",
            color: "white",
            width: "130px",
            height: "40px",
            borderRadius: "8px",
            border: "none",
            marginLeft: "10px",
          }}
          onClick={handleFindCenters}
          type="submit"
        >
          Search
        </button>
      </section>

      {center.length > 0 && (
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "20px",
            lineHeight: "28px",

            textAlign: "center",
            marginTop: "20px",
            textTransform: "lowercase",
          }}
        >
          {center.length} medical centers available in{" "}
          {selectedcity.toLowerCase()}
        </h1>
      )}
      <p
        style={{
          fontFamily: "Poppins",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "100%",
          letterSpacing: "0%",
          textAlign: "center",

          color: "#787887",
        }}
      >
        Book appointments with minimum wait-time & verified doctor details
      </p>

      <div>
        {center.length > 0 ? (
          center.map((c, index) => (
            <div key={index}>
              <div className={styles.doctorCard}>
                <h3 style={{ color: "#2AA8FF" }}>{c["Hospital Name"]}</h3>
                <p style={{ paddingTop: "10px" }}>
                  <strong>
                    {c.City}, {c.State}
                  </strong>
                </p>
                <p style={{ paddingTop: "10px" }}>
                  <strong style={{ color: "#01A400" }}>FREE</strong>{" "}
                  Consultation fee at Clinic
                </p>
                <p style={{ paddingTop: "10px" }}>
                  ⭐ {c["Hospital overall rating"] || "Not Rated"}
                </p>

                <div style={{ marginLeft: "500px", justifyContent: "end" }}>
                  <p
                    style={{
                      paddingBottom: "10px",
                      marginLeft: "50px",
                      color: "#01A400",
                    }}
                  >
                    Available Today
                  </p>
                  <button
                    onClick={() => handleBookClick(c, index)}
                    style={{
                      backgroundColor: "#2AA8FF",
                      color: "white",
                      width: "212px",
                      height: "40px",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    Book FREE Center Visit
                  </button>
                </div>
              </div>

              {activeCalendarIndex === index && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
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
                          : new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                            });

                      const slotsAvailable = Math.floor(Math.random() * 15) + 1;

                      return (
                        <div
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          style={{
                            minWidth: "180px",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "16px",
                            textAlign: "center",
                            flexShrink: 0,
                            backgroundColor:
                              selectedDate === date ? "#2AA8FF" : "#f9f9f9",
                            color: selectedDate === date ? "white" : "black",
                            cursor: "pointer",
                          }}
                        >
                          <p>
                            <strong>{label}</strong>
                          </p>
                          <p style={{ color: "#01A400" }}>
                            {slotsAvailable} Slots Available
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {[
                    { label: "Morning", slots: ["10:00 AM", "11:00 AM"] },
                    {
                      label: "Afternoon",
                      slots: ["12:00 PM", "1:00 PM", "3:00 PM"],
                    },
                    { label: "Evening", slots: ["5:00 PM", "6:00 PM"] },
                  ].map((group) => (
                    <div key={group.label} style={{ marginBottom: "10px" }}>
                      <p style={{ fontWeight: "bold" }}>{group.label}</p>
                      {group.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={{
                            margin: "5px",
                            border: "1px solid #2AA7FF",
                            backgroundColor:
                              selectedTimeSlot === slot ? "#2AA8FF" : "#f0f0f0",
                            color:
                              selectedTimeSlot === slot ? "white" : "black",

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
                      <p>
                        ✅ Booking Confirmed for <strong>{selectedDate}</strong>{" "}
                        at <strong>{selectedTimeSlot}</strong>
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
          ))
        ) : (
          <p style={{ marginLeft: "400px" }}>You may be looking for</p>
        )}
      </div>
      <div></div>
    </div>
  );
}
export default HospitalCenters;
