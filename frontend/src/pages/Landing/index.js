/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {Link} from 'react-router-dom';

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
            TRZ (The Resident Zombie) is a community with a dream to survive
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="menu">
          <p>New Survivor? Register here!</p>
          <Link to="/register"><button>Register</button></Link>
          <p>If you want to register a new location click here</p>
          <Link to="/update"><button>Update Location</button></Link>
          <p>If you suspect that anyone is infected click here</p>
          <Link to="/flaginfected"><button>Flag Infected</button></Link>
          <p>To trade items with another survivor click here</p>
          <Link to="/trade"><button>Trade Items</button></Link>
          <Reports/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
