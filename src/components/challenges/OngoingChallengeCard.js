import React, { useState } from "react";
import "./ChallengeCard.css";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import {
  Avatar,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import FormDialog from "../../interactivity/FormDialogButton";
import FinishChallengeForm from "./FinishChallengeForm";

import cx from "clsx";
import { makeStyles } from "@mui/styles";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
}));

function OngoingChallengeCard({
  challengeProps,
  updateChallengesList,
  getLeaguesStats,
}) {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const [challenge, setChallenge] = useState(challengeProps);

  const storedToken = localStorage.getItem("authToken");

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
    <>
      <Card
        sx={{ width: "100%" }}
        className={cx(cardStyles.root, fadeShadowStyles.root)}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={challenge.league.imageUrl}
            ></Avatar>
          }
          title={challenge.league.name}
          subheader={challenge.createdAt}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {challenge.game.name} with{" "}
            {challenge.contenders.map((contender) => {
              return ` ${contender.username} |`;
            })}
          </Typography>
        </CardContent>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <FormDialog buttonName={"End challenge"}>
            {(callback) => {
              return (
                <FinishChallengeForm
                  challenge={challenge}
                  refreshChallenge={refreshChallenge}
                  updateChallengesList={updateChallengesList}
                  getLeaguesStats={getLeaguesStats}
                  handleClose={callback}
                />
              );
            }}
          </FormDialog>
        </ButtonGroup>
      </Card>
    </>
  );
}

export default OngoingChallengeCard;
