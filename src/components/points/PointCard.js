import React, { useState } from "react";
import "./PointCard.css";
import EditPointForm from "./EditPointForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";

import cx from "clsx";
import { makeStyles } from "@mui/styles";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
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
import EditPointFormNew from "./EditPointForm";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
}));

function PointCard({ pointProps }) {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const [point, setPoint] = useState(pointProps);

  const storedToken = localStorage.getItem("authToken");

  const refreshPoint = async () => {
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
    <div className="pointCardContainer">
      <>
        <Card
          sx={{ width: "100%" }}
          className={cx(cardStyles.root, fadeShadowStyles.root)}
        >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={point.game.imageUrl}></Avatar>
            }
            title={point.game.name}
            subheader={`Points : ${point.points}`}
          />
          <Divider />
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <FormDialog buttonName={"Edit Point"}>
              {(callback) => {
                return (
                  <EditPointFormNew
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
