import LineGraph from "./LineGraph";
import RadarGraph from "./RadarGraph";
import { useState, useEffect, useContext } from "react";
import backendHost from "../../utils/backendHost";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import CustomCarousel from "../../interactivity/CustomCarousel";

import {Fragment} from "react";
import { Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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
    <div style={{ width: "100%" }} className="ongoingChallengesContainer">
      {leagues.length > 0 && (
        <CustomCarousel list={leagues}>
          {(league) => {
            return (
              <Fragment key={league._id}>
                <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": {
                        m: 1,
                        r: 1,
                        t: 1,
                      },
                    }}
                  >
                  <Grid><h2>{league.name}</h2></Grid>
                  
                  <Grid>
                    <LineGraph 
                      // key={'LineGraph' + league._id + user._id}
                      // id={'LineGraph' + league._id + user._id}
                      leagueId={league._id}
                    />
                  </Grid>
                  <Grid><h3>{user.username}</h3></Grid>
                  <Grid>
                    <RadarGraph
                      // key={'RadarGraph' + league._id + user._id}
                      // id={'RadarGraph' + league._id + user._id}
                      leagueId={league._id}
                      userId={user._id}
                    />
                  </Grid>
                </Box>
              </Fragment>
            );
          }}
        </CustomCarousel>
      )}
    </div>
      </>
    );
  }
};

export default Graphs;
