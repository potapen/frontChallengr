import React, { useEffect, useState } from "react";
import axios from "axios";
import backendHost from "../../utils/backendHost";
import {
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import FormDialog from "../../interactivity/FormDialogButton";

import cx from "clsx";
import { makeStyles } from "@mui/styles";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import EditProfileForm from "./EditProfileForm";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
    marginTop: 50,
  },
  content: {
    padding: 24,
  },
}));

function Profile() {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();

  const [profile, setProfile] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getProfile = async () => {
    const l = await axios.get(`${backendHost}/api/profile`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    setProfile(l.data.user);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = () => {
    getProfile();
    return;
  };

  return (
    <>
      {profile && (
        <Card
          sx={{ width: "100%" }}
          className={cx(cardStyles.root, fadeShadowStyles.root)}
        >
          <CardHeader title={profile.username} subheader={profile.createdAt} />
          <CardMedia
            component="img"
            height="300"
            image={profile.pictureUrl}
            alt="profile pic"
          />
          <Divider />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {profile.email}
            </Typography>
          </CardContent>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <FormDialog buttonName={"Edit profile"}>
              {(callback) => {
                return (
                  <EditProfileForm
                    profile={profile}
                    updateProfile={updateProfile}
                    handleClose={callback}
                  />
                );
              }}
            </FormDialog>
          </ButtonGroup>
        </Card>
      )}
    </>
  );
}

export default Profile;
