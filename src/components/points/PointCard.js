import React, { useState } from "react";
import "./PointCard.css";
import EditPointForm from "./EditPointForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";

function PointCard({ pointProps, updatePointsList }) {
  const [editMode, setEditMode] = useState(false);
  const [point, setPoint] = useState(pointProps);

  const storedToken = localStorage.getItem("authToken")

  const refreshPoint = async () => {
    console.log(`${backendHost}/api/points/${point._id}`);
    const refreshedPoint = await axios.get(
      `${backendHost}/api/points/${point._id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    setPoint(refreshedPoint.data.point);
  };

  return (
    <div className="pointCardContainer">
      {true ? (
        <>
          <img
            className="pointCardImage"
            src={point.game.imageUrl}
            alt="Pointimage"
          />
          <div>
            <h4>{point.game.name}</h4>
            <p>{point.points}</p>
            <div>
              <button type="button" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Hide Edit" : "Show Edit"}
              </button>
              {editMode && (
                <EditPointForm point={point} refreshPoint={refreshPoint} />
              )}
            </div>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default PointCard;
