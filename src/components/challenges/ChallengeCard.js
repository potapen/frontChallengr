import React, { useEffect, useState } from "react";
import "./ChallengeCard.css";
import EditChallengeForm from "./EditChallengeForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import FormDialog from "../../interactivity/FormDialogButton";
import ChallengeDeleter from "./ChallengeDeleter";

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

function ChallengeCard({
  leagues,
  games,
  updateChallengesList,
  updateFullChallengesList,
  challenges,
  challenge,
}) {
  const storedToken = localStorage.getItem("authToken");

  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();

  let navigate = useNavigate();


  // const refreshChallenge = async () => {
  //   const refreshedChallenge = await axios.get(
  //     `${backendHost}/api/challenges/${challenge._id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //       },
  //     }
  //   );
  //   setChallenge(refreshedChallenge.data.challenge);
  // };

  return (
    <Card
      sx={{ width: "100%" }}
      className={cx(cardStyles.root, fadeShadowStyles.root)}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={challenge.league.imageUrl}></Avatar>
        }
        title={`${challenge.league.name} - ${challenge.game.name}`}
        subheader={challenge.createdAt}
      />

      <CardMedia
        component="img"
        height="194"
        image={challenge.game.imageUrl}
        alt="challenge image"
      />
      <Divider />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Contenders :
          {challenge.contenders.map((contender) => {
            return <li key={contender._id}>{contender.username}</li>;
          })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Points : {challenge.points}
        </Typography>
        {challenge.isCompleted ? (
          <Typography variant="body2" color="text.secondary">
            Winners :
            {challenge.winners.map((contender) => {
              return <li key={contender._id}>{contender.username}</li>;
            })}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Challenge is still ongoing
          </Typography>
        )}
      </CardContent>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <FormDialog buttonName={"Edit"}>
          {(callback) => {
            return (
              <EditChallengeForm
                leagues={leagues}
                games={games}
                challenge={challenge}
                updateChallengesList={updateChallengesList}
                updateFullChallengesList={updateFullChallengesList}
                handleClose={callback}
              />
            );
          }}
        </FormDialog>
        <Button
          onClick={() => {
            navigate(`/points/${challenge.league._id}`);
          }}
        >
          Edit points settings
        </Button>
      </ButtonGroup>
      <CardActions disableSpacing>
        <ChallengeDeleter
          challenge={challenge}
          updateChallengesList={updateChallengesList}
          updateFullChallengesList={updateFullChallengesList}
        />
      </CardActions>
    </Card>
  );
}

export default ChallengeCard;
