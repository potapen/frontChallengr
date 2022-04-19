import React, { useEffect, useState } from "react";
import "./LeagueCard.css";
import LeagueInviter from "./LeagueInviter";
import LeagueDeleter from "./LeagueDeleter";
import LeagueLeaver from "./LeagueLeaver";
import EditLeagueForm from "./EditLeagueForm";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import { Link } from "react-router-dom";
import LeagueSetFavorite from "./LeagueSetFavorite";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function LeagueCard({ leagueProps, updateLeaguesList }) {
  // States
  const [league, setLeague] = useState(leagueProps);
  const storedToken = localStorage.getItem("authToken");

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

  // UI
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
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
          <h6>Members : </h6>
          {league.members.map((member) => {
            return <li key={member._id}>{member.username}</li>;
          })}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LeagueLeaver league={league} updateLeaguesList={updateLeaguesList} />
        <LeagueDeleter league={league} updateLeaguesList={updateLeaguesList} />
        <IconButton aria-label="settings">
          <Link to={`/points/${league._id}`}>
            <DisplaySettingsIcon color="action" />
          </Link>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <EditIcon />
        </ExpandMore>
      </CardActions>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <EditLeagueForm league={league} refreshLeague={refreshLeague} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default LeagueCard;
