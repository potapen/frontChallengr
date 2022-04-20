import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

function LeagueStatsCard({
  league,
  countPerLeague,
  countPerUser,
  countPerWinner,
  fullRankingPerLeague,
}) {
  console.log("countPerLeague", countPerLeague);
  console.log("countPerUser", countPerUser);
  console.log("countPerWinner", countPerWinner);
  console.log("fullRankingPerLeague", fullRankingPerLeague);
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="league" src={league.imageUrl}></Avatar>}
        title={league.name}
        subheader={league.createdAt}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Members: {league.members.length}x👤
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Challenges: {countPerLeague.count}x🎲
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Points: {countPerLeague.totalPoints}x💰
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Personal:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${countPerWinner ? countPerWinner.count : 0}x🎲 winned out of ${
            countPerUser.count
          }x🎲`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${
            countPerWinner ? countPerWinner.totalPoints : 0
          }x💰 earned out of ${countPerUser.totalPoints}x💰`}
        </Typography>
      </CardContent>
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
                <a href={`/boards/${user._id.winners._id}`}>see stats</a>)
              </li>
            );
          })}
          {/* {{#each noWinners}}
                <li><img src="{{pictureUrl}}" alt="" style="width: 3rem;border-radius: 50%;">{{username}}  (0 x 💰| 0  x 🎲 | <a href="/boards/{{_id}}">see stats</a>)</li>
            {{/each}} */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LeagueStatsCard;
