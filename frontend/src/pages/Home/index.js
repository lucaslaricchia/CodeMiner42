import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "./styles.css";

export default function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <main>
          <h1>Worried about Influenzers T-Virus?
          </h1>
          <h2>Please enter and see more</h2>
        </main>
        <Link to="/landing" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}
