import React, { useEffect, useState } from "react";
import NewGameForm from "../components/games/NewGameForm";
import GamesList from "../components/games/GamesList";
import FormDialogFAB from "../interactivity/FormDialogFAB";
import axios from "axios";
import backendHost from "../utils/backendHost";

function HomeGame() {
  const [games, setGames] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getGames = async () => {
    const l = await axios.get(`${backendHost}/api/games`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setGames(l.data.games);
  };

  useEffect(() => {
    getGames();
  }, []);

  const updateGamesList = () => {
    getGames();
    return;
  };

  const styleAdd = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <div>
      <GamesList updateGamesList={updateGamesList} games={games} />
      <FormDialogFAB
        style={styleAdd}
        color="primary"
        variant="extended"
        text="New Game"
      >
        {(callback) => {
          return (
            <NewGameForm
              handleClose={callback}
              updateGamesList={updateGamesList}
            />
          );
        }}
      </FormDialogFAB>
    </div>
  );
}

export default HomeGame;
