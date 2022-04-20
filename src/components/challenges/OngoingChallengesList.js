import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import { Grid } from "@mui/material";
import OngoingChallengeCard from "./OngoingChallengeCard";

function OngoingChallengesList() {
  const [challenges, setChallenges] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges/ongoing`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    console.log("challenges", l.data.challenges);
    setChallenges(l.data.challenges);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const updateChallengesList = () => {
    getChallenges();
    return;
  };

  return (
    <div>
      <h1>List of Challenges</h1>
      <Grid container spacing={1}>
        {challenges.length > 0 &&
          challenges.map((challenge) => {
            return (
              <Grid key={challenge._id} item xs={12}>
                <OngoingChallengeCard
                  key={challenge._id}
                  challengeProps={challenge}
                  updateChallengesList={updateChallengesList}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default OngoingChallengesList;
