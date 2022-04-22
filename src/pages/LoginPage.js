import { useState, useContext } from "react"; // <== IMPORT useContext
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import backendHost from "../utils/backendHost";

import "./LoginPage.css";
import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${backendHost}/api/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        storeToken(response.data.authToken);
        authenticateUser();

        navigate("/leagues"); // <== ADD
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="loginPageContainer">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            "& > *": {
              m: 1,
              r: 1,
              t: 1,
            },
          }}
        >
          <Grid>
            <TextField
              id="email"
              name="email"
              label="email"
              type="email"
              value={email}
              onChange={handleEmail}
            />
          </Grid>
          <Grid>
            <TextField
              id="password"
              name="password"
              label="password"
              type="password"
              value={password}
              onChange={handlePassword}
            />
          </Grid>
          <Grid>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button type="submit">Login</Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
