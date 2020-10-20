/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link} from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Trade from "../../components/Trade";
import Reports from "../../components/Reports";
import "./styles.css";

export default function Landing() {

  return (
    <div className="landing-container">
      <div className="content">
        <section>
          <header>
            <p>The Resident Zombie</p>
          </header>

          <Reports/>

          <Trade />

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>
      </div>
    </div>
  );
}
