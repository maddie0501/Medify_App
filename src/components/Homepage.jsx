import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card1 from "../assets/Card1.png";
import Card2 from "../assets/Card2.png";
import Card3 from "../assets/Card3.png";
import Dentistry from "../assets/Dentistry.png";
import PrimaryCare from "../assets/PrimaryCare.png";
import Cardiology from "../assets/Cardiology.png";
import MRIResonance from "../assets/MRIResonance.png";
import BloodTest from "../assets/BloodTest.png";
import Piscologist from "../assets/Piscologist.png";
import Laboratory from "../assets/Laboratory.png";
import XRay from "../assets/XRay.png";
import Specialists from '../assets/Specialists.png';
import PatientCaring from '../assets/PatientCaring.png';
import Blog from '../assets/Blog.png';
import Families from '../assets/Families.png';



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

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
              onClick={() => navigate("my-bookings")}
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
          <div style={{ position: "relative" }}>
            <div id="state" onClick={() => setIsOpen(true)}>
              <input
                type="search"
                value={selectedstate}
                readOnly
                placeholder="State"
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
                      //console.log("noob", isOpen, state);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <div id="state" style={{ backgroundColor: "red" }}>
            <label>Select State: </label>
            <select
              value={selectedstate}
              onChange={(e) => {
                setSelectedstate(e.target.value);
                setSelectedcity("");
              }}
            >
              <option value="">Select State</option>
              {states.map((state, idx) => (
                <option key={idx} value={state}>
                  <li>{state}</li>
                </option>
              ))}
            </select>
          </div> */}

          <div style={{ position: "relative" }}>
            <div id="city" onClick={() => setIsOpen2(true)}>
              <input
                type="search"
                value={selectedcity}
                readOnly
                placeholder="City"
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
                      // console.log("noob", isOpen, state);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <div id="city">
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
          </div> */}

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

                        const slotsAvailable =
                          Math.floor(Math.random() * 15) + 1;

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
                                selectedTimeSlot === slot
                                  ? "#2AA8FF"
                                  : "#f0f0f0",
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
                          ✅ Booking Confirmed for{" "}
                          <strong>{selectedDate}</strong> at{" "}
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

        <div className={styles.cards}>
          <img src={Card1} alt="Card1" />
          <img src={Card2} alt="Card2" />
          <img src={Card3} alt="Card3" />
        </div>

        <div className={styles.bulletcontainer}>
          <div className={styles.bullets}> </div>
          <div className={styles.bullets}></div>
          <div className={styles.bullets}></div>
        </div>

        <section>
          <h1
            style={{
              textAlign: "center",
              padding: "40px",
              color: " #1B3C74",
              fontSize: "30px",
            }}
          >
            Find by Specialisation
          </h1>

          <div className={styles.whitegrids}>
            <img src={Dentistry} alt="Dentistry" />
            <img src={PrimaryCare} alt="Primary Care" />
            <img src={Cardiology} alt="Cardiology" />
            <img src={MRIResonance} alt="MRIResonance" />
            <img src={BloodTest} alt="BloodTest" />
            <img src={Piscologist} alt="Piscologist" />
            <img src={Laboratory} alt="Laboratory" />
            <img src={XRay} alt="X-Ray" />
          </div>

          <div style={{ textAlign: "center", padding: "40px" }}>
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
              View All
            </button>
          </div>
        </section>


        <section style={{textAlign:"center", backgroundColor:"white"}}>
          <img src={Specialists} alt="Specialists"  style={{width:"100%"}}/>
        </section>

        <section>
          <img src={PatientCaring} alt="PatientCaring" />
        </section>

        <section style={{backgroundColor:"white"}}>
          <img src={Blog} alt="Blog" />
        </section>

        <section>
          <img src={Families} alt="Families" />
        </section>
      </div>
    </div>
  );
}

export default Homepage;
