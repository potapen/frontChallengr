import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import backendHost from "../../utils/backendHost";
import { Grid, Typography } from "@mui/material";
import OngoingChallengeCard from "./OngoingChallengeCard";
import CustomCarousel from "../../interactivity/CustomCarousel";
import "./OngoingChallengesList.css";

function OngoingChallengesList({challenges,setChallenges}) {

  const storedToken = localStorage.getItem("authToken");

  const getChallenges = async () => {
    const l = await axios.get(`${backendHost}/api/challenges/ongoing`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
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
    <div style={{ width: "100%" }} className="ongoingChallengesContainer">
      <Typography variant="h6" gutterBottom component="div">
        Ongoing challenges ({`${challenges.length}`})
      </Typography>
      {challenges.length > 0 && (
        <CustomCarousel list={challenges}>
          {(challenge) => {
            return (
              <OngoingChallengeCard
                key={challenge._id}
                challengeProps={challenge}
                updateChallengesList={updateChallengesList}
              />
            );
          }}
        </CustomCarousel>
      )}
    </div>
  );
}

export default OngoingChallengesList;
