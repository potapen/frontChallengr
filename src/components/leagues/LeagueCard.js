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

function LeagueCard({ leagueProps, updateLeaguesList }) {
  const [editMode, setEditMode] = useState(false);
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

  return (
    <div className="leagueCardContainer">
      {true ? (
        <>
          <img
            className="leagueCardImage"
            src={league.imageUrl}
            alt="leagueimage"
          />
          <div>
            <h4>{league.name}</h4>
            <h6>Members : </h6>
            {league.members.map((member) => {
              return <li key={member._id}>{member.username}</li>;
            })}
            <p>{league.description}</p>
            <div>
              <LeagueInviter league={league} />
              <button type="button" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Hide Edit" : "Show Edit"}
              </button>
              {editMode && (
                <EditLeagueForm league={league} refreshLeague={refreshLeague} />
              )}
              <LeagueDeleter
                league={league}
                updateLeaguesList={updateLeaguesList}
              />
              <LeagueLeaver
                league={league}
                updateLeaguesList={updateLeaguesList}
              />
              <LeagueSetFavorite
                league={league}
                updateLeaguesList={updateLeaguesList}
              />
              <Link to={`/points/${league._id}`}>Edit games weight</Link>
            </div>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default LeagueCard;
