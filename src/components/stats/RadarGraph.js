import { Radar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import backendHost from "../../utils/backendHost";

const RadarGraph = ({ leagueId, userId, challenges, setChallenges }) => {
  //for props of the chart components. We will need to add labels and data
  const storedToken = localStorage.getItem("authToken");
  const [radarData, setRadarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total score per game",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });
  async function getStakePerGameForAGivenUserAndLeague() {
    const response = await axios.get(
      `${backendHost}/api/stats/radarChart/league/${leagueId}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    const pointsPerGameObjArray = response.data;
    /*[
    {
        "_id": "625d61afd9cecbc3669c17cd",
        "name": "Beer pong",
        "description": "Le jeu du beerpong, classique",
        "imageUrl": "https://www.jeux-alcool.com/wp-content/uploads/2017/03/beerPong.jpeg",
        "__v": 0,
        "createdAt": "2022-04-18T13:03:43.340Z",
        "updatedAt": "2022-04-18T13:03:43.340Z",
        "totalPoints": 3,
        "totalGames": 1
    },
...
    {
        "_id": "625d61afd9cecbc3669c17d0",
        "name": "Rock Scissors Paper",
        "description": "The classic one",
        "imageUrl": "https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/international/la-recette-pour-gagner-a-pierre-feuille-ciseaux-768904/15409112-1-fre-FR/La-recette-pour-gagner-a-pierre-feuille-ciseaux.jpg",
        "__v": 0,
        "createdAt": "2022-04-18T13:03:43.341Z",
        "updatedAt": "2022-04-18T13:03:43.341Z",
        "totalPoints": 0,
        "totalGames": 0
    }
]
*/
    const radarLabelsArray = [];
    const radarDatasArrayLine = [];

    pointsPerGameObjArray.forEach((obj) => {
      radarLabelsArray.push(obj.name);
      radarDatasArrayLine.push(obj.totalPoints);
    });

    const updatedDataSet = [
      {
        label: "How good are you?",
        data: radarDatasArrayLine,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ];
    const updatedRadarData = {
      ...radarData,
      labels: radarLabelsArray,
      datasets: updatedDataSet,
    };
    setRadarData(updatedRadarData);
  }
  useEffect(() => {
    getStakePerGameForAGivenUserAndLeague();
  }, [challenges]);

  return (
    <>
      <Radar data={radarData} options={{}} />
    </>
  );
};

export default RadarGraph;
