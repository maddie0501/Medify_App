import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Select from "react-select";

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

  const formatOptions = (data) =>
    data.map((item) => ({ value: item, label: item }));

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
    <div className={styles.body}>
      <div className={styles.sticky}>
        <p style={{ padding: "5px" }}>
          The health and well-being of our patients and their health care team
          will always be our priority, so we follow the best practices for
          cleanliness.
        </p>
      </div>

      <nav className={styles.navbar}>
        <h3 style={{ color: "#2AA8FF" }}>Medify</h3>

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

      <div className={styles.hero}>
        <h2 style={{ padding: "10px" }}>
          Skip the travel! Find Online <strong>Medical</strong>
          <span style={{ color: "#2AA8FF" }}> Centers</span>
        </h2>
        <h4 style={{ padding: "10px", color: "gray" }}>
          Connect instantly with a 24x7 specialist or choose to video visit a
          particular doctor.
        </h4>
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
        <div id="state" >
          <Select
            options={formatOptions(states)}
            value={
              selectedstate
                ? { value: selectedstate, label: selectedstate }
                : null
            }
            onChange={(selectedOption) =>
              setSelectedstate(selectedOption?.value || "")
            }
            placeholder="State"
          />
        </div>

        <div id="city" >
          <Select
            options={formatOptions(cities)}
            value={
              selectedcity ? { value: selectedcity, label: selectedcity } : null
            }
            onChange={(selectedOption) =>
              setSelectedcity(selectedOption?.value || "")
            }
            placeholder="City"
            isDisabled={!selectedstate}
          />
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

      <div>
        {center.length > 0 ? (
          center.map((c, index) => (
            <div key={index} className={styles.doctorCard}>
              <h3 style={{ color: "rgba(42, 168, 255, 1)" }}>
                {c["Hospital Name"]}
              </h3>
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
                  border: "none",
                  justifyContent: "end",
                }}
                onClick={() => handleBookClick(c)}
              >
                Book FREE Center Visit
              </button>
            </div>
          ))
        ) : (
          <p>You may be looking for </p>
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
                  : new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                    });

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
