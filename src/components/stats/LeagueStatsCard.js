import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
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

function LeagueStatsCard({
  getLeaguesStats,
  profile,
  league,
  countPerLeague,
  countPerUser,
  countPerWinner,
  fullRankingPerLeague,
}) {
  const cardStyles = useStyles();
  const fadeShadowStyles = useFadedShadowStyles();

  return (
    <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>
      <CardHeader
        avatar={<Avatar aria-label="league" src={league.imageUrl}></Avatar>}
        title={league.name}
        subheader={league.createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Members: {league.members.length}x👤 | Challenges:{" "}
          {countPerLeague.count}x🎲 | Points: {countPerLeague.totalPoints}x💰
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {profile.username}:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${countPerWinner ? countPerWinner.count : 0}x🎲 winned out of 
            ${countPerUser ? countPerUser.count : 0}
          x🎲`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${
            countPerWinner ? countPerWinner.totalPoints : 0
          }x💰 earned out of ${countPerUser ? countPerUser.totalPoints : 0}x💰`}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          LeaderBoard:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ol>
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
                  <Link
                    to="#"
                    onClick={() => getLeaguesStats(user._id.winners._id)}
                  >
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
                    <Link to="#" onClick={() => getLeaguesStats(user._id)}>
                      see stats
                    </Link>
                    )
                  </li>
                );
              })}
          </ol>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LeagueStatsCard;
