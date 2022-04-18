import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import ChallengeCard from "./ChallengeCard";

function ChallengesList({ games, leagues }) {
  const [challenges, setChallenges] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setChallenges(l.data.challenges);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const updateChallengesList = (challenge) => {
    getChallenges();
    return;
  };

  return (
    <div>
      <h1>List of Challenges</h1>
      <ul>
        {challenges.length > 0 &&
          challenges.map((challenge) => {
            return (
              <ChallengeCard
                key={challenge._id}
                challengeProps={challenge}
                updateChallengesList={updateChallengesList}
                leagues={leagues}
                games={games}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ChallengesList;
