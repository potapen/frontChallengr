import HomeLeague from "./pages/HomeLeague";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeChallenges from "./pages/HomeChallenges";
import HomeGame from "./pages/HomeGame";
import HomePoint from "./pages/HomePoint";
import LeaguesStats from "./components/stats/LeaguesStats";
import Graphs from "./components/stats/Graphs"

// function App() {
//   return (
//     <div className="App">
//       <h1>Challengr!!!!!!!!</h1>
//       <Router>
//         <Routes>
//         <Route exact path="/Leagues" element={<HomeLeague />}/>
//         <Route path="/challenges" element={<Challenges/>}>
//           <Route  path="edit" element={<div>hello</div>}/>
//         </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <h1>Challengr!!!!!!!!</h1>
      <Router>
        <Routes>
          <Route exact path="/leagues" element={<HomeLeague />} />
          <Route exact path="/games" element={<HomeGame />} />
          <Route exact path="/points/:leagueId" element={<HomePoint />} />
          <Route
            exact
            path="/stats/profile/:profileId"
            element={<LeaguesStats />}
          />
          <Route path="/challenges" element={<HomeChallenges/>}/>
          <Route path="/graphs" element={<Graphs/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
