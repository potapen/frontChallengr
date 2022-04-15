import HomeLeague from "./pages/HomeLeague";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Challenges from './pages/Challenges'

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
          <Route exact path="/Leagues" element={<HomeLeague />}/>
          <Route path="/challenges/*" element={<Challenges/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
