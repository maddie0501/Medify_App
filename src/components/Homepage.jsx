import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Select from "react-select";

function Homepage() {
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

  const formatOptions = (data) =>
    data.map((item) => ({ value: item, label: item }));

  const navigate = useNavigate();

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
          //console.log(res);
          setCities(res.data);
          setSelectedcity("");

          setloading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setloading(false);
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
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false);
      }
    }
  };

  const availableDates = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const handleBookClick = (centerData,index) => {
    setSelectedCenter(centerData);
    setActiveCalendarIndex(true);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setActiveCalendarIndex(prev => prev === index ? null : index);
  };

  const handleConfirmBooking = () => {

    if (!selectedCenter || !selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot.");
      return;
    }
  
    const booking = {
      center: selectedCenter, 
      date: selectedDate,
      time: selectedTimeSlot,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));
    alert("Booking confirmed!");
    setActiveCalendarIndex(false);
    navigate("/my-bookings");
  };


  
  return (
    <div className={styles.container}>
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
              onClick={() => navigate("/my-bookings")}
            >
              My Bookings
            </button>
          </div>
        </nav>

        <div className={styles.hero}>
          <h2 style={{ padding: "10px" }}>
            Skip the travel! Find Online <strong>Medical</strong>
            <span style={{ color: "#2AA8FF" }}> Centers</span>
          </h2>
          <h3 style={{ padding: "10px", color: "gray" }}>
            Connect instantly with a 24x7 specialist or choose to video visit a
            particular doctor.
          </h3>
          <button
            style={{
              backgroundColor: "rgba(42, 168, 255, 1)",
              color: "white",
              width: "130px",
              height: "40px",
              borderRadius: "8px",
              border: "none",
              padding: "10px",
            }}
          >
            Find Centers
          </button>
        </div>

        <section className={styles.searchpart}>
          <div id="state">
          <label>Select State: </label>
        <select
          value={selectedstate}
          onChange={e => {
            setSelectedstate(e.target.value);
            setSelectedcity("");
          }}
        >
          <option value="">Select State</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>
              {state}
            </option>
          ))}
        </select>
          </div>

          <div id="city">
          <label>Select City: </label>
          <select
  value={selectedcity}
  onChange={(e) => setSelectedcity(e.target.value)}
>
  <option value="">Select City</option>
  {cities.map((city, idx) => (
    <option key={idx} value={city}>
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
              border: "none",
              marginLeft: "10px",
            }}
            onClick={handleFindCenters}
            type="submit"
          >
            Search
          </button>
        </section>
        <p
          style={{
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            verticalAlign: "middle",
            color: "#787887",
            width: "598px",
            height: "24px",
            top: "432px",
            left: "173px",
            marginLeft: "200px",
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
                <p style={{ paddingTop: "10px" }}><strong>{c.City}, {c.State}</strong></p>
                <p style={{ paddingTop: "10px" }}><strong style={{ color: "#01A400" }}>FREE</strong> Consultation fee at Clinic</p>
                <p style={{ paddingTop: "10px" }}>⭐ {c["Hospital overall rating"] || "Not Rated"}</p>

                <div style={{ marginLeft: "500px", justifyContent: "end" }}>
                  <p style={{ paddingBottom: "10px",
                      marginLeft: "50px",
                      color: "#01A400" }}>Available Today</p>
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
                          <p><strong>{label}</strong></p>
                          <p style={{ color: "#01A400" }}>{slotsAvailable} Slots Available</p>
                        </div>
                      );
                    })}
                  </div>
                  {[
                    { label: "Morning", slots: ["10:00 AM", "11:00 AM"] },
                    { label: "Afternoon", slots: ["12:00 PM", "1:00 PM", "3:00 PM"] },
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
                            color: selectedTimeSlot === slot ? "white" : "black",
                            
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
          ))
        ) : (
          <p style={{ marginLeft: "400px" }}>You may be looking for</p>
        )}
      </div>
      </div>
      </div>
  );
}

export default Homepage;
