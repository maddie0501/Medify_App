import React from "react";
import FAQs from "../assets/FAQs.png";
import DownloadApp from "../assets/DownloadApp.png";
import Contacts from "../assets/Contacts.png";

function Footer() {
  return (
    <div style={{ width: "100%" }}>
      <section>
        <img src={FAQs} alt="FAQs" style={{ width: "100%" }} />
      </section>
      <section
        style={{
          position: "relative",
          overflow: "visible",
          paddingBottom: "60px",
          marginBottom: 0,
        }}
      >
        <img
          src={DownloadApp}
          alt="DownloadApp"
          style={{
            width: "100%",
            display: "block",
            position: "relative",
            zIndex: 1,
          }}
        />

        <img
          src={Contacts}
          alt="Contacts"
          style={{
            width: "100%",
            height: "60vh",
            position: "absolute",
            left: 0,
            bottom: "-300px",
            zIndex: 2,
          }}
        />
      </section>
    </div>
  );
}

export default Footer;
