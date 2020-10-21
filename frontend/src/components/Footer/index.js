import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";

export default function Footer() {
  return (
    <div className="wrapper">
      <p>Lucas Laricchia Front-End Developer</p>
      <Link className="back-link" to="/landing">
        <FiArrowLeft size={16} color="#e02041" />
        Back
      </Link>
    </div>
  );
}
