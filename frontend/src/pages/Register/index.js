import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import mapIcon from "../../utils/mapIcon";

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isFemale, setIsFemale] = useState(true);
  const [position, setPosition] = useState({ longitude: "0", latitude: "0" });
  const [initialPosition, setInitialPosition] = useState({
    latitude: "",
    longitude: "",
  });
  const [items, setItems] = useState("Fiji Water:10;Campbell Soup:5");
  const history = useHistory();

  function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    setPosition({ longitude: lng, latitude: lat });
    console.log(initialPosition)
    console.log(position)
  }

  async function handleRegister(e) {
    e.preventDefault();
    setItems({
      "Fijii Water": "10",
      AK47: "3",
    });

    const lonlat = `POINT(${parseFloat(position.longitude).toFixed(
      3
    )} ${parseFloat(position.latitude).toFixed(3)})`;
    let gender = "";

    if (isFemale) {
      gender = "F";
    } else {
      gender = "M";
    }

    const data = {
      name,
      age,
      gender,
      lonlat,
      items,
    };

    try {
      const response = await api.post("api/people.json", data);

      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, tente novamente");
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setInitialPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, setInitialPosition({latitude: 0, longitude: 0}));
  }, []);

  return (
    <div className="register-container">
      
      <div className="content">
        <p>The Resident Zombie</p>
        <section>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <h2>Enter the survivor's info bellow</h2>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div class="map-container">
            <Map
              center={
                initialPosition.latitude !== 0
                  ? [initialPosition.latitude, initialPosition.longitude]
                  : [-5.81740205715448, -35.207336421590306]
              }
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {position.latitude !== 0 ? (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              ) : null}
            </Map>
          </div>

          <h3>Select your gender</h3>
          <div className="button-select">
            <button
              type="button"
              className={isFemale ? "active" : ""}
              onClick={() => setIsFemale(true)}
            >
              Female
            </button>
            <button
              type="button"
              className={!isFemale ? "active" : ""}
              onClick={() => setIsFemale(false)}
            >
              Male
            </button>
          </div>
          <button className="button">Sign up</button>
        </form>
      </div>
    </div>
  );
}
