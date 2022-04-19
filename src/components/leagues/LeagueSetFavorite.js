import React, { useEffect, useState } from "react";
import "./LeagueInviter.js";
import axios from "axios";

import backendHost from "../../utils/backendHost";

function LeagueSetFavorite({ league, updateLeaguesList }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const checkIfFavorite = async () => {
    const u = await axios.get(`${backendHost}/api/profile`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    const isFavorite = u.data.user.favoriteLeague === league._id;
    setIsFavorited(isFavorite);
  };
  checkIfFavorite();

  const setToFavorite = async () => {
    await axios.patch(
      `${backendHost}/api/leagues/${league._id}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    setIsFavorited(true);
    updateLeaguesList();
  };

  return (
    <>
      <button type="button" onClick={setToFavorite}>
        Set to Favorite
      </button>
      {isFavorited && <p>Favorite</p>}
    </>
  );
}

export default LeagueSetFavorite;
