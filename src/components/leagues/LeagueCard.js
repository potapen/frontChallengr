import React from "react";
import "./LeagueCard.css";
import LeagueInviter from "./LeagueInviter";

function LeagueCard({ league }) {
  console.log(league.name);

  const openEditForm = () => {};

  return (
    <div className="leagueCardContainer">
      <img
        className="leagueCardImage"
        src={league.imageUrl}
        alt="leagueimage"
      />
      <div>
        <h4>{league.name}</h4>
        <h6>Members : </h6>
        {league.members.map((member) => {
          return <li>{member.username}</li>;
        })}
        <p>{league.description}</p>
        <div>
          <LeagueInviter league={league} />
          <button type="button" onClick={openEditForm}>
            Edit league
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeagueCard;
