import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory } from "react-router-dom";

import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import mapIcon from "../../utils/mapIcon";
import "./styles.css";
import "leaflet/dist/leaflet.css";

export default function UpdateLocation() {
  const [survivorId, setSurvivorId] = useState("");
  const [position, setPosition] = useState({ longitude: "0", latitude: "0" });
  const [initialPosition, setInitialPosition] = useState({
    latitude: "",
    longitude: "",
  });

  const history = useHistory();

  function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    setPosition({ longitude: lng, latitude: lat });
    console.log(initialPosition);
    console.log(position);
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const { data: survivor } = await api.get(`api/people/${survivorId}.json`);

      const data = {
        person: {
          name: survivor.name,
          age: survivor.age,
          gender: survivor.gender,
          lonlat: `POINT(${parseFloat(position.longitude).toFixed(
            3
          )} ${parseFloat(position.latitude + 0.1).toFixed(3)})`,
        },
      };

      try {
        await api.patch(`api/people/${survivorId}.json`, data);

        alert(`New Location Saved`);
        history.push("/landing");
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      alert(err);
      setSurvivorId("");
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setInitialPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, setInitialPosition({ latitude: -5.7937409, longitude: -35.2040634 }));
  }, []);

  return (
    <div className="update-container">
      <Header />
      <section className="content">
        <form onSubmit={handleUpdate}>
          <h2>Enter your id to update your last location</h2>
          <input
            type="text"
            placeholder="Surivor ID"
            value={survivorId}
            onChange={(e) => setSurvivorId(e.target.value)}
          />
          <div className="map-container">
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
          <button>Update location</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
