import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import PointCard from "./PointCard";
import { Grid } from "@mui/material";

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
    <div className="pointsPageContainer">
      <h1>Points</h1>
      <div className="pointsListContainer">
        <Grid container spacing={1}>
          {points.length > 0 &&
            points.map((point) => {
              return (
                <Grid key={point._id} item xs={12}>
                  <PointCard
                    key={point._id}
                    pointProps={point}
                    updatePointsList={updatePointsList}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default PointsList;
