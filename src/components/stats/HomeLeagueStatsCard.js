import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./HomeLeagueStatsCard.css";
import cx from "clsx";
import { makeStyles } from "@mui/styles";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import RadarGraph from "./RadarGraph";
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
}));

function HomeLeagueStatsCard({ league, fullRankingPerLeague,challenges,setChallenges }) {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const { user } = useContext(AuthContext);

  return (
    <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>
      <CardHeader
        avatar={<Avatar aria-label="league" src={league.imageUrl}></Avatar>}
        title={league.name}
        subheader={league.createdAt}
      />
      <Divider />
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          Performance:
        </Typography>
        <RadarGraph
          key={league._id + user._id}
          leagueId={league._id}
          userId={user._id}
          challenges={challenges}
          setChallenges={setChallenges}
        />
        <Divider />
        <Typography variant="overline" color="text.secondary">
          LeaderBoard:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ol>
            {fullRankingPerLeague[0].map((user) => {
              return (
                <li key={user._id.winners._id}>
                  <strong>{user._id.winners.username}</strong> (
                  {user.totalPoints} x 💰| {user.count} x 🎲 | )
                </li>
              );
            })}
            {fullRankingPerLeague[1].length > 0 &&
              fullRankingPerLeague[1].map((user) => {
                return (
                  <li key={user._id}>
                    <strong>{user.username}</strong> (0 x 💰| 0 x 🎲 | )
                  </li>
                );
              })}
          </ol>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HomeLeagueStatsCard;
