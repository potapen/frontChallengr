import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backendHost from "../utils/backendHost";
import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";

import "./SignupPage.css";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${backendHost}/api/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signupPageContainer">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
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
              id="username"
              name="username"
              label="username"
              type="text"
              value={username}
              onChange={handleUsername}
            />
          </Grid>
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
              <Button type="submit">Signup</Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
