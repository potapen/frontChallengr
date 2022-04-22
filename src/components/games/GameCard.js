import React, { useState } from "react";
import "./GameCard.css";
import GameDeleter from "./GameDeleter";
import EditGameForm from "./EditGameForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import cx from "clsx";
import { makeStyles } from "@mui/styles";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import {
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
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
}));

function GameCard({ gameProps, updateGamesList }) {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const [game, setGame] = useState(gameProps);
  const storedToken = localStorage.getItem("authToken");

  const refreshGame = async () => {
    const refreshedGame = await axios.get(
      `${backendHost}/api/games/${game._id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    setGame(refreshedGame.data.game);
  };

  return (
    <div className="gameCardContainer">
      <>
        <Card
          sx={{ width: "100%" }}
          className={cx(cardStyles.root, fadeShadowStyles.root)}
        >
          <CardHeader title={game.name} subheader={game.createdAt} />
          <CardMedia
            component="img"
            height="194"
            image={game.imageUrl}
            alt="game image"
          />
          <Divider />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {game.description}
            </Typography>
          </CardContent>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <FormDialog buttonName={"Edit game"}>
              {(callback) => {
                return (
                  <EditGameForm
                    game={game}
                    refreshGame={refreshGame}
                    handleClose={callback}
                  />
                );
              }}
            </FormDialog>
          </ButtonGroup>
          <CardActions disableSpacing>
            <GameDeleter game={game} updateGamesList={updateGamesList} />
          </CardActions>
        </Card>
      </>
    </div>
  );
}

export default GameCard;
