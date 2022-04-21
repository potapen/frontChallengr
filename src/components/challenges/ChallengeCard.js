import React, { useEffect, useState } from "react";
import "./ChallengeCard.css";
import EditChallengeForm from "./EditChallengeForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import { Link } from "react-router-dom";

function ChallengeCard({
  leagues,
  games,
  updateChallengesList,
  updateFullChallengesList,
  challengeProps,
}) {
  const [editMode, setEditMode] = useState(false);
  const [challenge, setChallenge] = useState(challengeProps);

  const storedToken = localStorage.getItem("authToken");

  const handleClose = () => {
    setEditMode(false);
  };

  const refreshChallenge = async () => {
    const refreshedChallenge = await axios.get(
      `${backendHost}/api/challenges/${challenge._id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    setChallenge(refreshedChallenge.data.challenge);
  };

  return (
    <div className="challengeCardContainer">
      <img
        className="challengeCardImage"
        src={challenge.game.imageUrl}
        alt="gameImage"
      />
      <div>
        <h4>{challenge.league.name}</h4>
        <h4>{challenge.game.name}</h4>
        <h4>{challenge.createdAt}</h4>
        <h6>Contenders : </h6>
        {challenge.contenders.map((contender) => {
          return <li key={contender._id}>{contender.username}</li>;
        })}

        <div>
          <button type="button" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Hide Edit" : "Show Edit"}
          </button>
          {editMode && (
            <EditChallengeForm
              leagues={leagues}
              games={games}
              challenge={challenge}
              handleClose={handleClose}
              updateChallengesList={updateChallengesList}
              updateFullChallengesList={updateFullChallengesList}
            />
          )}
          <Link to={`/points/${challenge.game._id}`}>Edit games weight</Link>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
