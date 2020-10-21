import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";

import { useHistory } from "react-router-dom";

import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./styles.css";

export default function FlagInfected() {
  const [survivorId, setSurvivorId] = useState("");
  const [survivorInfectedName, setSurvivorInfectedName] = useState("");
  const [survivorsList, setSurvivors] = useState([]);
  const history = useHistory();

  async function loadSuvivors() {
    const { data } = await api.get("api/people.json");
    setSurvivors(data);
  }

  async function findSurvivorIdByName(name = "") {
    const survivorNameList = survivorsList.filter((survivor) => {
      return survivor.name === name;
    });
    if (isEmpty(survivorNameList)) {
      alert("Survivor not found")
      return ""
    } else {
      const { data: survivor } = await api.get(survivorNameList.pop().location);
      return survivor.id;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const infectedId = await findSurvivorIdByName(survivorInfectedName);
    if(infectedId === ""){
      return
    }
    const data = {
      infected: infectedId,
    };
    try{
      const response = await api.post(
        `api/people/${survivorId}/report_infection.json`,
        data
      );
      if(response.status === 204){
        alert("Thank you for helping the community!");
        history.push("/landing");
      }
    }
    catch(err){
      alert(err)
    }
    
  }

  useEffect(() => {
    loadSuvivors();
  }, []);

  return (
    <div className="flag-infected-container">
      <Header />
      <section className="content">
        <form onSubmit={handleSubmit}>
          <h2>If you suspect someone is infected, please tell us</h2>
          <p>
            A survivor who gets 5 flags as infected will be REMOVED from the
            community
          </p>
          <p>Yes you are right, we don't accept T-Zombies</p>
          <input
            type="text"
            placeholder="Your ID"
            value={survivorId}
            required={true}
            onChange={(e) => setSurvivorId(e.target.value)}
          />
          <h5>We will keep it secret.</h5>
          <input
            type="text"
            placeholder="Infected survivor's full name"
            value={survivorInfectedName}
            required={true}
            onChange={(e) => setSurvivorInfectedName(e.target.value)}
          />
          <button>Flag as infected</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
