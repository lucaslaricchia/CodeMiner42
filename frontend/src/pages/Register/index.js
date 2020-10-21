import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import mapIcon from "../../utils/mapIcon";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isFemale, setIsFemale] = useState(true);
  const [position, setPosition] = useState({ longitude: "0", latitude: "0" });
  const [initialPosition, setInitialPosition] = useState({
    latitude: "",
    longitude: "",
  });
  const [items, setItems] = useState({
    "Fiji Water": 0,
    "Campbell Soup": 0,
    "First Aid Pouch": 0,
    AK47: 0,
  });
  const history = useHistory();

  function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    setPosition({ longitude: lng, latitude: lat });
    console.log(initialPosition);
    console.log(position);
  }

  async function handleRegister(e) {
    e.preventDefault();

    let itemString = [];

    Object.keys(items).forEach((key) => {
      if (items[key] !== "0") {
        itemString.push(`${key}:${items[key]}`);
      }
    });
    console.log(items);
    console.log(itemString);

    const lonlat = `POINT(${parseFloat(position.longitude).toFixed(
      3
    )} ${parseFloat(position.latitude + 0.1).toFixed(3)})`;
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
      items: itemString.join(";"),
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
    }, setInitialPosition({ latitude: 0, longitude: 0 }));
  }, []);

  return (
    <div className="register-container">
      <Header />
      <div className="content">
        <form onSubmit={handleRegister}>
          <h2>Enter the survivor's info bellow</h2>
          <div className="name-age">
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
          </div>

          <div class="map-container">
            <Map
              center={
                initialPosition.latitude !== 0
                  ? [initialPosition.latitude, initialPosition.longitude]
                  : [-5.7937409, -35.2040634]
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

          <h3>How many items do you have?</h3>
          <div className="inventory-items">
            <div className="item">
              <p>Fijii Water: </p>
              <input
                value={items["Fiji Water"]}
                onChange={(e) =>
                  setItems({ ...items, "Fiji Water": e.target.value })
                }
                min="0"
                max="99"
                type="number"
              />
            </div>
            <div className="item">
              <p>Campbell Soup: </p>
              <input
                value={items["Campbell Soup"]}
                onChange={(e) =>
                  setItems({ ...items, "Campbell Soup": e.target.value })
                }
                type="number"
                min="0"
                max="99"
              />
            </div>
            <div className="item">
              <p>First Aid Pouch: </p>
              <input
                value={items["First Aid Pouch"]}
                onChange={(e) =>
                  setItems({ ...items, "First Aid Pouch": e.target.value })
                }
                type="number"
                min="0"
                max="99"
              />
            </div>
            <div className="item">
              <p>AK47: </p>
              <input
                value={items["AK47"]}
                onChange={(e) => setItems({ ...items, AK47: e.target.value })}
                type="number"
                min="0"
                max="99"
              />
            </div>
          </div>
          <button className="button">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
