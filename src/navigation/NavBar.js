import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser, pictureUrl } = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Challenger
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {[
                  <MenuItem
                    key="home"
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/");
                    }}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="challenges"
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/challenges");
                    }}
                  >
                    <Typography textAlign="center">Challenges</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="leagues"
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/leagues");
                    }}
                  >
                    <Typography textAlign="center">Leagues</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="games"
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/games");
                    }}
                  >
                    <Typography textAlign="center">Games</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="stats"
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(`/stats/profile/${user && user._id}`);
                    }}
                  >
                    <Typography textAlign="center">stats</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="graphs"
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(`/graphs`);
                    }}
                  >
                    <Typography textAlign="center">graphs</Typography>
                  </MenuItem>,
                ]}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Challenger
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="home"
                onClick={() => {
                  navigate("/");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                key="challenges"
                onClick={() => {
                  navigate("/challenges");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Challenges
              </Button>
              <Button
                key="leagues"
                onClick={() => {
                  navigate("/leagues");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Leagues
              </Button>
              <Button
                key="games"
                onClick={() => {
                  navigate("/games");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Games
              </Button>
              <Button
                key="stats"
                onClick={() => {
                  navigate(`/stats/profile/${user && user._id}`);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Stats
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user && pictureUrl} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isLoggedIn && [
                  <MenuItem
                    key="Profile"
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/profile");
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="Logout"
                    onClick={() => {
                      handleCloseUserMenu();
                      logOutUser();
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>,
                ]}
                {!isLoggedIn && [
                  <MenuItem
                    key="Login"
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/login");
                    }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="Signup"
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/signup");
                    }}
                  >
                    <Typography textAlign="center">Signup</Typography>
                  </MenuItem>,
                ]}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
