import React,{useState,useEffect} from "react";


function Bookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(storedBookings);
        console.log(storedBookings)
      }, []);
    
    
    return (
        <div style={{ padding: "20px" }}>
        <h1>My Bookings</h1>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={index}
              style={{
                margin: "20px 0",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{booking.hospital["Hospital Name"]}</h3>
              <p>
                {booking.hospital.Address}, {booking.hospital.City},{" "}
                {booking.hospital.State} {booking.hospital["ZIP Code"]}
              </p>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

    )
}

export default Bookings;