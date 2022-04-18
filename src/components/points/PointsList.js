import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import PointCard from "./PointCard";

function PointsList({ leagueId }) {
  const [points, setPoints] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getPoints = async () => {
    const l = await axios.get(`${backendHost}/api/points/league/${leagueId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setPoints(l.data.points);
  };

  useEffect(() => {
    getPoints();
  }, []);

  const updatePointsList = (point) => {
    getPoints();
    return;
  };

  return (
    <div>
      <h1>List of Points</h1>
      <ul>
        {points.length > 0 &&
          points.map((point) => {
            return (
              <PointCard
                key={point._id}
                pointProps={point}
                updatePointsList={updatePointsList}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default PointsList;
