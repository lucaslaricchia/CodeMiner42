import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import './styles.css';

export default function Footer() {
  return (
    <div className="wrapper">
      <p>Footer Text</p>
      <Link className="back-link" to="/">
        <FiArrowLeft size={16} color="#e02041" />
        Voltar
      </Link>
    </div>
  );
}
