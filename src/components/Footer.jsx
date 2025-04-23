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
      <section style={{ position: "relative" }}>
        <img
          src={DownloadApp}
          alt="DownloadApp"
          style={{
            width: "100%",
            display: "block",
            zIndex: 2,
            position: "relative",
          }}
        />

        <img
          src={Contacts}
          alt="Contacts"
          style={{
            width: "100%",
            position: "relative",
            top: "-45px",
            zIndex: 1,
          }}
        />
      </section>
    </div>
  );
}

export default Footer;
