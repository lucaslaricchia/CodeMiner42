/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import api from "../../services/api";
import "./styles.css";

export default function Trade() {
  const [survivorsList, setSurvivors] = useState([]);
  const [idSurvivor1, setIdSurvivor1] = useState("");
  const [nameSurvivor2, setNameSurvivor] = useState("");
  const [survivor1Inventory, setSurvivor1Inventory] = useState([]);
  const [survivor2Inventory, setSurvivor2Inventory] = useState([]);
  const [tradeInventory1, setTradeInventory1] = useState([]);
  const [tradeInventory2, setTradeInventory2] = useState([]);
  const [pointsTradeInventory1, setPointsTradeInventory1] = useState(0);
  const [pointsTradeInventory2, setPointsTradeInventory2] = useState(0);

  async function loadSuvivors() {
    const { data } = await api.get("api/people.json");
    setSurvivors(data);
  }

  async function findSurvivorIdByName(name = "") {
    const survivorList = survivorsList.filter((survivor) => {
      return survivor.name === name;
    });
    if (isEmpty(survivorList)) {
      console.log("nao encontrado!");
    } else {
      const { data: survivor } = await api.get(survivorList.pop().location);
      return survivor.id;
    }
  }

  async function searchSurvivorInventoryById(survivorId) {
    try {
      const { data: inventory } = await api.get(
        `api/people/${survivorId}/properties.json`
      );
      return inventory;
    } catch (err) {
      if (err) {
        console.log("Inventory Not found");
        return [];
      }
    }
  }

  async function searchInventoryBySurvivorName(name = "") {
    const survivorId = await findSurvivorIdByName(name);
    return await searchSurvivorInventoryById(survivorId);
  }

  async function setInventorySurvivor2() {
    setSurvivor2Inventory(await searchInventoryBySurvivorName(nameSurvivor2));
  }

  function mapSurvivor1InventoryItems(inventory, tradeInventory) {
    return inventory ? (
      <div>
        <ul>
          {inventory.map((inventoryItem, index) => {
            return (
              <li key={index}>
                <div className="item">
                  <p>{inventoryItem.item.name}</p>
                  <input
                    type="number"
                    onChange={(e) => {
                      tradeInventory[index] = e.target.value;
                      setTradeInventory1(tradeInventory);
                      setPointsTradeInventory1(
                        inventory.reduce((acc, inventoryItem, index) => {
                          if (tradeInventory[index]) {
                            return (
                              acc +
                              tradeInventory[index] * inventoryItem.item.points
                            );
                          }
                          return acc;
                        }, 0)
                      );
                    }}
                    min="0"
                    placeholder="0"
                    max={inventoryItem.quantity}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p>Total: {pointsTradeInventory1}</p>
      </div>
    ) : null;
  }

  function mapSurvivor2InventoryItems(inventory, tradeInventory) {
    return inventory ? (
      <div>
        <ul>
          {inventory.map((inventoryItem, index) => {
            return (
              <li key={index}>
                <div className="item">
                  <p>{inventoryItem.item.name}</p>
                  <input
                    type="number"
                    onChange={(e) => {
                      // const tradeItem = {}
                      // tradeItem[inventoryItem.item.name] = e.target.value
                      // tradeInventory[index] = tradeItem;
                      tradeInventory[index] = e.target.value;
                      //`${inventoryItem.item.name}:${e.target.value}`;

                      setTradeInventory2(tradeInventory);
                      setPointsTradeInventory2(
                        inventory.reduce((acc, inventoryItem, index) => {
                          if (tradeInventory[index]) {
                            return (
                              acc +
                              tradeInventory[index] * inventoryItem.item.points
                            );
                          }
                          return acc;
                        }, 0)
                      );
                    }}
                    min="0"
                    placeholder="0"
                    max={inventoryItem.quantity}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p>Total: {pointsTradeInventory2}</p>
      </div>
    ) : null;
  }

  async function handleTrade() {
    let payment = [];
    tradeInventory1.forEach((item, index) => {
      if (item !== "0") {
        payment.push(`${survivor1Inventory[index].item.name}:${item}`);
      }
    });
    let pick = [];
    tradeInventory2.forEach((item, index) => {
      if (item !== "0") {
        pick.push(`${survivor2Inventory[index].item.name}:${item}`);
      }
    });

    const data = {
      consumer: {
        name: nameSurvivor2,
        pick: pick.join(";"),
        payment: payment.join(";"),
      },
    };
    const response = await api.post(
      `api/people/${idSurvivor1}/properties/trade_item.json`,
      data
    );

    console.log(response);
  }

  useEffect(() => {
    loadSuvivors();
  }, []);

  return (
    <div className="trade-wrapper">
      <div className="trade-container">
        <p>Survivor 1 id:</p>
        <input
          type="text"
          value={idSurvivor1}
          onChange={(e) => setIdSurvivor1(e.target.value)}
        />
        <button
          onClick={async () => {
            setPointsTradeInventory1(0);
            const inventory = await searchSurvivorInventoryById(idSurvivor1);
            setSurvivor1Inventory(inventory);
          }}
        >
          Search
        </button>
      </div>

      {mapSurvivor1InventoryItems(survivor1Inventory, tradeInventory1)}

      <button
        disabled={
          !(
            pointsTradeInventory1 === pointsTradeInventory2 &&
            pointsTradeInventory1 > 0
          )
        }
        onClick={() => handleTrade()}
      >
        Do the Trade
      </button>
      <div className="trade-container">
        <p>Survivor 2 Full name:</p>
        <input
          type="text"
          value={nameSurvivor2}
          onChange={(e) => {
            setNameSurvivor(e.target.value);
          }}
          min="0"
        />

        <button
          onClick={() => {
            setPointsTradeInventory2(0);
            setInventorySurvivor2();
          }}
        >
          Search
        </button>

        {mapSurvivor2InventoryItems(survivor2Inventory, tradeInventory2)}
      </div>
    </div>
  );
}
