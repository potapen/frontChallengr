import React, { useState } from "react";
import "./LeagueInviter.js";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import { Alert, IconButton, Snackbar } from "@mui/material";

function LeagueSetFavorite({ league, updateLeaguesList }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [open, setOpen] = React.useState(false);
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
    setOpen(true);
    setIsFavorited(true);
    updateLeaguesList();
  };

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={setToFavorite}>
        {isFavorited ? (
          <FavoriteIcon color="success" />
        ) : (
          <FavoriteIcon color="disabled" />
        )}
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {league.name} set to favorite
        </Alert>
      </Snackbar>
    </>
  );
}

export default LeagueSetFavorite;
