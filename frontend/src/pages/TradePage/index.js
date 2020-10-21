import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Trade from "../../components/Trade";

import "./styles.css";

export default function TradePage() {
  return (
    <div className="tradePage-container">
      <Header />
      <section className="content">
        <h2>You can trade your items with other survivors</h2>
        <h3>Just make sure the total points of both parts are equal.</h3>
          <div className="tradePage-content">
            <Trade/>
          </div>
      </section>
      <Footer />
    </div>
  );
}
