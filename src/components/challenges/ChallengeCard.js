import React, { useEffect, useState } from "react";
import "./ChallengeCard.css";
import EditChallengeForm from "./EditChallengeForm";
import axios from "axios";
import authToken from "../../utils/authToken";
import backendHost from "../../utils/backendHost";
import { Link } from "react-router-dom";

function ChallengeCard({ challengeProps, updateChallengesList, leagues, games }) {
  const [editMode, setEditMode] = useState(false);
  const [challenge, setChallenge] = useState(challengeProps);
  console.log('challengeProps', challengeProps)

  const refreshChallenge = async () => {
    const refreshedChallenge = await axios.get(
      `${backendHost}/api/challenges/${challenge._id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    setChallenge(refreshedChallenge.data.challenge);
  };

  return (
    <div className="challengeCardContainer">
      {console.log('challenge', challenge)}
      <img
        className="challengeCardImage"
        src={challenge.game.imageUrl}
        alt="gameImage"
      />
      <div>
        <h4>{challenge.league.name}</h4>
        <h4>{challenge.game.name}</h4>
        <h6>Contenders : </h6>
        {console.log('challenge.contenders', challenge.contenders)}
        {challenge.contenders.map((contender) => {
          return <li key={contender._id}>{contender.username}</li>;
        })}

        <div>
          <button type="button" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Hide Edit" : "Show Edit"}
          </button>
          {editMode && (
            <EditChallengeForm challenge={challenge} refreshChallenge={refreshChallenge} games={games} leagues={leagues} />
          )}
          <Link to={`/points/${challenge.game._id}`}>Edit games weight</Link>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
