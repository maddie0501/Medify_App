import React from "react";
import FAQs from "../assets/FAQs.png";
import DownloadApp from "../assets/DownloadApp.png";
import Contacts from "../assets/Contacts.png";

function Footer() {
  return (
    <div>
      <section>
        <img src={FAQs} alt="FAQs" />
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
            position: "absolute",
            left: 0,
            bottom: "-190px",
            zIndex: 2,
          }}
        />
      </section>
    </div>
  );
}

export default Footer;
