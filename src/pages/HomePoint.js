import React from "react";
import { useParams } from "react-router-dom";
import PointsList from "../components/points/PointsList";

function HomePoint() {
  const { leagueId } = useParams();

  return (
    <div>
      <div>List of Points</div>
      <PointsList leagueId={leagueId} />
    </div>
  );
}

export default HomePoint;
