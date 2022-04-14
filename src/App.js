import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Challenges from './pages/Challenges'

function App() {
  return (
    <div className="App">
      <h1>Challengr!!!!!!!!</h1>
      <Router>
        <Routes>
        <Route exact path="/Challenges" element={<Challenges/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
