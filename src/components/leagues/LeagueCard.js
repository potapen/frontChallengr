import React, { useEffect, useState } from "react";
import "./LeagueCard.css";
import LeagueInviter from "./LeagueInviter";
import LeagueDeleter from "./LeagueDeleter";
import LeagueLeaver from "./LeagueLeaver";
import EditLeagueForm from "./EditLeagueForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import { Link, useNavigate } from "react-router-dom";
import LeagueSetFavorite from "./LeagueSetFavorite";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, Divider } from "@mui/material";
import FormDialog from "../../interactivity/FormDialogButton";

function LeagueCard({ leagueProps, updateLeaguesList }) {
  // States
  const [league, setLeague] = useState(leagueProps);
  const storedToken = localStorage.getItem("authToken");
  let navigate = useNavigate();

  const refreshLeague = async () => {
    const refreshedLeague = await axios.get(
      `${backendHost}/api/leagues/${league._id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    setLeague(refreshedLeague.data.league);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title={league.name} subheader={league.createdAt} />
      <CardMedia
        component="img"
        height="194"
        image={league.imageUrl}
        alt="leagueimage"
      />
      <Divider />
      <CardActions disableSpacing>
        <LeagueSetFavorite
          league={league}
          updateLeaguesList={updateLeaguesList}
        />
        <LeagueInviter league={league} />
      </CardActions>
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {league.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Members :
          {league.members.map((member) => {
            return <li key={member._id}>{member.username}</li>;
          })}
        </Typography>
      </CardContent>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <FormDialog buttonName={"Edit league"}>
          {(callback) => {
            return (
              <EditLeagueForm
                league={league}
                refreshLeague={refreshLeague}
                handleClose={callback}
              />
            );
          }}
        </FormDialog>
        <Button
          onClick={() => {
            navigate(`/points/${league._id}`);
          }}
        >
          Edit points settings
        </Button>
      </ButtonGroup>
      <CardActions disableSpacing>
        <LeagueLeaver league={league} updateLeaguesList={updateLeaguesList} />
        <LeagueDeleter league={league} updateLeaguesList={updateLeaguesList} />
      </CardActions>
    </Card>
  );
}

export default LeagueCard;
