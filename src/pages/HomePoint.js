import React from "react";
import { useParams } from "react-router-dom";
import PointsList from "../components/points/PointsList";

function HomePoint({ league }) {
  const { leagueId } = useParams();

  return (
    <div>
      <div>HomePoint</div>
      <PointsList leagueId={leagueId} />
    </div>
  );
}

export default HomePoint;
