import { Link, useNavigate } from "react-router-dom";
import { useContext, useReducer } from "react";
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

const pages = ["Leagues", "Games", "Stats"];

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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

  console.log(isLoggedIn, user);
  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <>
      <AppBar position="static">
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
                    <Typography textAlign="center">Stats</Typography>
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
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user && user.pictureUrl} />
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
