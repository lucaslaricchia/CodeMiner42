/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";

import Reports from "../../components/Reports";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./styles.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <Header className="header" />
      <div className="content">
        <div className="description">
          <h2>Hello fellow survivor!</h2>
          <h3>
            Here is a community where you can stay safe from T-Virus
          </h3>
          <p>
            Lets unite the remaining humans, to build a community where we can stay safe from
            "Influenzer T-Virus".
            Here we can share our last location safely, and trade items with another survivors!
            
          </p>
        </div>
        <div className="menu">
          <p>New Survivor? Register here!</p>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <p>If you want to register a new location click here</p>
          <Link to="/update">
            <button>Update Location</button>
          </Link>
          <p>If you suspect that anyone is infected click here</p>
          <Link to="/flaginfected">
            <button>Flag Infected</button>
          </Link>
          <p>To trade items with another survivor click here</p>
          <Link to="/trade">
            <button>Trade Items</button>
          </Link>
          <Reports />
        </div>
      </div>
      <Footer />
    </div>
  );
}
