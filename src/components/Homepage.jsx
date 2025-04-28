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
import Specialists from "../assets/Specialists.png";
import PatientCaring from "../assets/PatientCaring.png";
import Blog from "../assets/Blog.png";
import Families from "../assets/Families.png";

function Homepage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setloading] = useState(true);

  const [selectedstate, setSelectedstate] = useState("");
  const [selectedcity, setSelectedcity] = useState("");

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
      navigate(`/centers?state=${selectedstate}&city=${selectedcity}`);
      // try {
      //   const res = await axios.get(
      //     `https://meddata-backend.onrender.com/data?state=${selectedstate}&city=${selectedcity}`
      //   );
      //   setCenter(res.data);
      //   setloading(false);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   setloading(false);
      // }
    }
  };

  return (
    <div className={styles.container}>
      {loading}
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
            onClick={() => navigate("/centers")}
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
            type="submit"
            onClick={handleFindCenters}
          >
            Search
          </button>
        </section>

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

          <div className={styles.whitegrids} style={{ width: "100%" }}>
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

        <section style={{ textAlign: "center", backgroundColor: "white" }}>
          <img src={Specialists} alt="Specialists" style={{ width: "100%" }} />
        </section>

        <section>
          <img
            src={PatientCaring}
            alt="PatientCaring"
            style={{ width: "100%" }}
          />
        </section>

        <section style={{ backgroundColor: "white", paddingRight: "10px" }}>
          <img src={Blog} alt="Blog" style={{ width: "100%" }} />
        </section>

        <section style={{ width: "100%" }}>
          <img src={Families} alt="Families" style={{ width: "100%" }} />
        </section>
      </div>
    </div>
  );
}

export default Homepage;
