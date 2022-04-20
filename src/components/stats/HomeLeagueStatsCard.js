import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import cx from "clsx";
import { makeStyles } from "@mui/styles";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
}));

function HomeLeagueStatsCard({ league, fullRankingPerLeague }) {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();

  return (
    <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>
      <CardHeader
        avatar={<Avatar aria-label="league" src={league.imageUrl}></Avatar>}
        title={league.name}
        subheader={league.createdAt}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          LeaderBoard:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fullRankingPerLeague[0].map((user) => {
            return (
              <li>
                <img
                  src={`${user._id.winners.pictureUrl}`}
                  alt=""
                  style={{ width: "3rem", bordeRadius: "50%" }}
                />
                {user._id.winners.username} ({user.totalPoints} x 💰|{" "}
                {user.count} x 🎲 |{" "}
                <Link to={`/stats/profile/${user._id.winners._id}</li>`}>
                  see stats
                </Link>
                )
              </li>
            );
          })}
          {fullRankingPerLeague[1].length > 0 &&
            fullRankingPerLeague[1].map((user) => {
              return (
                <li>
                  <img
                    src={`${user.pictureUrl}`}
                    alt=""
                    style={{ width: "3rem", bordeRadius: "50%" }}
                  />
                  {user.username} (0 x 💰| 0 x 🎲 |{" "}
                  <Link to={`/stats/profile/${user._id}</li>`}>see stats</Link>)
                </li>
              );
            })}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HomeLeagueStatsCard;
