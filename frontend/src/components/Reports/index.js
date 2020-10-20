
import React, { useEffect, useState } from "react";
import api from '../../services/api'
export default function Reports() {

  const [avgInfected, setAvgInfected] = useState(null);
  const [avgNonInfected, setAvgNonInfected] = useState(null);
  const [fijiiWater, setFijiiWater] = useState(0);
  const [campbellSoup, setCampbellSoup] = useState(0);
  const [firstAidPouch, setFirstAidPouch] = useState(0);
  const [ak47, setAk47] = useState(0);
  const [lostPoints, setLostPoints] = useState(0);

async function fetchReports() {
    const infected = await api.get("api/report/non_infected.json");
    const nonInfected = await api.get("api/report/non_infected.json");
    const avgInventory = await api.get("api/report/people_inventory.json");
    const avgLostPoints = await api.get("api/report/infected_points.json");
    setAvgInfected(infected.data.report.average_healthy);
    setAvgNonInfected(nonInfected.data.report.average_healthy);
    setFijiiWater(
      avgInventory.data.report.average_quantity_of_each_item_per_person[
        "Fiji Water"
      ]
    );
    setCampbellSoup(
      avgInventory.data.report.average_quantity_of_each_item_per_person[
        "Campbell Soup"
      ]
    );
    setFirstAidPouch(
      avgInventory.data.report.average_quantity_of_each_item_per_person[
        "First Aid Pouch"
      ]
    );
    setAk47(
      avgInventory.data.report.average_quantity_of_each_item_per_person["AK47"]
    );
    setLostPoints(avgLostPoints.data.report.total_points_lost);
  }

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="reports-container">
    <h3>Reports:</h3>
    <p>% infected survivors: {avgInfected}</p>
    <p>% non infected survivors: {avgNonInfected}</p>
    <p>Average resources:</p>

    <div className="resources-div">
      <p>Fiji Water: {fijiiWater ? fijiiWater.toFixed(1) : "0"}</p>
      <p>
        Campbell Soup: {campbellSoup ? campbellSoup.toFixed(1) : "0"}
      </p>
      <p>
        First Aid Pouch:{" "}
        {firstAidPouch ? firstAidPouch.toFixed(1) : "0"}
      </p>
      <p>AK47: {ak47 ? ak47.toFixed(1) : "0"}</p>
    </div>

    <p>Points lost: {lostPoints}</p>
  </div>
  )

}