import LineGraph from "./LineGraph";
import RadarGraph from "./RadarGraph";
import { useState, useEffect, useContext } from "react";
import backendHost from "../../utils/backendHost";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import {Fragment} from "react";

const Graphs = () => {
  const [leagues, setLeagues] = useState([]);
  const { user } = useContext(AuthContext);
  console.log("user", user);
  const storedToken = localStorage.getItem("authToken");

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

  if (leagues.length === 0) {
    return <p>Loading</p>;
  } else {
    return (
      <>
        <h2>Graphs</h2>
        {leagues.map((league, index) => {
            return (
              <Fragment key={league._id}>
                {console.log(`league ${league.name}| user ${user.username}`)}
                {console.log(`league ${league._id}| user ${user._id}`)}
                <div>
                  <h3>{league.name}</h3>
                  <LineGraph 
                    // key={'LineGraph' + league._id + user._id}
                    // id={'LineGraph' + league._id + user._id}
                    leagueId={league._id}
                  />
                  <h3>{user.username}</h3>
                  <RadarGraph
                    // key={'RadarGraph' + league._id + user._id}
                    // id={'RadarGraph' + league._id + user._id}
                    leagueId={league._id}
                    userId={user._id}
                  />
                </div>
              </Fragment>
            );
          }
        )}
      </>
    );
  }
};

export default Graphs;
