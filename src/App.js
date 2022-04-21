import HomeLeague from "./pages/HomeLeague";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeChallenges from "./pages/HomeChallenges";
import HomeGame from "./pages/HomeGame";
import HomePoint from "./pages/HomePoint";
import LeaguesStats from "./components/stats/LeaguesStats";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./navigation/Layout";
import IsAnonymous from "./context/IsAnonymous";
import IsPrivate from "./context/IsPrivate";
import Home from "./pages/Home";
import Graphs from "./components/stats/Graphs";
import ProfilePage from "./pages/ProfilePage";
import { useState , useEffect } from "react";
import axios from "axios";

import backendHost from "./utils/backendHost";

function App() {
  const storedToken = localStorage.getItem("authToken");
  
  const [leagues, setLeagues] = useState([]);
  const [games, setGames] = useState([]);
  
  const getLeagues = async () => {
    const l = await axios.get(`${backendHost}/api/leagues`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setLeagues(l.data.leagues);
  };

  useEffect(() => {
    getLeagues();
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route
              exact
              path="/"
              element={
                <IsPrivate>
                  <Home />
                </IsPrivate>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />
            <Route
              exact
              path="/leagues"
              element={
                <IsPrivate>
                  <HomeLeague leagues={leagues} setLeagues={setLeagues} getLeagues={getLeagues} />
                </IsPrivate>
              }
            />
            <Route
              exact
              path="/games"
              element={
                <IsPrivate>
                  <HomeGame />
                </IsPrivate>
              }
            />
            <Route
              path="/points/:leagueId"
              element={
                <IsPrivate>
                  <HomePoint />
                </IsPrivate>
              }
            />
            <Route
              path="/stats/profile/:profileId"
              element={
                <IsPrivate>
                  <LeaguesStats />
                </IsPrivate>
              }
            />
            <Route
              path="/challenges"
              element={
                <IsPrivate>
                  <HomeChallenges />
                </IsPrivate>
              }
            />

            <Route
              path="/graphs"
              element={
                <IsPrivate>
                  <Graphs />
                </IsPrivate>
              }
            />
            <Route
              path="/signup"
              element={
                <IsAnonymous>
                  <SignupPage />
                </IsAnonymous>
              }
            />
            <Route
              path="/login"
              element={
                <IsAnonymous>
                  <LoginPage />
                </IsAnonymous>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
