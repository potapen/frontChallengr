import HomeLeague from "./pages/HomeLeague";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Challenges from "./pages/Challenges";
import HomeGame from "./pages/HomeGame";
import HomePoint from "./pages/HomePoint";

function App() {
  return (
    <div className="App">
      <h1>Challengr!!!!!!!!</h1>
      <Router>
        <Routes>
          <Route exact path="/leagues" element={<HomeLeague />} />
          <Route exact path="/Challenges" element={<Challenges />} />
          <Route exact path="/games" element={<HomeGame />} />
          <Route exact path="/points/:leagueId" element={<HomePoint />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
