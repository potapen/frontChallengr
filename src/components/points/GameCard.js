import React, { useState } from "react";
import "./PointCard.css";
import PointDeleter from "./PointDeleter";
import EditPointForm from "./EditPointForm";
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

function PointCard({ PointProps, updatePointsList }) {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const [point, setPoint] = useState(PointProps);

  const storedToken = localStorage.getItem("authToken");

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
    <div className="PointCardContainer">
      <>
        <Card
          sx={{ width: "100%" }}
          className={cx(cardStyles.root, fadeShadowStyles.root)}
        >
          <CardHeader title={point.game.name} />
          <CardMedia
            component="img"
            height="194"
            image={point.game.imageUrl}
            alt="game image"
          />
          <Divider />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Points : {point.points}
            </Typography>
          </CardContent>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <FormDialog buttonName={"Edit Point"}>
              {(callback) => {
                return (
                  <EditPointForm
                    point={point}
                    refreshPoint={refreshPoint}
                    handleClose={callback}
                  />
                );
              }}
            </FormDialog>
          </ButtonGroup>
        </Card>
      </>
    </div>
  );
}

export default PointCard;
