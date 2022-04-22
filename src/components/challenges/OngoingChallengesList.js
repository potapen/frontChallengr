import React from "react";
import { Typography } from "@mui/material";
import OngoingChallengeCard from "./OngoingChallengeCard";
import CustomCarousel from "../../interactivity/CustomCarousel";
import "./OngoingChallengesList.css";

function OngoingChallengesList({
  challenges,
  updateChallengesList,
  getLeaguesStats,
}) {
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
                getLeaguesStats={getLeaguesStats}
              />
            );
          }}
        </CustomCarousel>
      )}
    </div>
  );
}

export default OngoingChallengesList;
